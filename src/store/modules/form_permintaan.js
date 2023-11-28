/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        user: {
            name: '',
            telp: '',
            role_id: '',
            dept_id: '',
        },
        request: []
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'form-permintaan.data', 'read-form-permintaan'],
        ['Buat Data Baru', 'mdi-plus-box', 'form-permintaan.add', 'create-form-permintaan'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            user: {
                name: '',
                telp: '',
                role_id: '',
                dept_id: '',
            },
            request: []
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
            $axios.get(`api/form-permintaan?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_form() {
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
    storeNewEmp({ state, commit }) {
        return new Promise(resolve => {
            $axios.post('api/form-permintaan-nemp', state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ state, commit }) {
        return new Promise(resolve => {
            $axios.post('api/form-permintaan', state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/form-permintaan/${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    setStatus({ }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/form-permintaan/${payload.id}`, payload)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/form-permintaan/${payload.id}`, payload.form)
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
            $axios.delete(`api/form-permintaan/${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    validatePin({ }, payload) {
        return new Promise(resolve => {
            $axios.post(`api/form-permintaan/validate-pin`, { pin: payload })
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