/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        authorization_id: '',
        server: '',
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'server-permission.data', 'read-permission'],
        ['Buat Data Baru', 'mdi-plus-box', 'server-permission.add', 'create-permission'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            authorization_id: '',
            server: '',
        }
    },
}

const actions = {
    index({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortBy,
                sortDesc
            } = payload.options
            const search = payload.search
            $axios.get(`api/server-permission?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_form_user({}, payload) {
        return new Promise(resolve => {
            $axios.get(`api/users?page=1&limit=10&sortBy=&sortDesc=true&search=${payload.search}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ commit, state }) {
        return new Promise(resolve => {
            $axios.post('api/server-permission', state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ state }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/server-permission/${payload}`)
                .then(response => {
                    const x = response.data.data
                    state.form = {
                        authorization_id: x.authorization_id,
                        server: x.server,
                    }
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ commit, state }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/server-permission/${payload}`, state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    delete({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/server-permission/${payload}`)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}