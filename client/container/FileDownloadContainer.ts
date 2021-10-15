import { ref, useContext } from "@nuxtjs/composition-api"
import { UploadFile } from "~/types/application"

export const FileDownloadContainer = () => {
  const ctx = useContext()
  const loading = ref<boolean>(false)

  const handleDownload = async (file: UploadFile) => {
    loading.value = true
    await ctx.$gateway.file.download
      .download(file.path)
      .then((res) => {
        const url = (window.URL || window.webkitURL).createObjectURL(res)
        const a = document.createElement("a")
        a.href = url
        a.download = file.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { loading, handleDownload }
}
