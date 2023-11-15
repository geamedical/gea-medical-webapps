<template>
  <v-card flat color="card">
    <v-card-title>Data Permintaan</v-card-title>
    <v-card-text>
      <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
        @keyup="filter()"></v-text-field>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ parseDate(item) }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip class="ma-2" :color="chipColor(item)" label text-color="white">
            <v-icon left>
              {{ chipIcon(item) }}
            </v-icon>
            {{ chipText(item) }}
          </v-chip>
        </template>
        <template v-slot:[`item.act`]="{ item }">
          <v-icon small class="mr-2" @click="execItem(item.id)" v-if="$can('update-dept')">
            mdi-gift-outline
          </v-icon>
          <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('update-dept')">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-dept')">
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
        { text: "NIK", value: "user.nik" },
        { text: "Nama", value: "user.name" },
        { text: "Type", value: "type" },
        { text: "Detail", value: "detail" },
        { text: "Status", value: "status" },
        { text: "Tgl Dibuat", value: "created_at" },
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
    ...mapActions("form_permintaan", ["index", "edit", "delete", "setStatus"]),
    chipText(text) {
      return text.status == 'n' ? 'Belum dipersiapkan' : text.status == 'w' ? 'Menunggu konfirm penerima' : 'Permintaan selesai'
    },
    chipColor(text) {
      return text.status == 'n' ? 'error' : text.status == 'w' ? 'accent' : 'primary'
    },
    chipIcon(text) {
      return text.status == 'n' ? 'mdi-alert' : text.status == 'w' ? 'mdi-sync-alert' : 'mdi-hand-okay'
    },
    getDataFromApi() {
      this.loading = true;
      const tableAttr = { options: this.options, search: this.search };
      this.index(tableAttr).then((r) => {
        this.desserts = r.data.data;
        this.totalDesserts = r.data.meta.total;
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
      this.$router.push({ path: `/form-permintaan/show/${id}` });
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
    execItem(id) {
      this.$swal({
        title: "Apakah anda sudah menyelesaikan permintaan ini?",
        text: "Pastikan anda sudah menyelesaikan permintaan ini untuk menunjang kenyamanan pada pekerjaan selanjutnya!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, sudah diselesaikan!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setStatus({ id, status: 'w' }).then((e) => {
            if (e.status === true) {
              this.$swal({
                title: "Diperbaharui!",
                text: "Data berhasil diperbaharui.",
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
          this.$swal({
            title: "Terhapus!",
            text: "Data berhasil dihapus." + id,
            icon: "success",
          });
        }
      });
    }
  },
};
</script>
