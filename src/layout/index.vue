<!-- 由 Dioa 创建于 2024-08-29 星期四 -->
<script setup lang="ts">
import { MENU_LIST as menuList } from '@/constant/main.constant'

defineOptions({
  name: 'DefaultLayout',
})

const router = useRouter()

const route = useRoute()

const { cacheViews } = storeToRefs(useCacheViewsStore())

const { addCacheViews } = useCacheViewsStore()

// 当前菜单
const activeMenu = ref<any>('')

watch(
  route,
  () => {
    addCacheViews(route)

    if (route.meta?.activeMenu) {
      activeMenu.value = route.meta?.activeMenu
      return
    }
    activeMenu.value = route.path
  },
  { deep: true, immediate: true },
)

// 点击菜单
function handleClickMenu(item: any) {
  if (item.isLink) {
    window.open(item.path)
    return
  }
  router.push(item.path)
}
</script>

<template>
  <div
    id="scroll-wrapper"
    class="h-full w-[1200px] overflow-x-hidden overflow-y-auto mx-auto py-8 px-8"
  >
    <img
      src="@/assets/icons/logo.svg"
      alt="logo svg"
      class="w-[80px] mb-8 cursor-pointer"
      @click="router.push('/')"
    >

    <div class="flex gap-x-10">
      <div
        v-for="item in menuList"
        :key="item.path"
        class="text-base text-black/40 cursor-pointer"
        :class="{ '!text-black': activeMenu === item.path }"
        @click="handleClickMenu(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div
      class="w-full h-0 border-0 border-t border-solid border-gray-100 mt-6 mb-8"
    />
    <router-view v-slot="{ Component }">
      <keep-alive :include="cacheViews">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped></style>
