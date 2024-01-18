<template>
    <v-data-table :headers="headers" :items="desserts" sort-by="input_date" flat :search="search">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Daftar pengguna email</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details dense
                    outlined></v-text-field>
            </v-toolbar>
        </template>
        <template v-slot:[`item.active`]="{ item }">
            <v-chip class="ma-2" :color="item.active > 1 ? 'primary' : 'error'">
                {{ item.active > 1 ? 'Active' : 'Inactive' }}
            </v-chip>
        </template>
        <template v-slot:[`item.input_date`]="{ item }">
            {{ $parseDate(item.input_date) }}
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Refresh
            </v-btn>
        </template>
        <template v-slot:[`item.users_mail`]="{ item }">
            <div v-html="item.users_mail"></div>
        </template>
    </v-data-table>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data: () => ({
        search: '',
        headers: [
            {
                text: 'Email',
                align: 'start',
                sortable: false,
                value: 'email',
            },
            { text: 'Karyawan', value: 'users_mail', sortable: false },
            { text: 'Status', value: 'active', sortable: false },
            { text: 'User ID', value: 'input_by', sortable: false },
            { text: 'Tanggal', value: 'input_date', sortable: false },
            { text: 'Keterangan', value: 'input_at', sortable: false },
            // { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
    }),

    created() {
        this.initialize()
    },

    methods: {
        ...mapActions("email", ["index"]),
        initialize() {
            this.index().then((res) => {
                this.desserts = res
            }).catch((err) => {
                console.log(err);
            })
        },
    },
}
</script>