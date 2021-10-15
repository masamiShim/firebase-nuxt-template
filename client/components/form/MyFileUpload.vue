<template>
  <div style="position:relative">
    <template v-if="getFiles.length">
      <v-row>
        <v-col v-for="file in getFiles" :key="file.key" class="text-center">
          <my-image :src="file.path"
                    width="200"
                    height="200"
                    class="grey lighten-2"
          ></my-image>
          <label class="caption">{{ file.name }}</label>
        </v-col>
        <v-btn fab x-small color="error" style="position: absolute; top: 0; right: -16px" @click.stop="clear">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </template>
    <template v-else>
      <div class="text-center">
        <v-sheet class="grey lighten-3" width="200" height="200"></v-sheet>
        <label class="caption">no image</label>
      </div>
    </template>

    <v-file-input
      dense
      :loading="loading"
      @change="handleChangeUpload"
    ></v-file-input>
  </div>
</template>

<script lang="ts">

import { computed, defineComponent, PropType } from "@nuxtjs/composition-api"
import { FileUploadContainer } from "@/container/FileUploadContainer"
import MyImage from "@/components/util/MyImage.vue"
import { UploadFile } from "~/types/application"

export default defineComponent({
  components: { MyImage },
  props: {
    prev: {
      type: Array as PropType<UploadFile[]>,
      required: false,
      default: () => []
    },
    value: {
      type: Array as PropType<UploadFile[]>,
      required: true
    },
    isPublic: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {

    const _value = computed({
      get: () => props.value,
      set: (v) => emit("update:value", v)
    })


    const container = FileUploadContainer(props.prev, _value, props.isPublic)


    const clear = () => {
      // container.state.cleared = true
      _value.value = []
      emit('clear')
    }

    return {
      state: container.state,
      loading: container.loading,
      handleChangeUpload: container.handleChangeUpload,
      clear,
      getFiles: container.getFiles
    }
  }
})
/*
export default Vue.extend({
  props: {
    value: {
      type: Array as PropType<UploadFile[]>,
      required: true
    },
    prev: {
      type: Array as PropType<UploadFile[]>,
      required: false,
      default: () => []
    },
    options: {
      type: Object as PropType<Option>,
      required: false,
      default: () => ({
        multiple: false,
        showSize: false,
        truncate: 22,
      })
    }
  },

  data(): State {
    return {
      loading: false,
      fileUrl: this.$config.file.url,
      init: this.prev,
      cleared: false
    }
  },
  computed: {
    _value: {
      get(){
        return this.value
      },
      set(value: UploadFile[]) {
        this.$emit('update:value', value)
      }
    },
    getFiles(): UploadFile[] {
      if (this.cleared) {
        return []
      }
      if (this.init.length && !this._value.length && !this.cleared) {
        return this.init
      }
      return this._value
    }
  },
  methods: {
    async handleChangeUpload(e: null | File | File[]) {
      if (!e || (Array.isArray(e) && !e.length)) {
        this._value = []
        console.log("deleted")
        return
      }

      const upload = async (e: File | File[]) => {
        if (Array.isArray(e)) {
          return await this.$gateway.file.upload(e)
        } else {
          return await this.$gateway.file.upload([e])
        }
      }

      this.loading = true

      await upload(e)
        .then((res) => {
          this._value = res.body
        })
        .catch((err) => {
          console.log(err)
        }).finally(() => {
          this.loading = false
        })

    }

  }
})
*/
</script>

<style scoped>

</style>