import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

type AuthToken = {
  accessToken: string
  refreshToken: string
}

const ignoreRoutes = ['/login', '/logout']

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class Auth extends VuexModule {
  private auth: AuthToken | null = null

  private resumeRoute: string | null = null

  public get isAuthorized() {
    return !!this.auth
  }

  public get accessToken(): string {
    return this.auth?.accessToken || ''
  }

  public get refreshToken(): string {
    return this.auth?.refreshToken || ''
  }

  public get resumedRoute(): string | null {
    return this.resumeRoute
  }

  @Mutation
  private set(auth?: AuthToken) {
    if (!auth) {
      this.auth = null
    } else {
      this.auth = auth
    }
  }

  @Mutation
  private setRoute(routePath?: string) {
    if (!routePath) {
      this.resumeRoute = null
    } else {
      this.resumeRoute = routePath
    }
  }

  @Action({ rawError: true })
  public async setAuth(payload: AuthToken) {
    await this.set(payload)
  }

  @Action({ rawError: true })
  public async logout() {
    await this.set()
  }

  @Action({ rawError: true })
  public async redirectRoute(route?: string) {
    if (!route || ignoreRoutes.includes(route)) {
      await this.setRoute()
    } else {
      await this.setRoute(route)
    }
  }
}
