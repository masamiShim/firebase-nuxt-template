<template>
  <v-card>
    <v-card-title>商品登録</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col class="col-4">
          <my-input-text-field v-model="state.productKey" label="キー(登録後に自動で設定されます)" disabled />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="col-4">
          <my-input-text-field v-model="state.name" label="商品名" />
        </v-col>
        <v-col class="col-4">
          <my-input-text-field v-model="state.code" label="商品コード" />
        </v-col>
        <v-col class="col-4">
          <my-input-text-field v-model="state.janCode" label="JANコード" />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="col-4">
          <my-input-text-field v-model="state.regularPrice" type="number" step="100" min="100" label="通常価格" />
        </v-col>
        <v-col class="col-4">
          <my-input-text-field v-model="state.sellPrice" type="number" step="100" min="100" label="販売価格" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea v-model="state.description" label="商品説明"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-6">
          <my-input-text-field v-model="state.feature" label="キャッチコピー" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-3">
          <my-input-text-field v-model="state.sellLimit" min="0" max="99" label="販売制限" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-md-3">
          <v-row>
            <v-col>メイン画像</v-col>
          </v-row>
          <v-row>
            <v-col>
              <my-file-upload :value.sync="state.images.main" :is-public="true"></my-file-upload>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="col-md-3">
          <v-row>
            <v-col>サブ画像1</v-col>
          </v-row>
          <v-row>
            <v-col>
              <my-file-upload :value.sync="state.images.sub1" :is-public="true"></my-file-upload>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="col-md-3">
          <v-row>
            <v-col>サブ画像2</v-col>
          </v-row>
          <v-row>
            <v-col>
              <my-file-upload :value.sync="state.images.sub2" :is-public="true"></my-file-upload>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <my-check-box v-model="state.isPublish" label="公開する"></my-check-box>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :loading="loading" @click="handler.handleStore()">{{getLabel}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter
} from "@nuxtjs/composition-api"
import MyInputTextField from "@/components/form/MyInputTextField.vue"
import { ProductRegisterType } from "~/types/application"
import MyFileUpload from "@/components/form/MyFileUpload.vue"
import MyCheckBox from "@/components/form/MyCheckBox.vue"

export default defineComponent({
  components: { MyCheckBox, MyFileUpload, MyInputTextField },
  setup() {
    const ctx = useContext()
    const router = useRouter()
    const loading = ref<boolean>(false)

    const getLabel = computed((): string => {
      const { productId } = ctx.route.value.params
      const { copy } = ctx.route.value.query
      if(productId === 'new') {
        return '登録'
      }
      if(copy) {
        return '複写登録'
      }

      return '更新'
    })

    const state = reactive<ProductRegisterType>({
      id: "new",
      productKey: "",
      name: "",
      code: "",
      janCode: "",
      sellPrice: "",
      regularPrice: "",
      description: "",
      feature: "",
      sellLimit: "",
      isPublish: false,
      images: {
        main: [],
        sub1: [],
        sub2: []
      }
    })

    const handleStore = async () => {
      loading.value = true
      const {
        id,
        productKey,
        name,
        code,
        janCode,
        sellPrice,
        regularPrice,
        description,
        feature,
        sellLimit,
        isPublish,
        images
      } = state
      await ctx.$gateway.admin.product.post({
        id,
        productKey,
        name,
        code,
        janCode,
        sellPrice: Number(sellPrice),
        regularPrice: Number(regularPrice),
        description,
        feature,
        sellLimit: Number(sellLimit),
        isPublish,
        main: images.main,
        sub: [images.sub1, images.sub2]
      })
        .then(async () => {
          ctx.$accessor.toast.show({message: getLabel.value + 'しました', color: 'success'})
          await router.push(`/service/product`)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          loading.value = false
        })
    }

    onBeforeMount(async () => {
      const route = useRoute()
      const { productId } = route.value.params
      if (productId && productId !== "new") {
        ctx.$accessor.loading.start()
        await ctx.$gateway.admin.product.show(productId)
          .then((res) => {
            const { copy } = route.value.query
            const data = res.body.product

            if(copy) {
              state.id = 'new'
              state.productKey = ''
            } else {
              state.id = data.id
              state.productKey = data.productKey
              state.images.main = [res.body.images[0]]
              state.images.sub1 = res.body.images[1] ? [res.body.images[1]] : []
              state.images.sub2 = res.body.images[2] ? [res.body.images[2]] : []
            }

            state.name = data.name
            state.code = data.code
            state.feature = data.feature
            state.janCode = data.janCode
            state.description = data.description
            state.isPublish = data.isPublish
            state.sellLimit = data.sellLimit
            state.sellPrice = data.sellPrice
            state.regularPrice = data.regularPrice
          }).catch((err) => {
            console.log(err)
          }).finally(() => {
            ctx.$accessor.loading.complete()
          })
      }
    })

    return { state, loading, getLabel, handler: { handleStore } }
  }
})
</script>

<style scoped>

</style>