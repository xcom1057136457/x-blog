<!-- 由 Dioa 创建于 2024-08-29 星期四 -->
<script setup lang="ts">
defineOptions({
  name: 'SvgIcon',
})

const props = withDefaults(
  defineProps<{
    iconClass: string
    className?: string
    color?: string
  }>(),
  {
    iconClass: '',
    className: '',
    color: '',
  },
)

const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})

const svgClass = computed(() => {
  if (props.className)
    return `svg-icon ${props.className}`

  return 'svg-icon'
})
</script>

<template>
  <svg
    class="w-1em h-1em relative fill-current align-[-2px]"
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<style scoped></style>
