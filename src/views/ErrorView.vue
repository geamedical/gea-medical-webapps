<template>
    <v-container>
        <v-img height="300" src="@/assets/svg/404.svg"></v-img>
        <v-alert text color="primary" class="mt-10">
            <h1 class="text-h1 text-center">
                404
            </h1>
            <h3 class="text-h5 text-center">
                Maaf, kami tidak mengenali halaman yang anda maksud.
            </h3>
            <div class="text-center">Jika anda memiliki kesulitan dalam menggunakan sistem, anda dapat membaca dokumentasi kami atau anda juga bisa menghubungi tim IT, terimakasih.</div>

            <v-divider class="my-4 primary" style="opacity: 0.22"></v-divider>

            <v-row align="center" no-gutters>
                <v-col class="grow">
                    Apakah anda ingin kembali ke beranda ?
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="shrink">
                    <v-btn color="primary" outlined to="/dashboard">
                        Kembali ke beranda
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>
    </v-container>
</template>
