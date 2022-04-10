<template>
  <div>
    <h1>會員登入</h1>
    <div>Email：<input type="text" v-model="email" maxlength="32"></div>
    <div>密碼：<input type="password" v-model="pw" keyup.13="login"></div>
    <div><button type="button" @click="login">LOGIN</button></div>
    <div class="error" v-if="error">{{error}}</div>
    <hr>
    <h3><nuxt-link to="/groups">Groups</nuxt-link></h3>
    <h3><nuxt-link to="/about">About</nuxt-link></h3>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return{
      email: 'me@example.com',
      pw: 'abc123',
      error: null
    }
  },
  methods: {
    async login() {
      // console.log('[index.vue][login] ...')
      this.error = null
      const email_address = this.email
      const password = this.pw
      console.log('[index.vue][login] email_address =', email_address)
      // console.log('[index.vue][login] password =', password)

      await this.$store.dispatch('auth/login', { email_address, password })
        .then((resp) => {
          console.log('[index.vue][login] resp =', resp)
          this.$router.push('/groups')
          //window.location.href = "/groups"
        })
        .catch((error) => {
          console.error('[index.vue][login] error =', error)
          this.error = '無效的帳密'
          return
        })
    }
  },
  mounted(){
    console.log('[index.vue][mounted] document.cookie =', document.cookie)
    // this.$nextTick(()=>{
      // this.$store.commit("token/clearToken");
      // this.clear();
    // })
  }
}
</script>

<style lang="css">
  .error {
    color: brown;
    padding: 1rem;
  }
</style>