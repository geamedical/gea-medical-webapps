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
    <v-card-text>
      <VFlowChart ref="flowChart" :nodes="nodes" :connections="conns" :footer-style="{ 'margin-left': '35%' }"
        :enableConnContextMenu="true" :enableNodeContextMenu="true" :connLineType="'step'">
        <div slot="nodeContextmenu" slot-scope="props" class="context__container d-inline-flex">
          <div class="context__button">
            <a href="javascript:;" class="context__link my-auto d-inline-flex">
              <i class="bi bi-circle-fill bg-white"></i><i class="bi bi-caret-down"></i>
            </a>
          </div>
          <div class="context__button">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-border-outer"></i>
            </a>
          </div>
          <div class="context__button">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-type-underline"></i>
            </a>
          </div>
          <div class="context__button" style="width: 550px">
            <select class="form-select" aria-label="Default select example">
              <option selected>Small</option>
            </select>
          </div>
          <div class="context__button-2" @click="$refs.flowChart.removeNode(props.node.id)">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-trash3"></i>
            </a>
          </div>
        </div>
        <div slot="connContextmenu" class="context__container"></div>

        <div class="toolbar" slot="footer">
          <div class="context__button">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-cursor"></i>
            </a>
          </div>
          <div class="context__button">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-hand-index-thumb"></i>
            </a>
          </div>
          <div class="context__button" @click="$refs.flowChart.addNode()">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-plus-lg"></i>
            </a>
          </div>
          <div class="context__button">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-arrow-counterclockwise"></i>
            </a>
          </div>
          <div class="context__button">
            <a href="javascript:;" class="context__link">
              <i class="bi bi-arrow-clockwise"></i>
            </a>
          </div>
        </div>
      </VFlowChart>
    </v-card-text>
  </v-card>
</template>
<script>
import VFlowChart from "vue2-flow";
export default {
  components: {
    VFlowChart,
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
    nodes: [
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
    conns: [
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
