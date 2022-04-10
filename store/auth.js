// store/auth.js

// reusable aliases for mutations
export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  LOGOUT: 'LOGOUT',
}

export const state = () => ({
  access_token: null, // JWT access token
  refresh_token: null, // JWT refresh token
  id: null, // user id
  email_address: null, // user email address
})

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER](state, { id, email_address }) {
    console.log('[store/auth.js][mutations][AUTH_MUTATIONS.SET_USER] id =', id)
    console.log('[store/auth.js][mutations][AUTH_MUTATIONS.SET_USER] email_address =', email_address)
    state.id = id
    state.email_address = email_address
    console.log('[store/auth.js][mutations][AUTH_MUTATIONS.SET_USER-end] state =', state)
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD](state, { access_token, refresh_token = null }) {
    // console.log('[store/auth.js][mutations][AUTH_MUTATIONS.SET_PAYLOAD] access_token =', access_token)
    // console.log('[store/auth.js][mutations][AUTH_MUTATIONS.SET_PAYLOAD] refresh_token =', refresh_token)
    state.access_token = access_token

    // refresh token is optional, only set it if present
    if (refresh_token) {
      state.refresh_token = refresh_token
    }
    console.log('[store/auth.js][mutations][AUTH_MUTATIONS.SET_PAYLOAD-end] state =', state)
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT](state) {
    state.id = null
    state.email_address = null
    state.access_token = null
    state.refresh_token = null
    console.log('[store/auth.js][mutations][AUTH_MUTATIONS.LOGOUT-end] state =', state)
  },
}

export const actions = {
  async login({ commit, dispatch }, { email_address, password }) {
    console.log('[store/auth.js][actions][login] email_address =', email_address)
    // console.log('[store/auth.js][actions][login] password =', password)

    // make an API call to login the user with an email address and password
    // const { data: { data: { user, payload } } } = await this.$axios.post(
    const response = await this.$axios.post(
      '/api/auth/login',
      { email_address, password }
    )
    // console.log('[store/auth.js][actions][login] response =', response)
    if (response.status !== 200) return response

    // console.log('[store/auth.js][actions][login] response.data =', response.data)
    const { user, payload } = response.data
    console.log('[store/auth.js][actions][login][$axios.post] { user, payload } =', { user, payload })

    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
    return response
  },

  async register({ commit }, { email_addr, password }) {
    // make an API call to register the user
    const { data: { data: { user, payload } } } = await this.$axios.post(
      '/api/auth/register',
      { email_address, password }
    )

    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  async refresh({ commit, state }) {
    const { refresh_token } = state

    // make an API call using the refresh token to generate a new access token
    const { data: { data: { payload } } } = await this.$axios.post(
      '/api/auth/refresh',
      { refresh_token }
    )

    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // logout the user
  logout({ commit, state }) {
    console.log('[store/auth.js][actions][logout] state =', state)
    commit(AUTH_MUTATIONS.LOGOUT)
    console.log('[store/auth.js][actions][logout-end] state =', state)
  },
}

export const getters = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (state) => {
    return state.access_token && state.access_token !== ''
  },
}