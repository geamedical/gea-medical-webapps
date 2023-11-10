<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
      <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
    </div>
    <form-permintaan v-if="$route.params.data === 'form-permintaan'" />
    <v-card class="card" v-if="$route.params.data === 'error-reporting'">
      <v-card-title> Laporan error </v-card-title>
      <v-card-text>
        <v-alert dark icon="mdi-firework" dense color="card">
          <p>
            Jika anda mengalami kesulitan, keluhan bug, error, dan kendala
            lainya dalam proses penggunaan sistem, anda dapat menghubungi kami
            di nomor yang tertera di footer sistem. terimakasih.
          </p>
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import formPermintaan from "./panduan/formPermintaan.vue";
export default {
  components: {
    formPermintaan,
  },
  data: () => ({
    items: [
      {
        text: "Persiapan data role",
        disabled: false,
        href: "1",
      },
      {
        text: "Tentukan akses setiap role",
        disabled: false,
        href: "2",
      },
      {
        text: "Siapkan data toko",
        disabled: false,
        href: "3",
      },
      {
        text: "Siapkan data pengguna",
        disabled: false,
        href: "4",
      },
      {
        text: "Pengguna siap menggunakan sistem",
        disabled: false,
        href: "5",
      },
    ],
    itemss: [
      {
        text: "Pengguna melakukan login",
        disabled: false,
        href: "1",
      },
      {
        text: "Pilih menu absensi dihalaman beranda",
        disabled: false,
        href: "2",
      },
      {
        text: "Pengguna mengisi form absensi",
        disabled: false,
        href: "3",
      },
      {
        text: "Submit form",
        disabled: false,
        href: "4",
      },
      {
        text: "Data terkirim dan selesai",
        disabled: false,
        href: "5",
      },
    ],
  }),
};
</script>
