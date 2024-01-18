<template>
  <v-card flat color="card" v-if="$can('read-documentation')">
    <v-card-title>Data Dokumentasi</v-card-title>
    <v-card-text>
      <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
        @keyup="filter()"></v-text-field>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading" :expanded.sync="expanded" item-key="id" show-expand>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <h3>{{ item.title }}</h3>
            <div v-html="item.desc"></div>
            <h4>Point</h4>
            <ul>
              <div v-for="i in item.listep" :key="i.id">
                <li>
                  <strong>{{ i.title }}</strong><br />
                  <div v-html="i.desc"></div>
                </li>
              </div>
            </ul>
            <h3>Roudmap Aktifitas</h3>
            <v-breadcrumbs :items="item.map">
              <template v-slot:divider>
                <v-icon>mdi-forward</v-icon>
              </template>
            </v-breadcrumbs>
          </td>
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          {{ $parseDate(item.created_at) }}
        </template>
        <template v-slot:[`item.title`]="{ item }">
          {{ stringLimiter(item.title, 20) }}
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          {{ $parseDate(item.updated_at) }}
        </template>
        <template v-slot:[`item.act`]="{ item }">
          <btn-action :menu="menu" @action="callback" :unique="item.id"></btn-action>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import BtnAction from '@/components/BtnAction.vue'
export default {
  components: { BtnAction },
  data() {
    return {
      menu: [
        { text: 'Ubah', icon: 'mdi-pencil', permission: 'update-documentation' },
        { text: 'Hapus', icon: 'mdi-delete', permission: 'delete-documentation' },
      ],
      search: "",
      baseUrl: `http://${process.env.BASE_URL_API}/api/images/avatar-users/`,
      totalDesserts: 0,
      expanded: [],
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "JUDUL", value: "title" },
        { text: "DIBUAT", value: "created_at" },
        { text: "DIPERBAHARUI", value: "updated_at" },
        { text: "ACT", value: "act", sortable: false },
      ],
      connflow: [],
    };
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-documentation'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
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
    ...mapActions("dokumentasi", ["index", "edit", "delete"]),
    callback(res) {
      switch (res.act) {
        case 'Ubah':
          this.editItem(res.id)
          break;
        case 'Hapus':
          this.deleteItem(parseInt(res.id))
          break;
      }
    },
    stringLimiter(txt, limit) {
      return txt.slice(0, limit)
    },
    getDataFromApi() {
      const tableAttr = { options: this.options, search: this.search };
      this.index(tableAttr).then((res) => {
        this.desserts = res.data.data;
        this.totalDesserts = res.data.meta.total;
        this.loading = false;
      });
    },
    filter() {
      this.getDataFromApi();
    },
    editItem(id) {
      this.$router.push({ path: `/dokumentasi/show/${id}` });
    },
    deleteItem(id) {
      this.$swal({
        title: "Apakah anda yakin akanmenghapus data ini?",
        text: "Data yang sudah terhapus tidak dapat dikembalikan lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
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
