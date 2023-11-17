<template>
    <v-card class="card">
        <v-card-title class="pink--text"> Laporan ERROR </v-card-title>
        <v-card-text>
            <p>
                Dalam setiap proses penggunaan sistem, dapat dimungkinkan terjadinya kesalahan <i><strong
                        class="pink--text">(error)</strong></i>, jika hal tersebut terjadi maka anda harus melakukan langkah
                berikut
                antara lain:
            </p>
            <ul>
                <li>
                    <strong>Anda dapat memfoto pesan kesalahan tersebut</strong><br />
                    <p>
                        Pengguna dapat memfoto pesan kesalahan yang ditampilkan didalam layar untuk membuktikan pada tim IT
                        agar
                        memudahkan proses penelusuran terjadinya hal tersebut.
                    </p>
                </li>
                <li>
                    <strong>Hubungi tim IT</strong><br />
                    <p>
                        Pengguna dapat menghubungi tim IT setelah menyimpan foto pesan kesalahan yang ditampilkan didalam
                        layar.
                    </p>
                </li>
                <h3>Roudmap Penaggulangan kesalahan</h3>
                <v-breadcrumbs :items="items">
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
                text: "Foto pesan kesalahan",
                disabled: false,
                href: "1",
            },
            {
                text: "Hubungi tim IT",
                disabled: false,
                href: "2",
            },
            {
                text: "Menunggu proses perbaikan",
                disabled: false,
                href: "3",
            },
            {
                text: "Selesai",
                disabled: false,
                href: "4",
            },
        ],
    }),
}
</script>