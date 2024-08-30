import type { App } from 'vue'
import { createHead } from '@vueuse/head'

export function install(app: App) {
  app.use(createHead())
}
