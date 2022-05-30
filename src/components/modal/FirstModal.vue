
<template>
<div class="modal">
  <button @click.stop="closeModal" class="close-modal">&times;</button> <!-- モーダルを閉じるボタン -->
  <p v-text="message"> </p>
  <p>
    <button @click.stop="openSecondModal">Open Other Modal</button>
  </p>
</div>
  
</template>

<script>

import Vue from "vue"
import BaseModalMixin from "@/mixins/BaseModalMixin"
import { Modal } from "@/Stores/ModalViewStore";
import modalViewStore from "@/Stores/ModalViewStore";

export default Vue.extend({
  name: "FirstModal",
  mixins: [BaseModalMixin],
  methods: {
    openSecondModal() {
      const modal = new Modal({name: "second_modal", params: {}})
      modalViewStore.dispatch("push", modal)
    }
  },
  computed: {
    message() {
      if (this.params?.message) {
        return this.params.message
      } else {
        return "モーダルウィンドウです。" 
      }
    }
  }
})

</script>
