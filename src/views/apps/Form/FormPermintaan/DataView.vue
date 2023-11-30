<template>
  <v-card flat color="card" v-if="$can('read-form-permintaan')">
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
          <v-icon :color="chipColor(item)">
            {{ chipIcon(item) }}
          </v-icon>
        </template>
        <template v-slot:[`item.detail`]="{ item }">
          <div v-html="parseingDetail(item)"></div>
        </template>
        <template v-slot:[`item.exec`]="{ item }">
          <v-icon small class="mr-2" @click="execItem(item.id, 'y')"
            v-if="authenticated.id === item.user_id && item.status === 'w'">
            mdi-hand-okay
          </v-icon>
          <v-icon small class="mr-2" @click="execItem(item.id, 'w')"
            v-if="$can('update-form-permintaan') && item.status === 'n'">
            mdi-gift-outline
          </v-icon>
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
import { mapActions, mapState } from "vuex";
import BtnAction from '@/components/BtnAction.vue'
export default {
  components: { BtnAction },
  data() {
    return {
      menu: [
        { text: 'Ubah', permission: 'update-form-permintaan' },
        { text: 'Hapus', permission: 'delete-form-permintaan' },
      ],
      search: "",
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "NIK", value: "user.nik", sortable: false },
        { text: "Nama", value: "user.name", sortable: false },
        { text: "Type", value: "type" },
        { text: "Detail", value: "detail", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Tgl Dibuat", value: "created_at" },
        { text: "#", value: "exec", sortable: false },
        { text: "#", value: "act", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("auth", {
      authenticated: (state) => state.authenticated,
    }),
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-form-permintaan'))
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
    ...mapActions("form_permintaan", ["index", "edit", "delete", "setStatus"]),
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
    parseingDetail(item) {
      if (item.type === 'akses-wifi') {
        const p = JSON.parse(item.detail)
        var html = '<div>'
        html += `<strong>Nama Lengkap :</strong> ${p.nama} </br>`
        html += `<strong>Email Aktif :</strong> ${p.email} </br>`
        html += `<strong>Pin :</strong> ${p.pin}`
        html += '</div>'
        return html
      }
      return `<strong>${item.detail}</strong>`
    },
    chipColor(text) {
      return text.status == 'n' ? 'error' : text.status == 'w' ? 'accent' : 'primary'
    },
    chipIcon(text) {
      return text.status == 'n' ? 'mdi-alert' : text.status == 'w' ? 'mdi-sync-alert' : 'mdi-hand-okay'
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
    execItem(id, act) {
      let title = act === 'w' ? "Apakah anda sudah menyelesaikan permintaan ini?" : "Apakah permintaan anda sudah dipenuhi?"
      let text = act === 'w' ? "Pastikan anda sudah menyelesaikan permintaan ini untuk menunjang kenyamanan pada pekerjaan selanjutnya!" : "Pastikan anda sudah menerima permintaan ini untuk menunjang kenyamanan pada pekerjaan anda!"
      this.$swal({
        title: title,
        text: text,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, sudah diselesaikan!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setStatus({ id, status: act }).then((e) => {
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
