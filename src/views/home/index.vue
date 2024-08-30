<!-- 由 Dioa 创建于 2024-08-29 星期四 -->
<script setup lang="ts">
import Typed from 'typed.js'
import { MENU_LIST as menuList, TSPARTICLES_OPTIONS as options } from '@/constant/main.constant'

defineOptions({
  name: 'Home',
})

const router = useRouter()

// 点击菜单
function handleClickMenu(item: any) {
  if (item.isLink) {
    window.open(item.path)
    return
  }
  router.push(item.path)
}

function generateTypedText() {
  new Typed('#typed-text', {
    strings: ['I Hope You Can Happy Everyday And Enjoy Yourself Life !'],
    typeSpeed: 40,
    backSpeed: 0,
    showCursor: false,
  })
}

onMounted(() => {
  generateTypedText()
})
</script>

<template>
  <vue-particles id="tsparticles" :options="options" />

  <div
    class="text-white absolute inset-0 flex flex-col items-center justify-center"
  >
    <div class="text-4xl mb-10">
      Dioa's Home And Something I Like
    </div>

    <span id="typed-text" class="whitespace-pre text-xl text-white/80" />

    <div class="w-[400px] h-0 border-0 border-t border-dashed border-white/40 mt-12 mb-14" />

    <div class="flex gap-x-12">
      <div
        v-for="item in menuList"
        :key="item.path"
        class="cursor-pointer text-base text-white/80 font-semibold hover:text-white transition-all"
        @click="handleClickMenu(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
