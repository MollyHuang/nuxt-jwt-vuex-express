<template>
  <div>
    <h1>About</h1>
    <h3>
      <nuxt-link to="/groups">Groups</nuxt-link>
      <nuxt-link to="/">Home</nuxt-link>
    </h3>
    <hr />
    <h3>isAuthenticated: {{isAuthenticated}}</h3>
    <div><button type="button" @click="logout">LOG OUT</button></div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return{
      isAuthenticated: this.$store.getters["auth/isAuthenticated"]
    }
  },
  methods: {
    async logout() {
      console.log('[about.vue][logout] ...')
      await this.$store.dispatch('auth/logout')
        .then((resp) => {
          console.log('[about.vue][logout] resp =', resp)
        })
        .catch((error) => {
          console.error('[about.vue][logout] error =', error)
        })
        .finally(() => {
          this.$router.push('/')
          //window.location.href = "/"
          console.log('[about.vue][logout][finally] this.$router.push("/")')
        }) 
    },
  },
  mounted(){
    // console.log('[about.vue][mounted] document.cookie =', document.cookie)
    console.log('[about.vue][mounted] this.$store.getters["auth/isAuthenticated"] =', this.$store.getters["auth/isAuthenticated"])
    if (!this.$store.getters["auth/isAuthenticated"]){
      console.log('[about.vue][mounted] this.$store.state.auth.id =', this.$store.state.auth.id)
      console.log('[about.vue][mounted] this.$store.state.auth.email_address =', this.$store.state.auth.email_address)
      this.$router.push('/')
    }
  }
}
</script>
