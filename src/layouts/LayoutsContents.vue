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
      <v-container>
        <v-footer app inset padless absolute class="mt-5">
          <v-card flat tile class="text-center flex" color="footer">
            <v-card-text>
              <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                <v-icon size="24px">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-card-text>
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
      </v-container>
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
      timer: null,
      alertSession: false
    };
  },
  watch: {
    async alertSession(e) {
      if (e) {
        if (localStorage.getItem('username') !== null) {
          const { value: password } = await this.$swal({
            title: "Pembaharuan Autentikasi",
            input: "password",
            inputLabel: "Password",
            inputPlaceholder: "Enter your password",
            inputAttributes: {
              maxlength: "10",
              autocapitalize: "off",
              autocorrect: "off"
            }
          });
          if (password) {
            const datapost = {
              username: localStorage.getItem('username'),
              password: password
            }
            this.submitLogin(datapost).then((res) => {
              if (res.status === true) {
                this.$router.push({ name: "dashboard" }).catch(() => true);
              } else {
                this.$swal({
                  title: "Error!",
                  text: res.data.toString(),
                  icon: "warning",
                });
                this.logout().then(e => {
                  if (e === true) {
                    this.$router.push({ name: 'login' })
                  }
                })
              }
            });
          }
        } else {
          this.$swal({
            title: "Sesi selesai",
            text: "Aktifkan fungsi 'Ingat Saya' ketika anda memulai sesi untuk mempermudah kami mengenali anda.",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Mulai sesi baru",
          }).then((result) => {
            if (result.isConfirmed) {
              this.logout().then(e => {
                if (e === true) {
                  this.$router.push({ name: 'login' })
                }
              })
            }
          });
        }
        this.alertSession = false
        clearInterval(this.timer)
      }
    },
    token(e) {
      if (e !== null) {
        this.counterSession()
      }
    }
  },
  mounted: function () {
    this.counterSession()
  },
  methods: {
    ...mapActions('auth', ['logout', 'submitLogin']),
    counterSession() {
      const startMoment = moment();
      const endMoment = moment(new Date(this.token_expired));
      const duration = moment.duration(endMoment.diff(startMoment));
      const totalMilliseconds = duration.asMilliseconds();
      this.intervalSession(totalMilliseconds)
    },
    intervalSession(time) {
      this.timer = setInterval(async () => {
        this.alertSession = true
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
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  computed: {
    ...mapState(["token_expired", "token"]),
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
