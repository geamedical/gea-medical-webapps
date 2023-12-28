import Vue from 'vue'
import Vuex from 'vuex'
import $axios from './api'
// modules::start
import auth from './modules/auth.js'
import masterdata_user from './modules/masterdata_user.js'
import masterdata_role from './modules/masterdata_role.js'
import masterdata_akses from './modules/masterdata_akses.js'
import masterdata_dept from './modules/masterdata_dept.js'
import form_permintaan from './modules/form_permintaan.js'
import dokumentasi from './modules/dokumentasi.js'
import permission_nas from './modules/permission_nas'
import permission_server from './modules/permission_server'
import permintaan_akses_server from './modules/permintaan_akses_server'
import permintaan_akses_folder_nas_server from './modules/permintaan_akses_folder_nas_server'
// modules::end

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    token_expired: localStorage.getItem('expires_at'),
    snackbar: {
      status: false,
      data: []
    },
  },
  getters: {
    isAuth: state => state.token !== 'null' && state.token != null,
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_TOKEN_EXPIRED(state, payload) {
      state.token_expired = payload
    },
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    getnotif({},payload) {
      return new Promise(resolve => {
        const {
          page,
          limit,
          sortDesc,
        } = payload
        $axios.get(`api/notification?page=${page}&limit=${limit}&sortDesc=${sortDesc}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            resolve(error.response)
          })
      })
    },
    // eslint-disable-next-line no-empty-pattern
    user_login({},payload) {
      return new Promise(resolve => {
        const {
          page,
          limit
        } = payload
        $axios.get(`api/users-login?page=${page}&limit=${limit}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            resolve(error.response)
          })
      })
    },
  },
  modules: {
    auth,
    masterdata_user,
    masterdata_role,
    masterdata_akses,
    masterdata_dept,
    form_permintaan,
    dokumentasi,
    permission_nas,
    permission_server,
    permintaan_akses_server,
    permintaan_akses_folder_nas_server,
  }
})
