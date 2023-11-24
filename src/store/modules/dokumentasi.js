/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    chart: [
        {
            id: `${Date.now() + Math.random()}`,
            x: 10,
            y: 50,
            width: 80,
            height: 40,
            name: "Mulai",
            type: "output",
            shape: "rect",
        },
        {
            id: `${Date.now() + Math.random()+1}`,
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
            source: { id: `${Date.now() + Math.random()}`, position: "right" },
            destination: {
                id: `${Date.now() + Math.random()+1}`,
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
            $axios.get(`api/documentation?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ }, payload) {
        return new Promise(resolve => {
            $axios.post('api/documentation', payload)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ commit }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/documentation/${payload}`)
                .then(response => {
                    const chartData = response.data.data.data.chart
                    const flowData = response.data.data.data.flow
                    commit('SET_CHART', chartData)
                    const fl = []
                    flowData.forEach(el => {
                        fl.push({
                            id: `${el.id}`,
                            source: JSON.parse(el.source),
                            destination: JSON.parse(el.destination),
                            type: el.type,
                            style: JSON.parse(el.style),
                            markerEnd: el.markerd,
                        })
                    });
                    commit('SET_FLOW', fl)
                    resolve(response.data.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/documentation/${payload.id}`, payload.form)
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
            $axios.delete(`api/documentation/${payload}`)
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