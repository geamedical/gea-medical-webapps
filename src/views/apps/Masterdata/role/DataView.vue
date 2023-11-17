<template>
  <v-card flat color="card">
    <v-card-title>Master Data Role</v-card-title>
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
        <template v-slot:[`item.act`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="setpermission(item.id)"
            v-if="$can('update-role')"
          >
            mdi-key-chain
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(item.id)"
            v-if="$can('update-role')"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-role')">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      baseUrl: `http://${process.env.BASE_URL_API}/api/images/avatar-users/`,
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "Group Perusahaan", value: "company" },
        { text: "Kode", value: "code" },
        { text: "Nama", value: "rolename" },
        { text: "Kode-Role", value: "coderole" },
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
    ...mapActions("masterdata_role", ["index", "edit", "delete"]),
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
    setpermission(id) {
      this.$router.push({ path: `/master-data-role/setrole/${id}` });
    },
    editItem(id) {
      this.$router.push({ path: `/master-data-role/show/${id}` });
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
