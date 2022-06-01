<template>
<div class="hello">
  <p>
    <button @click="openFirstModal">Open Call Modal</button>
  </p>
  <p>
    <button @click="openSecondModal">Open Call SecondModal</button>
  </p>

  <p>
    <button @click="openFirstModalWithMessage">Open Call ModalWithMessage</button>
  </p>
  <div v-for="modal in modalState" :key="modal.id" v-text="modal"></div>
</div>
</template>

<script>
import { Modal } from "@/Stores/ModalViewStore";
import modalViewStore from "@/Stores/ModalViewStore"
import { emitter } from "@/Stores/ModalViewStore"
import FirstModal from './modal/FirstModal.vue';
import SecondModal from "./modal/SecondModal.vue"

export default {
  data() {
    return {
      modalState: modalViewStore.state.modals
    }
  },
  created() {
    modalViewStore.onChange(this._onChange.bind(this))
    this.setModalFromGetParams()
    emitter.on("modal.push", this.pushFirstModalUrl)
    emitter.on("modal.pop", this.popFirstModalUrl)
  },
  beforeDestroy() {
    emitter.removeListener("modal.push", this.pushFirstModalUrl)
    emitter.removeListener("modal.pop", this.popFirstModalUrl)
  },
  methods: {
    _onChange() {
      this.modalState = modalViewStore.state.modals
    },
    openSecondModal() {
      const modal = new Modal({component: SecondModal, params: {}})
      modalViewStore.dispatch("push", modal)
    },
    openFirstModal() {
      const modal = new Modal({component: FirstModal, params: {}})
      modalViewStore.dispatch("push", modal)
    },
    openFirstModalWithMessage() {
      const modal = new Modal({component: FirstModal, params: {message: "Hello World"}})
      modalViewStore.dispatch("push", modal)
    },
    setModalFromGetParams() {
      const currentURL = new URL(location.href)
      const modalString = currentURL.searchParams.get("modal")
      if (modalString === "FirstModal") {
        if (this.modalState.findIndex((el) => el.name === "FirstModal") === -1) {
          const message = currentURL.searchParams.get("message")
          let modal = null
          if (message) {
            modal = new Modal({component: FirstModal, params: {message: message}})
          } else {
            modal = new Modal({component: FirstModal, params: {}})
          }
          modalViewStore.dispatch("push", modal)
        }
      }
    },
    pushFirstModalUrl(modal) {
      if (modal.component === FirstModal) {
        const currentURL = new URL(location.href)
        currentURL.searchParams.set("modal", modal.component.options.name)
        if (modal.params?.message) {
          currentURL.searchParams.set("message", modal.params.message)
        }
        history.replaceState(modal.name, "", currentURL.href)
      }
    },
    popFirstModalUrl(modal) {
      if (modal.component === FirstModal) {
        const currentURL = new URL(location.href)
        currentURL.searchParams.delete("modal")
        currentURL.searchParams.delete("message")
        history.replaceState("", "", currentURL.href)
      }
    }
  }
}
</script>
