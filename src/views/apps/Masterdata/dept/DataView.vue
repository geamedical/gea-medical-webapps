<template>
  <v-card flat color="card" v-if="$can('read-departement')">
    <v-card-title>Master Departemen</v-card-title>
    <v-card-text>
      <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
        @keyup="filter()"></v-text-field>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ parseDate(item) }}
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          {{ parseDate(item) }}
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
import { mapActions } from "vuex";
import BtnAction from '@/components/BtnAction.vue'
export default {
  components: { BtnAction },
  data() {
    return {
      menu: [
        { text: 'Ubah', icon: 'mdi-pencil', permission: 'update-departement' },
        { text: 'Hapus', icon: 'mdi-delete', permission: 'delete-departement' },
      ],
      search: "",
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "Perusahaan", value: "company" },
        { text: "Code", value: "code" },
        { text: "Nama", value: "deptname" },
        { text: "Tgl Dibuat", value: "created_at" },
        { text: "Tgl Diperbaharui", value: "updated_at" },
        { text: "ACT", value: "act", sortable: false },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-departement'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("masterdata_dept", ["index", "edit", "delete"]),
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
      return moment(e).format("yyyy-MM-DD, h:mm:ss");
    },
    editItem(id) {
      this.$router.push({ path: `/master-data-dept/show/${id}` });
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
