/* eslint-disable no-empty-pattern */
import $axios from '../api'
import moment from 'moment'
const state = () => ({
    form: {
        role_id: '',
        dept_id: '',
        name: '',
        nik: '',
        email: '',
        username: '',
        birthdate: '',
        gender: '',
        marital: '',
        npwp: '',
        noktp: '',
        address: '',
        telp: '',
        activation: false,
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-pengguna.data', 'read-user'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-pengguna.add', 'create-user'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            role_id: '',
            dept_id: '',
            name: '',
            nik: '',
            email: '',
            username: '',
            birthdate: '',
            gender: '',
            marital: '',
            npwp: '',
            noktp: '',
            address: '',
            telp: '',
            activation: false,
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
            const { form } = state
            const datapost = {
                role_id: form.role_id,
                dept_id: form.dept_id,
                name: form.name,
                nik: form.nik,
                email: form.email,
                username: form.username,
                birthdate: moment(form.birthdate).format('YYYY-MM-DD'),
                gender: form.gender,
                marital: form.marital,
                npwp: form.npwp,
                noktp: form.noktp,
                address: form.address,
                telp: form.telp,
                activation: form.activation ? 'valid' : 'invalid',
            }
            $axios.post('api/users', datapost)
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
                    state.form = {
                        role_id: x.role_id,
                        dept_id: x.dept_id,
                        name: x.name,
                        nik: x.nik,
                        email: x.email,
                        username: x.username,
                        birthdate: x.birthdate,
                        gender: x.gender,
                        marital: x.marital,
                        npwp: x.npwp,
                        noktp: x.noktp,
                        address: x.address,
                        telp: x.telp,
                        activation: x.activation === 'valid' ? true : false,
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
            const datapost = {
                role_id: form.role_id,
                dept_id: form.dept_id,
                name: form.name,
                nik: form.nik,
                email: form.email,
                username: form.username,
                birthdate: moment(form.birthdate).format('YYYY-MM-DD'),
                gender: form.gender,
                marital: form.marital,
                npwp: form.npwp,
                noktp: form.noktp,
                address: form.address,
                telp: form.telp,
                activation: form.activation ? 'valid' : 'invalid',
            }
            $axios.put(`api/users/${payload}`, datapost)
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