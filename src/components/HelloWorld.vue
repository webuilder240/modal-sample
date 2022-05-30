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

export default {
  data() {
    return {
      modalState: modalViewStore.state.modals
    }
  },
  created() {
    modalViewStore.onChange(() => {
      this._onChange()
    })

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
      const modal = new Modal({name: "second_modal", params: {}})
      modalViewStore.dispatch("push", modal)
    },
    openFirstModal() {
      const modal = new Modal({name: "first_modal", params: {}})
      modalViewStore.dispatch("push", modal)
    },
    openFirstModalWithMessage() {
      const modal = new Modal({name: "first_modal", params: {message: "Hello World"}})
      modalViewStore.dispatch("push", modal)
    },
    setModalFromGetParams() {
      const currentURL = new URL(location.href)
      const modalString = currentURL.searchParams.get("modal")
      if (modalString === "first_modal") {
        const message = currentURL.searchParams.get("message")
        let modal = null
        if (message) {
          modal = new Modal({name: modalString, params: {message: message}})
        } else {
          modal = new Modal({name: modalString, params: {}})
        }
        modalViewStore.dispatch("push", modal)
      }
    },
    pushFirstModalUrl(modal) {
      if (modal.name === "first_modal") {
        const currentURL = new URL(location.href)
        currentURL.searchParams.set("modal", modal.name)
        if (modal.params?.message) {
          currentURL.searchParams.set("message", modal.params.message)
        }
        history.replaceState(modal.name, "", currentURL.href)
      }
    },
    popFirstModalUrl(modal) {
      if (modal.name === "first_modal") {
        const currentURL = new URL(location.href)
        currentURL.searchParams.delete("modal")
        currentURL.searchParams.delete("message")
        history.replaceState("", "", currentURL.href)
      }
    },
  }
}
</script>
