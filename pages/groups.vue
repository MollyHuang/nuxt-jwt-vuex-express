<template>
  <div>
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
          window.location.href = "/"
        })
        .catch((error) => {
          console.error('[groups.vue][logout] error =', error)
        })
    },
  },
  mounted(){
    this.$nextTick(()=>{
      // this.$store.commit("token/clearToken");
      // this.clear();
    })
  }
}
</script>
