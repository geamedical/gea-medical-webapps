/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        role_id: '',
        dept_id: '',
        name: '',
        email: '',
        nik: '',
        password: '',
        password_confirmation: '',
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-pengguna.data', 'read-user'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-pengguna.add', 'create-user'],
        // ['Grafik', 'mdi-chart-bar', 'grafik-data-users-user'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            role_id: '',
            dept_id: '',
            name: '',
            email: '',
            nik: '',
            password: '',
            password_confirmation: '',
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
            $axios.get(`api/users?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_form_user() {
        return new Promise(resolve => {
            $axios.get('api/attr_form')
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ state, commit }) {
        return new Promise(resolve => {
            $axios.post('api/users', state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ state }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/users/${payload}`)
                .then(response => {
                    const x = response.data.data
                    console.log(x);
                    state.form = {
                        role_id: x.role_id,
                        dept_id: x.dept_id,
                        name: x.name,
                        email: x.email,
                        nik: x.nik,
                        password: x.password,
                        password_confirmation: x.password,
                    }
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ state }, payload) {
        return new Promise(resolve => {
            const { form } = state
            $axios.put(`api/users/${payload}`, form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    delete({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/users/${payload}`)
                .then(response => {
                    resolve(response.data)
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