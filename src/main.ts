import { createApp } from 'vue'
import App from './App.vue'
import 'animate.css'
import 'normalize.css/normalize.css'
import '@/assets/styles/main.scss'
import 'virtual:svg-icons-register'
import '@/assets/styles/tailwindcss.css'
import './permission'
import 'github-markdown-css'

const app = createApp(App)

const modules = import.meta.glob('./modules/*.module.ts', { eager: true })

Object.values(modules).forEach((i: any) => {
  app.use(i)
})

app.mount('#app')
