<template>
  <v-card flat color="card" v-if="$can('read-form-permintaan')">
    <v-card-title>Data Permintaan</v-card-title>
    <v-card-text>
      <v-row no-gutter>
        <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
          @keyup="filter()"></v-text-field>
        <DatePicker label="Filter dari" :disabled="false" @someEvent="dari_tgl" />
        <DatePicker label="Filter sampai" :disabled="false" @someEvent="sampai_tgl" />
      </v-row>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading" expanded.sync="expanded" item-key="id" show-expand>
        <template v-slot:[`item.status`]="{ item }">
          <strong :class="$status_wny_color(item.status_finish)">{{ $status_wny(item.status_finish) }}</strong>
        </template>
        <template v-slot:[`item.groupid`]="{ item }">
          {{ groupDisplay(item) }}
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          {{ $parseDate(item) }}
        </template>
        <template v-slot:[`item.act`]="{ item }">
          <btn-action :menu="menu(item)" @action="callback" :unique="item.id"></btn-action>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-container v-for="(i, index) in item.child_permintaan" :key="i.id">
              <v-row class="mb-5 mt-5">
                <h3>Permintaan nomor : {{ index + 1 }}</h3>
              </v-row>
              <v-simple-table dense>
                <template v-slot:default>
                  <tr>
                    <th class="text-left" width="10%">
                      Yang Mengajukan
                    </th>
                    <td class="text-left">
                      : {{ i.user.name }}
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Yang Mengizinkan
                    </th>
                    <td class="text-left">
                      : {{ i.accept_primary.name }}
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Status Disetujui
                    </th>
                    <td class="text-left">
                      : <strong :class="$status_wny_color(i.status_primary)">{{ $status_wny(i.status_primary)
                      }}</strong>
                      <v-divider inset vertical class="ml-5 mr-5"></v-divider>
                      <v-btn outlined class="ma-2" small @click="tindak(i, 'status_primary')"
                        v-if="authenticated.id === i.accept_primary_id && i.status_primary === 'w'">
                        <v-icon>mdi-clipboard-arrow-down-outline</v-icon>
                        Tindak lanjuti permintaan ini
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Yang Menyetujui
                    </th>
                    <td class="text-left">
                      : {{ i.accept_secondary.name }}
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Status Menyetujui
                    </th>
                    <td class="text-left">
                      : <strong :class="$status_wny_color(i.status_secondary)">{{ $status_wny(i.status_secondary)
                      }}</strong>
                      <v-divider inset vertical class="ml-5 mr-5"></v-divider>
                      <v-btn outlined class="ma-2" small @click="tindak(i, 'status_secondary')"
                        v-if="authenticated.id === i.accept_secondary_id && i.status_secondary === 'w'">
                        <v-icon>mdi-clipboard-arrow-down-outline</v-icon>
                        Tindak lanjuti permintaan ini
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Detail pengajuan
                    </th>
                    <td class="text-left" v-html="parseingDetail(i)"></td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Catatan pengajuan
                    </th>
                    <td class="text-left">
                      : {{ i.notes }}
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Status penerimaan
                    </th>
                    <td class="text-left">
                      : <strong :class="$status_wny_color(i.status_feedback)">{{ $status_wny(i.status_feedback)
                      }}</strong>
                      <v-divider inset vertical class="ml-5 mr-5"></v-divider>
                      <v-btn outlined class="ma-2" small @click="tindak_feedback(i.id)"
                        v-if="authenticated.id === i.user_id && i.status_primary !== 'w' && i.status_secondary !== 'w' && i.status_feedback === 'w'">
                        <v-icon>mdi-clipboard-arrow-down-outline</v-icon>
                        Konfirmasi penerimaan
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left" width="10%">
                      Catatan feedback
                    </th>
                    <td class="text-left">
                      : {{ i.feedback_message }}
                    </td>
                  </tr>
                </template>
              </v-simple-table>
            </v-container>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
    <DetailView :dialogShow="showDetail" :data="dataDetail" @event="eventDialog" />
  </v-card>
