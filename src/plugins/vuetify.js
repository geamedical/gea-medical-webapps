/* eslint-disable vue/multi-word-component-names */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueApexCharts from 'vue-apexcharts'
import VueFullscreen from 'vue-fullscreen'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import VueNativeNotification from 'vue-native-notification'
import VueCryptojs from 'vue-cryptojs'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)
Vue.use(VueApexCharts)
Vue.use(VueFullscreen)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuetify)
Vue.use(VueSweetalert2);
Vue.use(VueCryptojs);
Vue.use(VueNativeNotification, {
    requestOnNotify: true
  })
const url = 'http://192.168.84.180:3333/'
const SocketInstance = socketio.connect(url)
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketInstance,
}))

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                bg: '#f7f8ff',
                appbar: '#f7f8ff',
                drawer: '#0C134F',
                rightdrawer: '#f7f8ff',
                footer: '#f7f8ff',
                card: '#ffffff',
                primary: '#0C134F',
                secondary: '#1D267D',
                accent: '#43A047',
                error: '#D80032',
            },
            dark: {
                card: '#00303C',
                appbar: '#002028',
                drawer: '#002028',
                rightdrawer: '#002028',
                footer: '#002028',
                bg: '#002028',
                primary: '#00DC82',
                secondary: '#255461',
                accent: '#BEF264',
                error: '#E879F9',
            },
        },
    },
});
