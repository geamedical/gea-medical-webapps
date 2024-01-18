<template>
  <v-card flat color="card">
    <v-card-text>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading">
        <template v-slot:[`item.authorization_primary_axec`]="{ item }">
          <strong v-bind:class="getClass(item.authorization_primary_axec)">{{
            getTextStatus(item.authorization_primary_axec) }}</strong>
          <v-btn icon color="primary"
            v-if="item.authorization_primary_axec === 'waiting' && authenticated.id === item.authorization_primary_id || authenticated.role_name === 'Manager IT Infra' && authenticated.dept_name === 'IT' || authenticated.role_name === 'Superadmin' && authenticated.dept_name === 'IT Programmer'"
            @click="tindak(item)">
            <v-icon>mdi-gesture-double-tap</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.authorization_secondary_axec`]="{ item }">
          <strong v-bind:class="getClass(item.authorization_secondary_axec)">{{
            getTextStatus(item.authorization_secondary_axec) }}</strong>
          <v-btn icon color="primary"
            v-if="item.authorization_secondary_axec === 'waiting' && authenticated.id === item.authorization_secondary_id || authenticated.role_name === 'Manager IT Infra' && authenticated.dept_name === 'IT' || authenticated.role_name === 'Superadmin' && authenticated.dept_name === 'IT Programmer'"
            @click="tindak(item)">
            <v-icon>mdi-gesture-double-tap</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <strong v-bind:class="getClass(item.status)">{{
            getTextStatus(item.status) }}</strong>
        </template>
        <template v-slot:[`item.akses`]="{ item }">
          <strong>{{ akses(item) }}</strong>
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
        { text: "NAMA FOLDER", value: "nas_detail.dirname" },
        { text: "YANG MENGAJUKAN", value: "yang_mengajukan.name" },
        { text: "YANG MENGIZINKAN UTAMA", value: "yang_mengizinkan_utama.name" },
        { text: "STATUS YANG MENGIZINKAN UTAMA", value: "authorization_primary_axec" },
        { text: "YANG MENGIZINKAN PENGGANTI", value: "yang_mengizinkan_pengganti.name" },
        { text: "STATUS YANG MENGIZINKAN PENGGANTI", value: "authorization_secondary_axec" },
        { text: "AKSES", value: "akses" },
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
    ...mapActions("permintaan_akses_folder_nas_server", ["index", "edit", "update", "delete"]),
    akses(akses) {
      if (akses.read === 'y' && akses.write === 'n') {
        return 'Read only'
      } else if (akses.read === 'n' && akses.write === 'y') {
        return 'Create only'
      } else if (akses.read === 'n' && akses.write === 'n') {
        return '-'
      } else if (akses.read === 'y' && akses.write === 'y') {
        return 'Read & Write'
      }
    },
    getClass(status) {
      switch (status) {
        case 'rejected':
          return 'red--text'
        case 'approved':
          return 'green--text'
        case 'gift':
          return 'blue--text'
        case 'waiting':
          return 'grey--text'
        case 'y':
          return 'green--text'
        case 'n':
          return 'red--text'
        case 'w':
          return 'grey--text'
      }
    },
    getTextStatus(status) {
      'approved', 'rejected', 'gift', 'waiting'
      switch (status) {
        case 'approved':
          return 'Diizinkan'
        case 'rejected':
          return 'Tidak diizinkan'
        case 'gift':
          return 'Menyerahkan kewenangan'
        case 'waiting':
          return 'Menunggu'
        case 'n':
          return 'Tidak diizinkan'
        case 'y':
          return 'Diizinkan'
        case 'w':
          return 'Menunggu'
      }
    },
    tindak(data) {
      if (this.authenticated.id === data.authorization_primary_id && this.authenticated.id !== data.authorization_secondary_id) {
        this.showTindak({ id: data.id, column: 'authorization_primary_exec' }, data)
      } else if (this.authenticated.id === data.authorization_primary_id && this.authenticated.id === data.authorization_secondary_id) {
        this.showTindak({ id: data.id, column: 'authorization_primary_exec' }, data)
      }else if (this.authenticated.role_name === 'Superadmin' && this.authenticated.dept_name === 'IT' || this.authenticated.role_name === 'Superadmin' && this.authenticated.dept_name === 'IT Programmer') {
        if (data.authorization_primary_axec === 'waiting') {
          this.showTindak({ id: data.id, column: 'authorization_primary_exec' }, data)
        } else {
          this.showTindak({ id: data.id, column: 'authorization_secondary_exec' }, data)
        }
      }
      else if (this.authenticated.id === data.authorization_secondary_id) {
        if (data.authorization_primary_axec === 'gift') {
          this.showTindak({ id: data.id, column: 'authorization_secondary_exec' }, data)
        } else {
          this.$swal("Permintaan ditolak", "Anda harus mendapat persetujuan terlebih dulu dari pemberi izin utama permintaan ini!", "info");
        }
      }
    },
    showTindak(dataset, data) {
      let htmlparse = '<table>'
      htmlparse += `<tr><th style="text-align: left !important;">Nama Folder</th><td style="text-align: left !important;">: ${data.nas_detail.dirname}</td></tr>`
      htmlparse += `<tr><th style="text-align: left !important;">Nama Yg Mengajukan</th><td style="text-align: left !important;">: ${data.yang_mengajukan.name}</td></tr>`
      htmlparse += `</table>`
      this.$swal({
        title: "Tindak lanjut",
        html: htmlparse,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Izinkan",
        cancelButtonText: "Menyerahkan kewenangan",
        denyButtonText: `Tolak`
      }).then((result) => {
        if (result.isDismissed) {
          dataset['status'] = 'gift'
          this.update(dataset).then((e) => {
            if (e.status === 200) {
              this.$swal("Permintaan diserahkan!", "", "success");
              this.getDataFromApi()
            } else {
              this.$swal("Terjadi kesalahan", e.data, "warning")
            }
          })
        } else if (result.isConfirmed) {
          dataset['status'] = 'approved'
          this.update(dataset).then((e) => {
            if (e.status === 200) {
              this.$swal("Permintaan diizinkan!", "", "success");
              this.getDataFromApi()
            } else {
              this.$swal("Terjadi kesalahan", e.data, "warning")
            }
          })
        } else if (result.isDenied) {
          dataset['status'] = 'rejected'
          this.update(dataset).then((e) => {
            if (e.status === 200) {
              this.$swal("Permintaan ditolak!", "", "success");
              this.getDataFromApi()
            } else {
              this.$swal("Terjadi kesalahan", e.data, "warning")
            }
          })
        }
      });
    },
    getDataFromApi() {
      const tableAttr = { options: this.options };
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
              this.$swallInfo("Terhapus!", "Data berhasil dihapus.")
            } else {
              this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${e.status}`)
            }
            this.getDataFromApi();
          });
        }
      });
    },
  },
};
</script>
