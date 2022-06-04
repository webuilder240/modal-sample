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

    <div>
      <input type="text" v-model="formData.content">
      <button @click="submit"> Submit!!! </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fetchWebApi, submitWebApi, updateWebApi, UserResponse } from '@/api/user'

type Form = {
  id: number | null,
  content: string | null
}
type Data = {
  user: UserResponse | null,
  userName: string, 
  formData: Form
}
export default Vue.extend({
  data(): Data {
    return {
      user: null,
      userName: "webuilder240",
      formData: {
        id: null, 
        content: null
      }
    }
  },
  created() {
    this.fetchUser()
    this.setId()
  },
  methods: {
    setId() {
      const url = new URL(location.href)
      const id = url.searchParams.get("id")
      if (id) {
        this.formData.id = parseInt(id)
      }
    },
    async submit() {
      try {
        await submitWebApi(this.formData)
      } catch(e) {
        console.error(e)
      }
    },
    async updateSubmit() {
      try {
        if (this.formData.id && this.formData.content) {
          await updateWebApi({id: this.formData.id, content: this.formData.content})
        }
      } catch(e) {
        console.error(e)
      }
    },
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