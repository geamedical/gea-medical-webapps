<template>
    <v-card class="card">
        <v-card-title class="primary--text"> Fungsi dan penggunakan fitur Profil </v-card-title>
        <v-card-text>
            <p>
                Fungsi dan penggunaan fitur profil berikut antara lain:
            </p>
            <ul>
                <li>
                    <strong>Sebagai informasi data pribadi pengguna yang disimpan kedalam sistem</strong><br />
                    <p>
                        Pengguna dapat memperbaharui atau menambahkan data diri pribadinya didalam sistem.
                    </p>
                </li>
                <li>
                    <strong>Sebagai parameter</strong><br />
                    <p>
                        Data pengguna yang tersimpan dijadikan parameter untuk aturan penggunaan sistem agar berjalan sesuai dengan semestinya.
                    </p>
                </li>
                <h3><i>Roudmap</i> pembaharuan dan penambahan data diri pada fitur profil.</h3>
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
                text: "Login",
                disabled: false,
                href: "1",
            },
            {
                text: "Klik menu yang menampilkan username anda (menu sidebar kiri)",
                disabled: false,
                href: "2",
            },
            {
                text: "Pilih menu profil",
                disabled: false,
                href: "3",
            },
            {
                text: "Perbaharui/tambahkan data",
                disabled: false,
                href: "4",
            },
            {
                text: "Selesai",
                disabled: false,
                href: "5",
            },
        ],
    }),
}
</script>