</template>
<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
import BtnAction from '@/components/BtnAction.vue'
import DetailView from "./DetailView.vue"
import DatePicker from '@/components/DatePicker.vue'
export default {
  components: { BtnAction, DetailView, DatePicker },
  data() {
    return {
      showDetail: false,
      dataDetail: {},
      search: "",
      start: "",
      finish: "",
      totalDesserts: 0,
      desserts: [],
      expanded: [],
      loading: true,
      options: {},
      headers: [
        { text: "GROUPID", value: "groupid", sortable: false },
        { text: "Status", value: "status" },
        { text: "Tgl Dibuat", value: "created_at" },
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
    groupDisplay(item) {
      return `${moment(item.created_at).format('YYMMDDHHmmss')}-${item.id}`
    },
    menu(item) {
      if (item.status_finish === 'w') {
        return [
          { text: 'Lihat', icon: 'mdi-key-chain', permission: 'read-form-permintaan' },
          { text: 'Ubah', icon: 'mdi-pencil', permission: 'update-form-permintaan' },
          { text: 'Hapus', icon: 'mdi-delete', permission: 'delete-form-permintaan' },
        ]
      } else {
        return [
          { text: 'Lihat', icon: 'mdi-key-chain', permission: 'read-form-permintaan' },
          { text: 'Hapus', icon: 'mdi-delete', permission: 'delete-form-permintaan' },
        ]
      }
    },
    dari_tgl(e) {
      this.start = e
      this.getDataFromApi()
    },
    sampai_tgl(e) {
      this.finish = e
      this.getDataFromApi()
    },

    callback(res) {
      switch (res.act) {
        case 'Lihat':
          this.showItem(res.id)
          break;
        case 'Ubah':
          this.editItem(res.id)
          break;
        case 'Hapus':
          this.deleteItem(parseInt(res.id))
          break;
      }
    },
    eventDialog(res) {
      this.showDetail = res
    },
    parseingDetail(item) {
      if (item.type === 'akses-wifi') {
        const p = JSON.parse(item.detail)
        var html = ': '
        html += `<strong>Nama Lengkap :</strong> ${p.nama}, `
        html += `<strong>Email Aktif :</strong> ${p.email}, `
        html += `<strong>Pin :</strong> ${p.pin}`
        return html
      }
      let filteredString = item.detail.replace(/(\r\n|\n|\r)+/gm, '\n');
      filteredString = filteredString.trim();
      const paragraphs = filteredString.split(',');
      const firstParagraph = paragraphs[0];
      return ": " + firstParagraph
    },
    getDataFromApi() {
      const tableAttr = { options: this.options, search: this.search, start: this.start, finish: this.finish };
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
      this.$router.push({ path: `/form-permintaan/show/${id}` });
    },
    showItem(id) {
      this.edit(id)
        .then((res) => {
          this.showDetail = true
          this.dataDetail = res.data
        }).catch((err) => {
          this.$swal({
            icon: "error",
            title: "Terjadi kesalahan!",
            text: `${err}`,
            footer: '<a href="#">Laporkan masalah ini sekarang!</a>'
          });
        })
    },
    deleteItem(id) {
      this.$swal({
        title: "Apakah anda yakin akan menghapus data ini?",
        text: "Langkah ini akan menghapus semua data permintaan akses dalam status 'menunggu' untuk pengguna tersebut, dan data yang sudah terhapus tidak dapat dikembalikan lagi!",
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
    tindak(data, column) {
      if (column === 'status_secondary' && data.status_yg_menyetujui === 'w' || column === 'status_secondary' && data.status_yg_menyetujui === 'n') {
        const t = data.status_yg_menyetujui === 'n' ? 'tidak mendapatkan izin oleh pemberi izin utama!' : 'belum mendapatkan izin dari pemberi izin utama!'
        this.$swal({
          title: "Anda tidak bisa menindak lanjuti permohonan ini",
          text: "Permohonan ini " + t,
          icon: "info"
        });
      } else {
        this.$swal({
          title: "Tindak lanjuti permintaan ini",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Izinkan",
          denyButtonText: `Tolak`
        }).then((result) => {
          if (result.isConfirmed) {
            this.setStatus({ id: data.id, status: 'y', column: column }).then((e) => {
              if (e.status === true) {
                this.$swal("Permintaan diizinkan!", "", "success");
                this.getDataFromApi()
              } else {
                this.$swal("Terjadi kesalahan!", e.data.data, "warning");
              }
            })
          } else if (result.isDenied) {
            this.setStatus({ id: data.id, status: 'n', column: column }).then((e) => {
              if (e.status === true) {
                this.$swal("Permintaan ditolak", "", "info");
                this.getDataFromApi()
              } else {
                this.$swal("Terjadi kesalahan!", e.data.data, "warning");
              }
            })
          }
        });
      }
    },
    tindak_feedback(id) {
      this.$swal({
        input: "textarea",
        inputLabel: "Pesan",
        inputPlaceholder: "Masukan/keluhan anda menjadikan kami lebih semangat.",
        inputAttributes: {
          "aria-label": "Tulis masukan/keluhan anda disini agar kami bisa menjadi lebih baik."
        },
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Terpenuhi",
        denyButtonText: `Tidak Terpenuhi`
      }).then((result) => {
        if (result.isConfirmed) {
          this.setStatus({ id: id, status: 'y', column: 'status_feedback', msg: result.value }).then((e) => {
            if (e.status === true) {
              this.$swal("Berhasil!", "Feedback telah dibuat", "success");
              this.getDataFromApi()
            } else {
              this.$swal("Terjadi kesalahan!", e.data.data, "warning");
            }
          })
        } else if (result.isDenied) {
          this.setStatus({ id: id, status: 'n', column: 'status_feedback', msg: result.value }).then((e) => {
            if (e.status === true) {
              this.$swal("Berhasil!", "Feedback telah dibuat", "success");
              this.getDataFromApi()
            } else {
              this.$swal("Terjadi kesalahan!", e.data.data, "warning");
            }
          })
        }
      });
    }
  },
};
</script>
