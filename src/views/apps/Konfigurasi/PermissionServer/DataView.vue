<template>
  <v-card flat color="card">
    <v-card-text>
      <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
        @keyup="filter()"></v-text-field>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading" item-key="id">
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
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "NAMA SERVER", value: "server" },
        { text: "PENANGGUNG JAWAB", value: "user.name" },
        { text: "ACT", value: "act", sortable: false },
      ],
    };
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-server'))
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
    ...mapActions("permission_server", ["index", "edit", "delete"]),
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
        if (res.status === 200) {
          this.desserts = res.data.data.data;
          this.totalDesserts = res.data.data.meta.total;
          this.loading = false;
        } else if (res.status === 401) {
          this.$router.push({ name: "error-401" }).catch(() => true)
        } else {
          this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
        }
      });
    },
    filter() {
      this.getDataFromApi();
    },
    editItem(id) {
      this.$router.push({
        name: "server-permission.show",
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
            if (e.status === 200) {
              this.$swallInfo("Terhapus!", "Data berhasil dihapus.")
            } else {
              this.$swallErrors("Error!", "Terjadi kesalahan, silahkan hubungi tim IT!")
            }
            this.getDataFromApi();
          });
        }
      });
    },
  },
};
</script>
