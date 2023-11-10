<template>
  <v-card flat color="card">
    <v-card-title>Master Data Pengguna</v-card-title>
    <v-card-text>
      <v-text-field
        label="Cari data..."
        prepend-inner-icon="mdi-text-search"
        outlined
        dense
        v-model="search"
        @keyup="filter()"
      ></v-text-field>
      <v-data-table
        dense
        flat
        :headers="headers"
        :items="desserts"
        :options.sync="options"
        :server-items-length="totalDesserts"
        :loading="loading"
        item-key="id"
      >
        <template v-slot:[`item.act`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item.id)"
            v-if="$can('update-user')"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-user')">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "NIK", value: "nik" },
        { text: "NAMA", value: "name" },
        { text: "EMAIL", value: "email" },
        { text: "ROLE", value: "roles.rolename" },
        { text: "DEPT", value: "dept.deptname" },
        { text: "ACT", value: "act" },
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
  methods: {
    ...mapActions("masterdata_user", ["index", "edit", "delete"]),
    getDataFromApi() {
      this.loading = true;
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
