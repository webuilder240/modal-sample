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
  <div v-for="modal, key in modalState" :key="key" v-text="modal"></div>
</div>
</template>

<script>
import FirstModal from "@/components/modal/FirstModal.vue";
import SecondModal from "@/components/modal/SecondModal.vue";
import modalViewStore from "@/Stores/ModalViewStore"

export default {
  created() {
    this.modalState = modalViewStore.state.modals
    modalViewStore.onChange(() => {
      this._onChange()
    })
  },
  methods: {
    _onChange() {
      this.modalState = modalViewStore.state.modals
    },
    openSecondModal() {
      modalViewStore.dispatch("push", {view: SecondModal, params: {}})
    },
    openFirstModal() {
      modalViewStore.dispatch("push", {view: FirstModal, params: {}})
    },
    openFirstModalWithMessage() {
      modalViewStore.dispatch("push", {view: FirstModal, 
        params: {message: "Hello World"}, 
        queryParams: {
          name: "first_modal",
          query: {
            "message": "Hello World",
          }
        }
      })
    },
  }
}
</script>
