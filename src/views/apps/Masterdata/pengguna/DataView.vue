<template>
  <v-card flat color="card" v-if="$can('read-user')">
    <v-card-title>Master Data Pengguna</v-card-title>
    <v-card-text>
      <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
        @keyup="filter()"></v-text-field>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading" item-key="id" single-expand :expanded.sync="expanded"
        show-expand>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-container>
              <v-simple-table dense>
                <template v-slot:default>
                  <tr>
                    <th class="text-left">Aktivasi</th>
                    <td class="text-left">: <strong
                        :class="item.activation === 'invalid' ? 'error--text' : 'accent--text'">{{
                          item.activation.toUpperCase() }}</strong></td>
                  </tr>
                  <tr>
                    <th class="text-left">Username</th>
                    <td class="text-left">: {{ item.username }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Email</th>
                    <td class="text-left">: {{ item.email }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Tgl. Lahir</th>
                    <td class="text-left">: {{ parseDate(item.birthdate) }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Jenis Kelamin</th>
                    <td class="text-left">: {{ item.gender }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Status Pernikahan</th>
                    <td class="text-left">: {{ item.marital }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">No. NPWP</th>
                    <td class="text-left">: {{ item.npwp }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">No. KTP</th>
                    <td class="text-left">: {{ item.noktp }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">Alamat tempat tinggal</th>
                    <td class="text-left">: {{ item.address }}</td>
                  </tr>
                  <tr>
                    <th class="text-left">No. Ponsel</th>
                    <td class="text-left">: {{ item.telp }}</td>
                  </tr>
                </template>
              </v-simple-table>
            </v-container>
          </td>
        </template>
        <template v-slot:[`item.activation`]="{ item }">
          <strong :class="item.activation === 'invalid' ? 'error--text' : 'accent--text'">{{
            item.activation.toUpperCase() }}</strong>
        </template>
        <template v-slot:[`item.act`]="{ item }">
          <btn-action :menu="menu" @action="callback" :unique="item.id"></btn-action>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import moment from "moment";
import BtnAction from '@/components/BtnAction.vue'
import { mapActions } from "vuex";
export default {
  components: { BtnAction },
  data() {
    return {
      menu: [
        { text: 'Ubah', icon: 'mdi-pencil', permission: 'update-user' },
        { text: 'Hapus', icon: 'mdi-delete', permission: 'delete-user' },
      ],
      search: "",
      expanded: [],
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "NIK", value: "nik" },
        { text: "NAMA", value: "name" },
        { text: "AKTIVASI", value: "activation", sortable: false },
        { text: "ROLE/JABATAN", value: "roles.rolename", sortable: false },
        { text: "DEPT", value: "dept.deptname", sortable: false },
        { text: "ACT", value: "act", sortable: false },
      ],
    };
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-user'))
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
    ...mapActions("masterdata_user", ["index", "edit", "delete"]),
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
    parseDate(e) {
      return moment(e).format("yyyy-MM-DD");
    },
    editItem(id) {
      this.$router.push({
        name: "master-data-pengguna.show",
        params: { id: id },
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
