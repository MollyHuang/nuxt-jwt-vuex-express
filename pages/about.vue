<template>
  <div>
    <h1>About</h1>
    <div><button type="button" @click="logout">LOG OUT</button></div>
    <h3><nuxt-link to="/groups">Groups</nuxt-link></h3>
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
          window.location.href = "/"
        }) 
    },
  },
  mounted(){
    console.log('[about.vue][mounted] document.cookie =', document.cookie)
  }
}
</script>
