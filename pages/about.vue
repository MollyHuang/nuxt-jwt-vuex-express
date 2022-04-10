<template>
  <div>
    <h1>About</h1>
    <h3>
      <nuxt-link to="/groups">Groups</nuxt-link>
      <nuxt-link to="/">Home</nuxt-link>
    </h3>
    <div><button type="button" @click="logout">LOG OUT</button></div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return{
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
    console.log('[about.vue][mounted] document.cookie =', document.cookie)
  }
}
</script>
