/* eslint-disable no-empty-pattern */
import $axios from '../api'
import moment from 'moment'
const state = () => ({
    authenticated: [],
    permissions: [],
    formProfile: {
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
        password: '',
        password_confirmation: '',
        activation: false,
    },
})

const mutations = {
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    },
    ASSIGN_PERMISSION(state, payload) {
        state.permissions = payload
    },
    SET_FORM_PROFILE(state, payload) {
        state.formProfile = {
            role_id: payload.role_id,
            dept_id: payload.dept_id,
            name: payload.name,
            nik: payload.nik,
            email: payload.email,
            username: payload.username,
            birthdate: moment(payload.birthdate).format('YYYY-MM-DD'),
            gender: payload.gender,
            marital: payload.marital,
            npwp: payload.npwp,
            noktp: payload.noktp,
            address: payload.address,
            telp: payload.telp,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
            activation: payload.activation,
        }
    },
    CLEAR_FORM_PROFILE(state) {
        state.formProfile = {
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
            password: '',
            password_confirmation: '',
            activation: false,
        }
    },
}

const actions = {
    submitLogin({ commit }, payload) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise(resolve => {
            $axios.post('api/login', payload)
                .then(response => {
                    if (response.data.status) {
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('expires_at', response.data.data.expires_at)
                        commit('SET_TOKEN', response.data.data.token, { root: true })
                        commit('SET_TOKEN_EXPIRED', response.data.data.expires_at, { root: true })
                    }
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    logout({ commit }) {
        return new Promise(resolve => {
            $axios.post('api/logout')
                .then(response => {
                    localStorage.setItem('token', null)
                    commit('SET_TOKEN', null, { root: true })
                    resolve(response.data.status)
                })
                .catch(error => {
                    resolve(error.response.data.status)
                })
        })
    },
    getUserLogin({ commit }) {
        return new Promise(resolve => {
            $axios.get('api/profile')
                .then(response => {
                    commit('ASSIGN_USER_AUTH', response.data.data.user)
                    commit('ASSIGN_PERMISSION', response.data.data.permission)
                    resolve(response)
                })
                .catch(error => {
                    localStorage.setItem('token', null)
                    commit('SET_TOKEN', null, { root: true })
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
    getProfile({ commit }) {
        return new Promise(resolve => {
            $axios.get('api/profile')
                .then(response => {
                    const user = response.data.data.user;
                    const payload = {
                        role_id: user.role_id,
                        dept_id: user.dept_id,
                        name: user.name,
                        nik: user.nik,
                        email: user.email,
                        username: user.username,
                        birthdate: user.birthdate,
                        gender: user.gender,
                        marital: user.marital,
                        npwp: user.npwp,
                        noktp: user.noktp,
                        address: user.address,
                        telp: user.telp,
                        password: '',
                        password_confirmation: '',
                        activation: user.activation === 'valid' ? true : false,
                    }
                    commit('SET_FORM_PROFILE', payload)
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    updateProfile({ state }) {
        return new Promise(resolve => {
            const { formProfile } = state
            $axios.post('api/profile-update', formProfile)
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