<template>
    <v-card class="card" flat>
      <v-card-title> Persiapan </v-card-title>
      <v-card-text>
        <p>
          Data pengguna adalah bagian data yang dilindungi <i>Authorization</i>, Sebelum data pengguna digunakan, pastikan HR sudah melakukan melakukan beberapa hal antara lain :
        </p>
        <ul>
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
          <h3>Roudmap Aktifitas Permintaan (Karyawan baru)</h3>
          <v-breadcrumbs :items="RuleKaryawanBaru">
            <template v-slot:divider>
              <v-icon>mdi-forward</v-icon>
            </template>
          </v-breadcrumbs>
          <FlowChart :nodes="ShapeKaryawanBaru" :conns="FlowKaryawanBaru"></FlowChart>
        </ul>
      </v-card-text>
      <v-card-text>
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
  import FlowChart from '@/components/FlowChart.vue';
  export default {
    name: 'FormPermintaan',
    components: {
      FlowChart
    },
    data: () => ({
      RuleKaryawan: [
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
      RuleKaryawanBaru: [
        {
          text: "Akses link (link yang sudah disiapkan)",
          disabled: false,
          href: "1",
        },
        {
          text: "Pengguna mengisi form permintaan",
          disabled: false,
          href: "2",
        },
        {
          text: "Submit form",
          disabled: false,
          href: "3",
        },
        {
          text: "Data terkirim dan otomatis mengirimkan notifikasi pada divisi GA & IT",
          disabled: false,
          href: "4",
        },
        {
          text: "Divisi GA & IT menerima notifikasi",
          disabled: false,
          href: "5",
        },
        {
          text: "Divisi GA & IT menyiapkan apa yang dipinta",
          disabled: false,
          href: "6",
        },
        {
          text: "Divisi GA & IT menyerahkan apa yang dipinta",
          disabled: false,
          href: "7",
        },
        {
          text: "Karyawan baru login (menggunakan data username=nama & password=default(123456))",
          disabled: false,
          href: "8",
        },
        {
          text: "Karyawan baru akses menu Form/Form permintaan.",
          disabled: false,
          href: "9",
        },
        {
          text: "Karyawan baru mengkonfirmasi permintaan diterima.",
          disabled: false,
          href: "10",
        },
        {
          text: "Proses selesai",
          disabled: false,
          href: "11",
        },
      ],
      ShapeKaryawanBaru: [
        {
          id: 1,
          x: 10,
          y: 50,
          width: 80,
          height: 40,
          name: "Mulai",
          type: "output",
          shape: "rect",
        },
        {
          id: 2,
          x: 200,
          y: 50,
          width: 100,
          height: 60,
          name: "Karyawan baru",
          type: "output",
          shape: "rect",
        },
        {
          id: 3,
          x: 200,
          y: 150,
          width: 100,
          height: 60,
          name: "Akses form permintaan",
          type: "output",
          shape: "rect",
        },
        {
          id: 4,
          x: 350,
          y: 150,
          width: 100,
          height: 60,
          name: "Isi form permintaan",
          type: "output",
          shape: "rect",
        },
        {
          id: 5,
          x: 500,
          y: 150,
          width: 100,
          height: 60,
          name: "Submit form",
          type: "output",
          shape: "rect",
        },
        {
          id: 6,
          x: 62,
          y: 250,
          width: 100,
          height: 60,
          name: "IT",
          type: "output",
          shape: "rect",
        },
        {
          id: 7,
          x: 800,
          y: 250,
          width: 100,
          height: 60,
          name: "GA",
          type: "output",
          shape: "rect",
        },
        {
          id: 8,
          x: 400,
          y: 350,
          width: 150,
          height: 60,
          name: "Konfirmasi persiapan permintaan",
          type: "output",
          shape: "rect",
        },
        {
          id: 9,
          x: 600,
          y: 350,
          width: 200,
          height: 60,
          name: "Konfirmasi penerimaan permintaan(karyawan baru)",
          type: "output",
          shape: "rect",
        },
        {
          id: 10,
          x: 500,
          y: 440,
          width: 120,
          height: 60,
          name: "Selesai",
          type: "output",
          shape: "rect",
        },
      ],
      FlowKaryawanBaru: [
        {
          id: "con-1",
          source: { id: "1", position: "right" }, //balok kiri
          destination: {//koneksi ke balok kanan
            id: "2",
            position: "left",
          },
          type: "step",
          style: { borderColor: "#b1b1b7", borderWidth: "2px" },
          markerEnd: "arrowclosed",
        },
        {
          id: "con-2",
          source: {
            id: "2",
            position: "bottom",
          },
          destination: {
            id: "3",
            position: "top",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-3",
          source: {
            id: "3",
            position: "right",
          },
          destination: {
            id: "4",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-4",
          source: {
            id: "4",
            position: "right",
          },
          destination: {
            id: "5",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-5",
          source: {
            id: "5",
            position: "right",
          },
          destination: {
            id: "6",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-6",
          source: {
            id: "5",
            position: "right",
          },
          destination: {
            id: "7",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-7",
          source: {
            id: "6",
            position: "right",
          },
          destination: {
            id: "8",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-8",
          source: {
            id: "7",
            position: "right",
          },
          destination: {
            id: "8",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-9",
          source: {
            id: "8",
            position: "right",
          },
          destination: {
            id: "9",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
        {
          id: "con-10",
          source: {
            id: "9",
            position: "right",
          },
          destination: {
            id: "10",
            position: "left",
            markerEnd: "arrow",
          },
          type: "step",
        },
      ],
    }),
  };
  </script>
  