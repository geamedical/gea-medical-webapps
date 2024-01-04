<template>
  <v-menu offset- :close-on-content-click="closemenu">
    <template v-slot:activator="{ on, attrs }">
      <v-badge color="primary" :content="`${count !== null && count > 0 ? `Baru ${count}` : 0}`" overlap>
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-list subheader two-line dense class="overflow-y-auto" max-height="400" max-width="400">
      <v-list-item-group v-model="selected" active-class="primary--text" v-if="notifdata.length > 0">
        <div v-for="(item, index) in notifdata" :key="index" @click="lihat(item.tablename)">
          <v-list-item>
            <v-list-item-icon>
              <v-icon :color="getColor(item.tablename)">{{ getIcon(item.tablename) }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ setTitle(item.tablename) }}</v-list-item-title>
              <v-list-item-subtitle>{{ setSubtitle(item) }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>{{
                item.status === "n" || item.status === "w" ? "Lihat" : ""
              }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index < notifdata.length - 1" :key="index"></v-divider>
        </div>
        <div class="d-flex justify-center">
          <v-col cols="12" sm="3">
            <v-btn icon color="green" @click="loadMore">
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </v-col>
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
import audioNotif from '@/assets/audio-notif/notif-permintaan.wav'
export default {
  data() {
    return {
      count: null,
      closemenu: false,
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
    if (this.isAuth) {
      this.getNotifPermintaan();
      this.getNotifData();
    }
  },
  watch: {
    isAuth(e) {
      if (e === true) {
        this.getNotifPermintaan();
        this.getNotifData();
      }
    }
  },
  methods: {
    ...mapActions(["getnotif"]),
    loadMore() {
      this.closemenu = false
      this.options.page++;
      this.getNotifData();
    },
    setNotifier(body) {
      this.$notification.show('Pemberitahuan', {
        body: body
      }, {
        onclick: function (e) {
          e.preventDefault()
          window.open(process.env.BASE_URL, "_blank");
        },
      })
    },
    getColor(data) {
      switch (data) {
        case 'form_permintaan_akses':
          return 'primary'
        case 'access_server_requests':
          return 'secondary'
        case 'access_nas_directory_requests':
          return 'accent'
      }
    },
    getIcon(data) {
      switch (data) {
        case 'form_permintaan_akses':
          return 'mdi-receipt-send'
        case 'access_server_requests':
          return 'mdi-server-network-outline'
        case 'access_nas_directory_requests':
          return 'mdi-folder-lock-open'
      }
    },
    setTitle(data) {
      switch (data) {
        case 'form_permintaan_akses':
          return 'Permintaan akses'
        case 'access_server_requests':
          return 'Permintaan akses server'
        case 'access_nas_directory_requests':
          return 'Permintaan akses folder NAS server'
      }
    },
    setSubtitle(data) {
      switch (data.tablename) {
        case 'form_permintaan_akses':
          return `User atas nama ${data.from_user.name} dengan No. NIK ${data.from_user.nik} telah mengajukan permohonan permintaan akses. Anda memiliki kewajiban untuk menindak lanjuti permohonan tersebut.`
        case 'access_server_requests':
          return `User atas nama ${data.from_user.name} dengan No. NIK ${data.from_user.nik} telah mengajukan permohonan permintaan akses server. Anda memiliki kewajiban untuk menindak lanjuti permohonan tersebut.`
        case 'access_nas_directory_requests':
          return `User atas nama ${data.from_user.name} dengan No. NIK ${data.from_user.nik} telah mengajukan permohonan permintaan akses folder NAS server. Anda memiliki kewajiban untuk menindak lanjuti permohonan tersebut.`
      }
    },
    getNotifPermintaan() {
      this.sockets.subscribe("notif:permintaan-akses", (data) => {
        const cek = data.to.includes(this.authenticated.id)
        if (cek) {
          this.getNotifData();
          this.setNotifier(data.message)
          new Audio(audioNotif).play()
        }
      });
    },
    getNotifData() {
      this.getnotif(this.options).then((e) => {
        if (e.status !== 401) {
          this.count = e.data.count;
          e.data.pagination.data.forEach(el => {
            this.notifdata.push(el)
          });
        }
      });
    },
    lihat(e) {
      this.closemenu = true
      switch (e) {
        case 'access_server_requests':
          this.$router.push({ name: "permintaan-server.data" }).catch(() => { })
          break;
        case 'form_permintaan_akses':
          this.$router.push({ name: "form-permintaan.data" }).catch(() => { })
          break;
        case 'access_nas_directory_requests':
          console.log(e);
          this.$router.push({ name: "permintaan-folder-nas.data" }).catch(() => { })
          break;
      }
    },
  },
};
</script>
