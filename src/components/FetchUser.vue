<template>
  <div>
    <div v-if="user">
      UserName: {{ user.login }}
      <br>
      Url: {{ user.url }}
    </div>

    <div>
      <input type="text" v-model="userName">
      <button @click="fetchUser"> reFetch User </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fetchWebApi, UserResponse } from '@/api/user'
type UserData = {
  user: UserResponse | null,
  userName: string
}
export default Vue.extend({
  data(): UserData {
    return {
      user: null,
      userName: "webuilder240",
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const response = await fetchWebApi({user: this.userName})
        this.user = response
      } catch(e) {
        alert("error!!!!")
        console.error(e)
      }
    },
  }
})
</script>