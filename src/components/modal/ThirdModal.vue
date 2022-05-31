<template>
<div class="modal">
  <button @click.stop="closeModal" class="close-modal">&times;</button>
  <p>
    Third Modal Windowです。
  </p>
</div>
  
</template>

<script lang="ts">

import Vue from "vue"
import BaseModalMixin from "@/mixins/BaseModalMixin"

export default Vue.extend({
  name: "ThirdModal",
  mixins: [BaseModalMixin],
})

</script>
