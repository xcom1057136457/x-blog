<!-- 由 Dioa 创建于 2024-08-29 星期四 -->
<script setup lang="ts">
defineOptions({
  name: 'BlogPreview',
})

const blogModules: any = import.meta.glob('@/assets/blogs/*.md', { eager: true })

const route = useRoute()

const blogArticle = computed(() => {
  if (blogModules) {
    return blogModules[`/src/assets/blogs/${route.params?.name}.md`]?.html
  }
  return ''
})
</script>

<template>
  <div class="text-2xl text-black font-semibold mb-8">
    {{ route.params?.name }}
  </div>

  <div class="markdown-body" v-html="blogArticle" />
</template>

<style scoped>

</style>
