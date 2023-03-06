<template>
  <HoppSmartModal
    v-if="show"
    dialog
    :title="t('support.title')"
    styles="sm:max-w-md"
    @close="emit('hide-modal')"
  >
    <template #body>
      <div class="flex flex-col space-y-2">
        <HoppSmartItem
          :icon="IconBook"
          :label="t('app.documentation')"
          to="https://知识库"
          :description="t('support.documentation')"
          :info-icon="IconChevronRight"
          active
          blank
          @click="hideModal()"
        />
        <HoppSmartItem
          :icon="IconZap"
          :label="t('app.keyboard_shortcuts')"
          :description="t('support.shortcuts')"
          :info-icon="IconChevronRight"
          active
          @click="showShortcuts()"
        />
      </div>
    </template>
  </HoppSmartModal>
</template>

<script setup lang="ts">
import IconZap from "~icons/lucide/zap"
import IconBook from "~icons/lucide/book"
import IconChevronRight from "~icons/lucide/chevron-right"
import { invokeAction } from "@helpers/actions"
import { useI18n } from "@composables/i18n"

const t = useI18n()

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: "hide-modal"): void
}>()



const showShortcuts = () => {
  invokeAction("flyouts.keybinds.toggle")
  hideModal()
}

const hideModal = () => {
  emit("hide-modal")
}
</script>
