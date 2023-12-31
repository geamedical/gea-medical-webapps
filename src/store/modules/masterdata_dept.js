/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        company: '',
        code: '',
        deptname: '',
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-dept.data', 'read-departement'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-dept.add', 'create-departement'],
        // ['Grafik', 'mdi-chart-bar', 'grafik-data-users-user'],
    ]
})

const mutations = {
    SET_FORM(state, payload) {
        state.form = {
            company: payload.company,
            code: payload.code,
            deptname: payload.deptname,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            company: '',
            code: '',
            deptname: '',
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
            $axios.get(`api/dept?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
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
            $axios.post('api/dept', state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ commit }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/dept/${payload}`)
                .then(response => {
                    const form = {
                        company: response.data.data.company,
                        code: response.data.data.code,
                        deptname: response.data.data.deptname,
                    }
                    commit('SET_FORM', form)
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ state, commit }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/dept/${payload}`, state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    delete({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/dept/${payload}`)
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