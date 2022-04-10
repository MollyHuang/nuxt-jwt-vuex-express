<template>
  <div>
    <h1>Groups</h1>
    <h3>
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/">Home</nuxt-link>
    </h3>
    <div><button type="button" @click="logout">LOG OUT</button></div>
  </div>
</template>

<script>
export default {
  name: 'GroupsPage',
  data() {
    return{
    }
  },
  methods: {
    async logout() {
      console.log('[groups.vue][logout] ...')
      await this.$store.dispatch('auth/logout')
        .then((resp) => {
          console.log('[groups.vue][logout] resp =', resp)
        })
        .catch((error) => {
          console.error('[groups.vue][logout] error =', error)
        })
        .finally(() => {
          // this.$router.push('/')
          window.location.href = "/"
          console.log('[groups.vue][logout][finally] window.location.href = "/"')
        }) 
    },
  },
  mounted(){
    console.log('[groups.vue][mounted] document.cookie =', document.cookie)
    this.$nextTick(()=>{
      // this.$store.commit("token/clearToken");
      // this.clear();
    })
  }
}
</script>
