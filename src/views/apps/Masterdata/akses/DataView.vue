<template>
  <v-card flat color="card">
    <v-card-title>Master Data Akses</v-card-title>
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
      >
        <template v-slot:[`item.created_at`]="{ item }">
          {{ parseDate(item) }}
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          {{ parseDate(item) }}
        </template>
        <template v-slot:[`item.act`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item.id)"
            v-if="$can('update-permission')"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item.id)"
            v-if="$can('delete-permission')"
          >
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
        { text: "Grup Akses", value: "parent.name" },
        { text: "Nama Akses", value: "name" },
        { text: "Tanggal Dibuat", value: "created_at" },
        { text: "Tanggal Diperbaharui", value: "updated_at" },
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
    ...mapActions("masterdata_akses", ["index", "edit", "delete"]),
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
      this.$router.push({ path: `/master-data-akses/show/${id}` });
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
