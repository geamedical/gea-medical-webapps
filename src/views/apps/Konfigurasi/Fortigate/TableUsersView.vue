<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            search: '',
            dialog: false,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Name', value: 'name' },
                { text: 'Original Key', value: 'q_origin_key' },
                { text: '#', value: 'act' },
            ],
            users: [],
            data: [],
            expanded: [],
            editIndex: '',
            form: {
                name: '',
                passwd: '',
                passwd_confirmation: '',
                status: false
            },
        }
    },
    mounted() {
        this.getData()
        this.attr('user').then((res) => {
            if (res.status === 200) {
                this.users = res.data
            } else {
                this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
            }
        })
    },
    methods: {
        ...mapActions("fortigate", ["index", "store", "update", "delete", "attr"]),
        getData() {
            this.index('user-local')
                .then((res) => {
                    if (res.status === 200) {
                        this.data = res.data
                    } else {
                        this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                    }
                })
        },
        close() {
            this.dialog = false
            this.editIndex = ''
        },
        save() {
            const datapost = {
                name: this.form.name,
                passwd: this.form.passwd,
                passwd_confirmation: this.form.passwd_confirmation,
                status: this.form.status ? 'enable' : 'disable',
            }
            if (this.editIndex.length > 0) {
                this.update({ target: 'user-local', id: this.editIndex, data: datapost }).then((res) => {
                    if (res.status === 200) {
                        this.getData()
                        this.$swallInfo("Diperbaharui!", "Data berhasil diperbaharui.")
                    } else {
                        this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                    }
                    this.close()
                })
            } else {
                this.store({ target: 'user-local', data: datapost }).then((res) => {
                    if (res.status === 200) {
                        this.getData()
                        this.$swallInfo("Ditambahkan!", "Data berhasil ditambahkan.")
                    } else {
                        this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                    }
                    this.close()
                })
            }
        },
        editItem(data) {
            this.dialog = true
            this.editIndex = data.name
            this.form = {
                name: data.name,
                passwd: '',
                passwd_confirmation: '',
                status: data.status === 'enable' ? true : false
            }
        },
        deleteItem(name) {
            this.$swal({
                title: "Apakah anda akan menghapus data ini?",
                text: "Jika anda menghapus data ini maka data tersebut tidak dapat dikembalikan lagi!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus sekarang!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.delete({ target: 'user-local', id: name }).then((e) => {
                        if (e.status === 200) {
                            this.$swallInfo("Terhapus!", "Data berhasil dihapus.")
                        } else {
                            this.$swallErrors("Error!", "Terjadi kesalahan, silahkan hubungi tim IT!")
                        }
                        this.getData();
                    });
                }
            });
        }
    }
}
</script>
<template>
    <div>
        <v-dialog v-model="dialog" max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">
                        {{ this.editIndex === null ? 'Buat data pengguna lokal baru' : 'Perbaharui data pengguna lokal' }}
                    </span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-autocomplete dense outlined v-model="form.name" :items="users" item-text="username"
                            item-value="username" label="pilih user" class="mb-input" v-if="this.editIndex.length < 1">
                        </v-autocomplete>
                        <v-row>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field v-model="form.name" class="mb-input" outlined label="NAMA"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field v-model="form.passwd" class="mb-input" outlined
                                    label="PASSWORD"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field v-model="form.passwd_confirmation" class="mb-input" outlined
                                    label="KONFIRMASI PASSWORD"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-switch v-model="form.status" inset
                                    :label="`Status: ${form.status ? 'Enable' : 'Disable'}`"></v-switch>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save" v-if="$can('create-server') || $can('update-server')">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card flat color="card">
            <v-card-text>
                <v-data-table :headers="headers" :items="data" :items-per-page="15" :search="search" show-expand
                    :expanded.sync="expanded" single-expand flat dense>
                    <template v-slot:top>
                        <v-toolbar flat color="card">
                            <v-toolbar-title>Daftar Pengguna Fortigate</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn class="mx-2" fab dark small color="primary" @click="dialog = true" v-if="$can('create-server')">
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Cari data..." single-line
                                hide-details></v-text-field>
                        </v-toolbar>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <tr>
                                <th style="text-align: left;">NAME</th>
                                <td>: {{ item.name }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">ID</th>
                                <td>: {{ item.id }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">ORIGINAL KEY</th>
                                <td>: {{ item.q_origin_key }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">STATUS</th>
                                <td>: {{ item.status }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">TYPE</th>
                                <td>: {{ item.type }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">PASSWORD</th>
                                <td>: {{ item.passwd }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">LDAP SERVER</th>
                                <td>: {{ item['ldap-server'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">RADIUS SERVER</th>
                                <td>: {{ item['radius-server'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">TACACS +-SERVER</th>
                                <td>: {{ item['tacacs+-server'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">TWO FACTOR</th>
                                <td>: {{ item['two-factor'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">TWO FACTOR AUTH</th>
                                <td>: {{ item['two-factor-authentication'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">TWO FACTOR NOTIF</th>
                                <td>: {{ item['two-factor-notification'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">TOKEN</th>
                                <td>: {{ item.fortitoken }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">MAIL</th>
                                <td>: {{ item['email-to'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">SMS SERVER</th>
                                <td>: {{ item['sms-server'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">SMS CUSTOM SERVER</th>
                                <td>: {{ item['sms-custom-server'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">SMS PHONE</th>
                                <td>: {{ item['sms-phone'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">PASSWORD POLICY</th>
                                <td>: {{ item['passwd-policy'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">PASSWORD TIME</th>
                                <td>: {{ item['passwd-time'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">AUTH TIMEOUT</th>
                                <td>: {{ item.authtimeout }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">WORKSTATION</th>
                                <td>: {{ item.workstation }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">AUTH CONCURRENT OVERRIDE</th>
                                <td>: {{ item['auth-concurrent-override'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">AUTH CONCURRENT VALUE</th>
                                <td>: {{ item['auth-concurrent-value'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">PPK SECRET</th>
                                <td>: {{ item['ppk-secret'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">PPK IDENTITY</th>
                                <td>: {{ item['ppk-identity'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">USERNAME SENSITIVITY</th>
                                <td>: {{ item['username-sensitivity'] }}</td>
                            </tr>
                        </td>
                    </template>
                    <template v-slot:[`item.act`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)" v-if="$can('read-server')">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item.name)" v-if="$can('delete-server')">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>