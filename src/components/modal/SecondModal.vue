<template>
<div class="modal">
  <!-- モーダル-->
  <button @click.stop="closeModal" class="close-modal">&times;</button> <!-- モーダルを閉じるボタン -->
  <p>
    Second Modal Windowです。
  </p>
</div>
  
</template>

<script lang="ts">

import Vue from "vue"
import BaseModalMixin from "@/mixins/BaseModalMixin"

export default Vue.extend({
  name: "SecondModal",
  mixins: [BaseModalMixin],
})

</script>
