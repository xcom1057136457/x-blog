<!-- 由 Dioa 创建于 2024-08-29 星期四 -->
<script setup lang="ts">
import dayjs from 'dayjs'

defineOptions({
  name: 'Blogs',
})

const router = useRouter()

const blogModules: any = import.meta.glob('@/assets/blogs/*.md', { eager: true })

// 博客列表
const blogList = ref<any[]>([])

function generateBlogList() {
  Object.keys(blogModules).forEach((key: any) => {
    blogList.value.push({
      label: key.split('/').pop().split('.').shift(),
      date: dayjs(blogModules[key]?.attributes?.date).format('YYYY-MM-DD'),
    })
  })
}

onMounted(() => {
  generateBlogList()
})
</script>

<template>
  <div
    v-for="(item, index) in blogList"
    :key="index"
    class="flex items-center py-3 px-3 text-base gap-x-5 cursor-pointer even:bg-gray-50 odd:bg-white rounded group"
    @click="router.push({ name: 'BlogPreview', params: { name: item.label } })"
  >
    <div class="text-[#333] group-hover:text-red-500">
      {{ item.date }}
    </div>

    <div class="text-[#252525] flex-1 group-hover:text-red-500">
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped></style>
