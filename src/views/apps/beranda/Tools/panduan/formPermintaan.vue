<template>
  <v-card class="card" flat>
    <v-card-title> Persiapan </v-card-title>
    <v-card-text>
      <p>
        Sebelum form permintaan digunakan, pastikan HR sudah melakukan melakukan beberapa hal antara lain :
      </p>
      <ul>
        <li>
          <strong>Data Pengguna</strong><br />
          <p>
            Data pengguna disiapkan agar sistem dapat melakukan validasi user
            ketika login untuk memmulai sesi penggunaan sistem dan melakukan
            aktifitas didalam sistem.
          </p>
        </li>
        <li>
          <strong>Data Role</strong><br />
          <p>
            Data role disiapkan terlebih dulu sebelum pembuatan data pengguna
            karena akan digunakan pada saat penambahan data pengguna untuk
            menentukan akses pengguna
          </p>
        </li>
        <li>
          <strong>Data Akses</strong><br />
          <p>
            Data akses disiapkan terlebih dulu sebelum pembuatan data role
            karena akan digunakan pada saat penambahan data role untuk
            menentukan akses group setiap role
          </p>
        </li>
        <li>
          <strong>Data Divisi</strong><br />
          <p>
            Data divisi disiapkan terlebih dulu sebelum pembuatan data pengguna
            karena akan digunakan pada saat penambahan data pengguna untuk
            menentukan divisi pengguna.
          </p>
        </li>
        <h3>Roudmap Persiapan data</h3>
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
        <h3>Roudmap Aktifitas Permintaan</h3>
        <v-breadcrumbs :items="itemss">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
      </ul>
      <v-alert color="info" dark icon="mdi-firework" dense>
        <p>
          Jika anda mengalami kesulitan dalam proses penggunaan sistem, anda
          dapat menghubungi divisi IT.
          terimakasih.
        </p>
      </v-alert>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
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
        text: "Siapkan data divisi",
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
        text: "Pengguna memilih menu form/form permintaan",
        disabled: false,
        href: "2",
      },
      {
        text: "Pengguna mengisi form permintaan",
        disabled: false,
        href: "3",
      },
      {
        text: "Submit form",
        disabled: false,
        href: "4",
      },
      {
        text: "Data terkirim dan otomatis mengirimkan notifikasi pada divisi GA & IT",
        disabled: false,
        href: "5",
      },
      {
        text: "Divisi GA & IT menerima notifikasi",
        disabled: false,
        href: "5",
      },
      {
        text: "Divisi GA & IT menyiapkan apa yang dipinta",
        disabled: false,
        href: "5",
      },
      {
        text: "Divisi GA & IT menyerahkan apa yang dipinta",
        disabled: false,
        href: "5",
      },
      {
        text: "Pengguna mengkonfirmasi permintaan diterima.",
        disabled: false,
        href: "5",
      },
      {
        text: "Proses selesai",
        disabled: false,
        href: "5",
      },
    ],
  }),
};
</script>
