<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-badge color="primary" :content="`${count !== null && count > 0 ? `Baru ${count}` : 0}`" overlap>
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-list subheader two-line dense v-scroll.self="onScroll" class="overflow-y-auto" max-height="400">
      <v-list-item-group v-model="selected" active-class="primary--text" v-if="notifdata.length > 0">
        <div v-for="(item, index) in notifdata" :key="index" @click="lihat(item.id, item.type)">
          <v-list-item>
            <v-icon :color="item.color">
              {{ item.icon }}
            </v-icon>
            <v-list-item-content v-html="item.data_encode">
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>{{
                item.view === "n" ? "Lihat" : ""
              }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index < notifdata.length - 1" :key="index"></v-divider>
        </div>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>Tidak ada data</v-list-item-title>
          <v-list-item-subtitle>Untuk saat ini anda tidak memiliki
            pemberitahuan.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import audioNotif from '@/assets/audio-notif/notif-permintaan.wav'
export default {
  data() {
    return {
      scroll: 0,
      count: null,
      selected: null,
      notifdata: [],
      options: {
        page: 1,
        limit: 10,
        sortDesc: true,
      },
    };
  },
  computed: {
    ...mapGetters(["isAuth"]),
    ...mapState("auth", {
      authenticated: (state) => state.authenticated,
    }),
  },
  mounted() {
      this.getNotifLogin();
      this.getNotifLogout();
      this.getNotifPermintaan();
      this.getNotifData();
  },
  watch: {
    scroll(e) {
      if (e > 420) {
        this.options.page++;
        this.getNotifData();
      }
      if (e < 0) {
        this.options.page--;
        this.getNotifData();
      }
    },
    isAuth(e) {
      if (e === true) {
        this.getNotifLogin();
        this.getNotifLogout();
        this.getNotifPermintaan();
        this.getNotifData();
      }
    }
  },
  methods: {
    ...mapActions(["getnotif", "showNotif"]),
    setNotifier(body) {
      this.$notification.show('Hello World', {
        body: body
      }, {
        onclick: function (e) {
          e.preventDefault()
          window.open("http://localhost:8080", "_blank");
        },
      })
    },
    onScroll(e) {
      this.scroll = e.target.scrollTop;
    },
    subtitle(data, type) {
      const dt = JSON.parse(data);
      return `<strong>${type.charAt(0).toUpperCase() +
        type.slice(1).toLowerCase().replace(/-/g, " ")
        } </strong> pada <strong>${moment(dt.created_at)
          .locale("id")
          .startOf("hour")
          .fromNow()}</strong>`;
    },
    getNotifLogin() {
      this.sockets.subscribe("auth-login:user", (data) => {
        this.getNotifData();
        this.setNotifier(`User atas nama ${data.name} telah online.`)
      });
    },
    getNotifLogout() {
      this.sockets.subscribe("auth-logout:user", (data) => {
        this.getNotifData()
        this.setNotifier(`User atas nama ${data.name} telah offline.`)
      });
    },
    getNotifPermintaan() {
      this.sockets.subscribe("form:permintaan:setstatus", (data) => {
        this.getNotifData();
        if (data.user.id === this.authenticated.id) {
          this.setNotifier(`Permohonan permintaan atas nama ${data.user.name} telah ditindak lanjut, periksa sekarang!`)
          new Audio(audioNotif).play()
        }
      });
      this.sockets.subscribe("form:permintaan", (data) => {
        this.getNotifData();
        if (data.user_target === this.authenticated.id) {
          this.setNotifier(`User atas nama ${data.user.name} telah mengajukan form permintaan, periksa sekarang!`)
        }
      });
    },
    getNotifData() {
      this.getnotif(this.options).then((e) => {
        if (e.status !== 401) {
          this.count = e.count;
          this.notifdata = e.pagination.data;
        }
      });
    },
    lihat(e, type) {
      this.showNotif(e).then((res) => {
        if (res.status)
          this.getNotifData()
      })
      switch (type) {
        case 'form-permintaan':
          this.$router.push({ name: "form-permintaan.data" }).catch(() => { })
          break;
        case 'lainya':
          this.$router.push({ name: "dashboard" }).catch(() => { })
          break;
      }
    },
  },
};
</script>
