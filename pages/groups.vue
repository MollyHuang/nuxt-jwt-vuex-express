<template>
  <div>
    <h1>Groups</h1>
    <h3>
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/">Home</nuxt-link>
    </h3>
    <hr />
    <h3>isAuthenticated: {{isAuthenticated}}</h3>
    <h3>uid: {{whoami.uid}}</h3>
    <h3>email: {{whoami.email}}</h3>
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
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"]
    },
    whoami () {
      return {
        
        uid: this.$store.state.auth.id,
        email: this.$store.state.auth.email_address
      }
    } 
  },
  methods: {
    async logout() {
      console.log('[groups.vue][logout] ...')
      await this.$store.dispatch('auth/logout')
        .then((resp) => {
          console.log('[groups.vue][logout] resp =', resp)
          // this.$router.push('/')
        })
        .catch((error) => {
          console.error('[groups.vue][logout] error =', error)
        })
        .finally(() => {
          this.$router.push('/')
          // window.location.href = "/"
          console.log('[groups.vue][logout][finally] ...')
        }) 
    },
  },
  mounted(){
    // console.log('[groups.vue][mounted] document.cookie =', document.cookie)
    console.log('[groups.vue][mounted] this.$store.getters["auth/isAuthenticated"] =', this.$store.getters["auth/isAuthenticated"])
    if (this.$store.getters["auth/isAuthenticated"]){
      console.log('[groups.vue][mounted] this.$store.state.auth.id =', this.$store.state.auth.id)
      console.log('[groups.vue][mounted] this.$store.state.auth.email_address =', this.$store.state.auth.email_address)
      this.$nextTick(()=>{
        this.$nuxt.$loading.start()
        // this.isAuthenticated = this.$store.getters["auth/isAuthenticated"]
        // this.email = this.@store.state.auth.email_address
        // this.clear();
      })
    }
  }
}
</script>
