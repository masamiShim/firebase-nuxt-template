import { VuexPersistence } from 'vuex-persist'
import SecureLS from 'secure-ls'
import { Plugin } from '@nuxt/types/app'

const ls = new SecureLS({
  encodingType: 'AES',
  encryptionSecret: 'my-secret-key',
  isCompression: true
})

const persistPlugin: Plugin = ({store}) => {
  new VuexPersistence({
    key: 'front-template-persist',
    storage: window.localStorage,
    saveState: (key: any, state: any, _: any) => {
      ls.set(key, state)
    },
    restoreState: (key:string, _: any) => {
      return ls.get(key)
    }
    /* your options */
  }).plugin(store)
}

export default persistPlugin;
