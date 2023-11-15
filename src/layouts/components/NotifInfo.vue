<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-badge color="primary" :content="`${count !== null && count > 0 ? 'New ' : ''}${count}`" overlap>
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-list subheader two-line dense v-scroll.self="onScroll" class="overflow-y-auto" max-height="400">
      <v-list-item-group v-model="selected" active-class="pink--text" v-if="notifdata.length > 0">
        <div v-for="(item, index) in notifdata" :key="index" @click="lihat(item.id, item.type)">
          <v-list-item v-if="validateView(item.user_notif_target)">
            <v-icon :color="item.color">
              {{ item.icon }}
            </v-icon>
            <v-list-item-content>
              <v-list-item-title v-html="title(item.data_encode)" class="ml-3" />
              <v-list-item-subtitle v-html="subtitle2(item.data_encode, item.type)" class="ml-3" />
              <v-list-item-subtitle v-html="subtitle(item.data_encode, item.type)" class="ml-3" />
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
    if (this.isAuth) {
      this.getNotifLogin();
      this.getNotifLogout();
      this.getNotifPermintaan();
      this.getNotifData();
    }
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
  },
  methods: {
    ...mapActions(["getnotif"]),
    onScroll(e) {
      this.scroll = e.target.scrollTop;
    },
    title(data) {
      const dt = JSON.parse(data);
      if (dt.name !== undefined)
        return `<strong>${dt.name.charAt(0).toUpperCase() + dt.name.slice(1).toLowerCase()
          }</strong>`;
      if (dt.user.name !== undefined)
        return `<strong>${dt.user.name.charAt(0).toUpperCase() +
          dt.user.name.slice(1).toLowerCase()
          }</strong>`;
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
    subtitle2(data, type) {
      const dt = JSON.parse(data);
      var htmlParse = "<table>";
      if (type === "form-permintaan")
        dt.request.forEach((e) => {
          htmlParse += `<tr><th>Mengajukan</th><td>: ${e.type}</td></tr>`;
        });
      htmlParse += "</table>";
      return htmlParse;
    },
    getNotifLogin() {
      this.sockets.subscribe("auth-login:user", (data) => {
        this.$store.commit(
          "SET_SNACKBAR",
          { status: true, data: data },
          { route: true }
        );
        this.getNotifData();
      });
    },
    getNotifLogout() {
      this.sockets.subscribe("auth-logout:user", (data) => {
        this.$store.commit(
          "SET_SNACKBAR",
          { status: true, data: data },
          { route: true }
        );
        this.getNotifData();
      });
    },
    getNotifPermintaan() {
      this.sockets.subscribe("form:permintaan:setstatus", (data) => {
        this.$store.commit(
          "SET_SNACKBAR",
          { status: data.user_id === this.authenticated.id ? true : false, data: data },
          { route: true }
        );
        this.getNotifData();
      });
    },
    getNotifData() {
      this.getnotif(this.options).then((e) => {
        this.count = e.count;
        this.notifdata = e.pagination.data;
      });
    },
    validateView(e) {
      const visible = this.authenticated.id === e || e === null ? true : false;
      return visible;
    },
    lihat(e, type) {
      console.log(e, type);
      switch (type) {
        case 'form-permintaan':
        this.$router.push({ name: "form-permintaan.data" }).catch(() => {})
          break;
        case 'lainya':
        this.$router.push({ name: "dashboard" }).catch(() => {})
          break;
      }
    },
  },
};
</script>
