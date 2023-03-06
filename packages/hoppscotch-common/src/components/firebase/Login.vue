<template>
  <HoppSmartModal
    v-if="show"
    dialog
    :title="`${t('auth.login_to_hoppscotch')}`"
    styles="sm:max-w-md"
    @close="hideModal"
  >
    <template #body>
       <!-- 登陆 输入用户名表单-->
      <form
        v-if="mode === 'sign-in'"
        class="flex flex-col space-y-2"
        @submit.prevent="signInWithEmail"
      >
        <div class="flex flex-col">
          <input
            id="userName"
            v-model="form.userName"
            v-focus
            class="input floating-input"
            placeholder=" "
            type="text"
            name="userName"
            autocomplete="off"
            required
            spellcheck="false"
            autofocus
          />
          <label for="userName">
            {{ t("auth.user_name") }}
          </label>
        </div>
      </form>
      <!-- 登陆 输入密码表单-->
      <form
        v-if="mode === 'sign-in'"
        class="flex flex-col space-y-2"
        @submit.prevent="signInWithEmail"
      >
        <div class="flex flex-col">
          <input
            id="userPassword"
            v-model="form.userPassword"
            v-focus
            class="input floating-input"
            placeholder=" "
            type="password"
            name="userPassword"
            autocomplete="off"
            required
            spellcheck="false"
            autofocus
          />
          <label for="userPassword">
            {{ t("auth.user_password") }}
          </label>
        </div>
        <HoppButtonPrimary
          :loading="signingInWithEmail"
          type="submit"
          :label="`${t('auth.send_magic_link')}`"
        />
      </form>


      <div v-if="mode === 'email-sent'" class="flex flex-col px-4">
        <div class="flex flex-col items-center justify-center max-w-md">
          <icon-lucide-inbox class="w-6 h-6 text-accent" />
          <h3 class="my-2 text-lg text-center">
            {{ t("auth.we_sent_magic_link") }}
          </h3>
          <p class="text-center">
            {{
              t("auth.we_sent_magic_link_description", { user: form.userName })
            }}
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <div v-if="mode === 'sign-in'" class="text-secondaryLight text-tiny">
        欢迎登陆接口测试平台
      </div>
      <div v-if="mode === 'email'">
        <HoppButtonSecondary
          :label="t('auth.all_sign_in_options')"
          :icon="IconArrowLeft"
          class="!p-0"
          @click="mode = 'sign-in'"
        />
      </div>
      <div
        v-if="mode === 'email-sent'"
        class="flex justify-between flex-1 text-secondaryLight"
      >
        <HoppSmartAnchor
          class="link"
          :label="t('auth.re_enter_email')"
          :icon="IconArrowLeft"
          @click="mode = 'email'"
        />
        <HoppSmartAnchor
          class="link"
          :label="`${t('action.dismiss')}`"
          @click="hideModal"
        />
      </div>
    </template>
  </HoppSmartModal>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { platform } from "~/platform"
import IconArrowLeft from "~icons/lucide/arrow-left"
import { setLocalConfig } from "~/newstore/localpersistence"
import { useStreamSubscriber } from "@composables/stream"
import { useToast } from "@composables/toast"
import { useI18n } from "@composables/i18n"

export default defineComponent({
  props: {
    show: Boolean,
  },
  emits: ["hide-modal"],
  setup() {
    const { subscribeToStream } = useStreamSubscriber()

    return {
      subscribeToStream,
      t: useI18n(),
      toast: useToast(),
      IconArrowLeft,
    }
  },
  data() {
    return {
      form: {
        userName: "",
        userPassword: "",
      },
      signingInWithEmail: false,
      mode: "sign-in",
    }
  },
  mounted() {
    const currentUser$ = platform.auth.getCurrentUserStream()

    this.subscribeToStream(currentUser$, (user) => {
      if (user) this.hideModal()
    })
  },
  methods: {
    showLoginSuccess() {
      this.toast.success(`${this.t("auth.login_success")}`)
    },
    async signInWithEmail() {
      this.signingInWithEmail = true
      this.mode = "email-sent"
      setLocalConfig("emailForSignIn", this.form.userName)
    //  await platform.auth
    //    .signInWithEmail(this.form.email)
    //    .then(() => {
    //      this.mode = "email-sent"
     //     setLocalConfig("emailForSignIn", this.form.email)
    //    })
    //    .catch((e) => {
  //        console.error(e)
   //       this.toast.error(e.message)
   //       this.signingInWithEmail = false
    //    })
    //    .finally(() => {
    //      this.signingInWithEmail = false
  //      })
    },
    hideModal() {
      this.mode = "sign-in"
      this.toast.clear()
      this.$emit("hide-modal")
    },
  },
})
</script>
