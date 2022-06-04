<template>
</template>
<script lang="ts">
import Vue from 'vue'
import { fetchWebApi } from "@/api/user" 

export default Vue.extend({
  name: "ModalView",
  created() {
    this.fetchWebApi()
  }, 
  methods: {
    async fetchWebApi() {
      this.$emit("update-user", await fetchWebApi())
    }
  }
})

</script>