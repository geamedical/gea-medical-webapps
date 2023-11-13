<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        color="primary"
        :content="`${count !== null && count > 0 ? 'New ' : ''}${count}`"
        overlap
      >
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-list subheader two-line dense>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        v-if="notifdata.length > 0"
      >
        <div
          v-for="(item, index) in notifdata"
          :key="index"
          @click="lihat(item.type)"
        >
          <v-list-item>
            <v-icon :color="item.color">
              {{ item.icon }}
            </v-icon>
            <v-list-item-content>
              <v-list-item-title v-html="title(item.data_encode)" class="ml-3" />
              <v-list-item-subtitle v-html="subtitle(item.data_encode, item.type)" class="ml-3" />
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>Lihat</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index < notifdata.length - 1" :key="index"></v-divider>
        </div>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>Tidak ada data</v-list-item-title>
          <v-list-item-subtitle
            >Untuk saat ini anda tidak memiliki
            pemberitahuan.</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
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
    ...mapState("auth", {
      authenticated: (state) => state.authenticated,
    }),
  },
  mounted() {
    this.getNotifLogin();
    this.getNotifLogout();
    this.getNotifData();
  },
  methods: {
    ...mapActions(["getnotif"]),
    title(data){
        const dt = JSON.parse(data)
        return `<strong>${dt.name}</strong>`
    },
    subtitle(data, type){
        const dt = JSON.parse(data)
        return `${type.replace(/-/g, " ")} pada <strong>${moment(dt.created_at).locale('id').startOf('hour').fromNow()}</strong>`
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
    getNotifData() {
      this.getnotif(this.options).then((e) => {
        this.count=e.count
        this.notifdata = e.pagination.data
      });
    },
  },
};
</script>
