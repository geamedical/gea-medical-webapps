/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    chart: [
        {
            id: '0',
            x: 10,
            y: 50,
            width: 80,
            height: 40,
            name: "Mulai",
            type: "output",
            shape: "rect",
        },
        {
            id: '1',
            x: 200,
            y: 50,
            width: 100,
            height: 60,
            name: "Selesai",
            type: "output",
            shape: "rect",
        },
    ],
    flow: [
        {
            id: "0",
            source: { id: "0", position: "right" },
            destination: {
                id: "1",
                position: "left",
            },
            type: "step",
            style: { borderColor: "#b1b1b7", borderWidth: "2px" },
            markerEnd: "arrowclosed",
        },
    ],
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'dokumentasi.data', 'read-user'],
        ['Buat Data Baru', 'mdi-plus-box', 'dokumentasi.add', 'create-user'],
    ]
})

const mutations = {
    SET_CHART(state, payload) {
        state.chart = payload
    },
    SET_FLOW(state, payload) {
        state.flow = payload
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
            $axios.get(`api/dokumentasi?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ state }) {
        return new Promise(resolve => {
            $axios.post('api/dokumentasi', state.form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/dokumentasi/${payload}`)
                .then(response => {
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
            $axios.put(`api/dokumentasi/${payload}`, form)
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
            $axios.delete(`api/dokumentasi/${payload}`)
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