<template>
    <v-list subheader three-line>
            <v-subheader>Informasi Panduan</v-subheader>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Form Permintaan</v-list-item-title>
                    <v-list-item-subtitle>
                        Informasi tentang penggunaan fitur <strong>Form Permintaan</strong> dapat anda lihat disini.
                    </v-list-item-subtitle>
                    <v-list-item-action style="margin-left: 0px !important;">
                        <v-btn small depressed color="primary" outlined to="/users-info/form-permintaan">
                            Lihat
                        </v-btn>
                    </v-list-item-action>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Laporan error</v-list-item-title>
                    <v-list-item-subtitle>
                        Jika anda mengalami masalah tentang bug, error, dan keluhan lainya. Anda dapat menghubungi kami.
                    </v-list-item-subtitle>
                    <v-list-item-action style="margin-left: 0px !important;">
                        <v-btn small depressed color="primary" outlined to="/users-info/error-reporting">
                            Lihat
                        </v-btn>
                    </v-list-item-action>
                </v-list-item-content>
            </v-list-item>
        </v-list>
</template>