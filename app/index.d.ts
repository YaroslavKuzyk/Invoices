import type { EUserType } from '~/domain'

declare module '#app' {
  interface PageMeta {
    userType?: EUserType | EUserType[]
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    userType?: EUserType | EUserType[]
  }
}

export {}
