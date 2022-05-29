
<template>
<div class="modal">
  <button @click.stop="closeModal" class="close-modal">&times;</button> <!-- モーダルを閉じるボタン -->
  <p v-text="message"> </p>
  <p>
    <button @click.stop="openSecondModal">Open Other Modal</button>
  </p>
</div>
  
</template>

<script lang="ts">

import Vue from "vue"
import BaseModalMixin from "@/mixins/BaseModalMixin"
import SecondModal from "./SecondModal.vue"
import { Modal } from "@/Stores/ModalViewStore";
import modalViewStore from "@/Stores/ModalViewStore";

export default Vue.extend({
  name: "FirstModal",
  mixins: [BaseModalMixin],
  methods: {
    openSecondModal(): void {
      // 内部でSecondModalをCallしているとなぜか動かない
      const modal: Modal = {view: SecondModal, params: {}}
      modalViewStore.dispatch("push", modal)
    }
  },
  computed: {
    message(): string {
      if (this.params?.message) {
        return this.params.message
      } else {
        return "モーダルウィンドウです。" 
      }
    }
  }
})

</script>
