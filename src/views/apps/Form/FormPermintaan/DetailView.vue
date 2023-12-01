<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Detail permintaan</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-list three-line subheader>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Pengguna yang mengajukan permintaan</v-list-item-title>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left" v-for="i in tbHeadUser" :key="i">
                                                    {{ i }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td v-for="i in tbBodyUser" :key="i">{{ data.user[i] }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list three-line subheader>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Permintaan</v-list-item-title>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left" v-for="i in tbHeadReq" :key="i">
                                                    {{ i }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(i, index) in data.request" :key="i.id">
                                                <td><strong>{{ index+1 }}</strong></td>
                                                <td><strong>{{ i.type.toUpperCase() }}</strong></td>
                                                <td>{{ i.detail }}</td>
                                                <td>{{ i.notes }}</td>
                                                <td><div :class="color(i.status)">{{ parseStatus(i.status) }}</div></td>
                                                <td>{{ parseDate(i.created_at) }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import moment from "moment";
export default {
    props: {
        dialogShow: Boolean,
        data: Object
    },
    data() {
        return {
            dialog: false,
            tbHeadUser: ['NAMA', 'NIK', 'EMAIL', 'USERNAME', 'KTP'],
            tbBodyUser: ['name', 'nik', 'email', 'username', 'noktp'],
            tbHeadReq: ['NO', 'TYPE', 'DETAIL', 'KETERANGAN', 'STATUS', 'TGL. DIBUAT'],
        }
    },
    watch: {
        dialogShow(e) {
            if (e === true) {
                this.dialog = e
            }
        },
        dialog(e) {
            if (e === false) {
                this.$emit('event', e)
            }
        }
    },
    methods: {
        parseDate(e) {
            return moment(e).format("yyyy-MM-DD, h:mm:ss");
        },
        parseStatus(e) {
            switch (e) {
                case 'n':
                    return 'Belum dipenuhi'
                case 'y':
                    return 'Terpenuhi'
                case 'w':
                    return 'Menunggu'
            }
        },
        color(e) {
            switch (e) {
                case 'n':
                    return 'error--text'
                case 'y':
                    return 'accent--text'
                case 'w':
                    return 'primary--text'
            }
        },
    }
}
</script>