<template>
    <v-container>
        <v-img src="@/assets/svg/401.svg"></v-img>
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
    </v-container>
</template>
