<template>
  <GithubButton
    title="全行都在用的开源自研测试平台"
    href="https://知识库"
    :data-color-scheme="
      colorMode.value != 'light'
        ? colorMode.value == 'black'
          ? 'dark'
          : 'dark_dimmed'
        : 'light'
    "
    data-show-count="true"
    data-text="测试案例 10000+"
    aria-label="全行都在用的开源自研测试平台"
    :data-size="size"
  />
</template>

<script setup lang="ts">
import GithubButton from "vue-github-button"
import { useColorMode } from "@composables/theming"

const colorMode = useColorMode()

defineProps({
  size: {
    type: String,
    default: undefined,
  },
})
</script>
