<template>
  <fullscreen v-model="fullscreen">
    <v-app :style="{ background: $vuetify.theme.themes[theme].bg }">
      <v-navigation-drawer app v-model="drawer" color="drawer" dark>
        <ListLeftDrawer />
      </v-navigation-drawer>
      <v-app-bar clipped-right fixed app color="appbar" elevation="0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-spacer />
        <v-btn icon @click="toggleFullscreen">
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <notif-info></notif-info>
        <v-divider class="mx-3" vertical></v-divider>
        <SwitchMode class="mt-5 mr-2" />
        <v-divider class="mx-3" vertical></v-divider>
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-navigation-drawer v-model="rightDrawer" right app fixed clipped color="rightdrawer">
        <list-rightdrawer-view />
      </v-navigation-drawer>
      <v-footer app inset padless absolute>
        <v-card flat tile class="text-center flex" color="footer">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
          <p>{{ timer }}</p>
          <v-card-text class="pt-0">
            GEA Medical Tower, 7th Floor, Cengkareng Businnes City, Jl. Atang
            Sanjaya No.21, RT.006/RW.007, Benda, Tangerang City, Banten 15125
          </v-card-text>
          <v-card-text>
            {{ new Date().getFullYear() }} —
            <strong>PT. MEGA PRATAMA MEDICALINDO</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-app>
  </fullscreen>
</template>
<script>
import SwitchMode from "@/components/SwitchMode.vue";
import ListLeftDrawer from "@/layouts/components/ListLeftdrawerView.vue";
import ListRightdrawerView from "./components/ListRightdrawerView.vue";
import NotifInfo from "./components/NotifInfo.vue";
import { mapState, mapActions } from "vuex";
import moment from 'moment'
export default {
  name: "App",
  components: {
    SwitchMode,
    ListLeftDrawer,
    ListRightdrawerView,
    NotifInfo,
  },
  data() {
    return {
      fullscreen: false,
      drawer: true,
      rightDrawer: true,
      icons: ["mdi-facebook", "mdi-linkedin", "mdi-instagram"],
      timer: 0
    };
  },
  mounted: function () {
    const startMoment = moment();
    const endMoment = moment(new Date(this.token_expired));
    const diffSeconds = endMoment.diff(startMoment, 'seconds');
    this.intervalSession(diffSeconds)
  },
  methods: {
    ...mapActions('auth', ['logout']),
    intervalSession(time) {
      this.timer = setInterval(() => {
        this.logout().then(e => {
          if (e === true) {
            this.$router.push({ name: 'login' })
          }
        })
        // console.log('LOGOUT BOSS KUH');
      }, time)
    },
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
    },
    parseSnackBar(data) {
      let phtml = '<div>'
      phtml += `Permintaan ${data.type} dengan detail ${data.detail} telah diperbaharui, periksa sekarang!`
      phtml += '</div>'
      return phtml
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  computed: {
    ...mapState(["token_expired"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
<style scoped>
.v-navigation-drawer>>>.v-navigation-drawer__border {
  display: none;
}

.theme--dark.v-list {
  background: #002028 !important;
  color: #ffffff !important;
}
</style>
