<template>
  <v-card flat color="card">
    <v-card-text>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading">
        <template v-slot:[`item.status`]="{ item }">
          <strong v-bind:class="getClass(item.status)">{{ getTextStatus(item.status) }}</strong>
          <v-btn icon color="primary" v-if="item.status === 'w' && authenticated.id === item.authorization_id"
            @click="tindak(item.id)">
            <v-icon>mdi-gesture-double-tap</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.act`]="{ item }">
          <v-btn icon color="error" v-if="$can('delete-permission')" @click="deleteItem(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "SERVER", value: "server_detail.server" },
        { text: "YANG MENGAJUKAN", value: "yang_mengajukan.name" },
        { text: "YANG MENGIZINKAN", value: "yang_mengizinkan.name" },
        { text: "STATUS PERIZINAN", value: "status" },
        { text: "ACT", value: "act", sortable: false },
      ],
    };
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-permission'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  computed: {
    ...mapState('auth', {
      authenticated: state => state.authenticated,
    }),
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("permintaan_akses_server", ["index", "edit", "update", "delete"]),
    getClass(status) {
      switch (status) {
        case 'n':
          return 'red--text'
        case 'y':
          return 'green--text'
        case 'w':
          return 'gray--text'
      }
    },
    getTextStatus(status) {
      switch (status) {
        case 'n':
          return 'Tidak diizinkan'
        case 'y':
          return 'Diizinkan'
        case 'w':
          return 'Menunggu'
      }
    },
    tindak(id) {
      this.$swal({
        title: "Tindak lanjuti permintaan ini",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Izinkan",
        denyButtonText: `Tolak`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.update({ id, status: 'y' }).then(() => {
            this.$swal("Permintaan diizinkan!", "", "success");
            this.getDataFromApi()
          })
        } else if (result.isDenied) {
          this.update({ id, status: 'n' }).then(() => {
            this.$swal("Permintaan ditolak", "", "info");
            this.getDataFromApi()
          })
        }
      });
    },
    getDataFromApi() {
      const tableAttr = { options: this.options };
      this.index(tableAttr).then((res) => {
        this.desserts = res.data.data;
        this.totalDesserts = res.data.meta.total;
        this.loading = false;
      });
    },
    deleteItem(id) {
      this.$swal({
        title: "Apakah anda akan menghapus data ini?",
        text: "Jika anda menghapus data ini maka data tersebut tidak dapat dikembalikan lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus sekarang!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(id).then((e) => {
            if (e.status === true) {
              this.$swal({
                title: "Terhapus!",
                text: "Data berhasil dihapus.",
                icon: "success",
              });
            } else {
              this.$swal({
                title: "Error!",
                text: "Terjadi kesalahan, silahkan hubungi tim IT!",
                icon: "warning",
              });
            }
            this.getDataFromApi();
          });
        }
      });
    },
  },
};
</script>
