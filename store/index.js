// store/index.js

// ....
export const actions = {
  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  // automatically refresh the access token on the initial request to the server, if possible
  async nuxtServerInit({ dispatch, commit, state }) {
    console.log('[store/index.js][nuxtServerInit] state.auth =', state.auth)

    const { access_token, refresh_token } = state.auth

    if (access_token && refresh_token) {
      try {
        // refresh the access token
        console.log('[store/index.js][nuxtServerInit] 有 token - refresh看看')
        await dispatch('auth/refresh')
      } catch (e) {
        // catch any errors and automatically logout the user
        console.log('[store/index.js][nuxtServerInit] 沒 token 直接登出')
        await dispatch('auth/logout')
      }
    }
  },
}
// ...