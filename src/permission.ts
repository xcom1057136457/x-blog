import nProgress from 'nprogress'
import router from '@/router'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false,
})

router.beforeEach((to, _, next) => {
  nProgress.start()
  useHead({
    title: to.meta?.title ? `X Blog - ${to.meta?.title}` : `X Blog`,
  })
  next()
})

router.afterEach(() => {
  nProgress.done()
})
