import {
  computed,
  reactive,
  ref,
  useContext,
  WritableComputedRef,
} from "@nuxtjs/composition-api"
import { UploadFile } from "~/types/application"

type State = {
  fileUrl: string
  init: UploadFile[]
  cleared: boolean
}

export const FileUploadContainer = (
  prev: UploadFile[],
  target: WritableComputedRef<UploadFile[]>,
  isPublic: boolean
) => {
  const ctx = useContext()

  const loading = ref<boolean>(false)

  const state = reactive<State>({
    fileUrl: process.env.fileURL || "",
    init: prev,
    cleared: false,
  })

  const getFiles = computed<UploadFile[]>(() => {
    if (state.cleared) {
      return []
    }
    if (state.init.length && !target.value.length && !state.cleared) {
      return state.init
    }
    return target.value
  })

  // API操作で分けた方が良さそう？
  const upload = async (e: File | File[]) => {
    if (Array.isArray(e)) {
      return await ctx.$gateway.file.upload.upload(e, isPublic)
    } else {
      return await ctx.$gateway.file.upload.upload([e], isPublic)
    }
  }

  const handleChangeUpload = async (e: null | File | File[]) => {
    if (!e || (Array.isArray(e) && !e.length)) {
      target.value = []
      console.log("deleted")
      return
    }

    loading.value = true

    await upload(e)
      .then((res) => {
        target.value = res.body
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { state, loading, getFiles, handleChangeUpload }
}
