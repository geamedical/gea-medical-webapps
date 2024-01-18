<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            search: '',
            dialog: false,
            dialogMembers: false,
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
                q_origin_key: ''
            },
            membersForm: [],
            formMembers: {
                group_members: [],
                groupname: ''
            },
            dialogShow: false,
            loadingShow: false,
            dataShow: []
        }
    },
    mounted() {
        this.getData()
        this.attr('group').then((res) => {
            if (res.status === 200) {
                this.users = res.data.data
            } else {
                this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
            }
        })
    },
    watch: {
        membersForm(v) {
            const arr = []
            v.forEach(name => {
                arr.push({
                    name: name,
                    q_origin_key: name
                })
            });
            this.formMembers.group_members = []
            this.formMembers.group_members = arr
        },
        dialogShow(v) {
            if (v !== true) {
                this.dataShow = []
            }
        }
    },
    methods: {
        ...mapActions("fortigate", ["index", "store", "update", "delete", "attr", "show", "deleteMember"]),
        getData() {
            this.index('group')
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
            if (this.editIndex.length > 0) {
                this.update({ target: 'group', id: this.editIndex, data: this.form }).then((res) => {
                    if (res.status === 200) {
                        this.getData()
                        this.$swallInfo("Diperbaharui!", "Data berhasil diperbaharui.")
                    } else {
                        this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                    }
                    this.close()
                })
            } else {
                this.store({ target: 'group', data: this.form }).then((res) => {
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
        closeDialogMembers() {
            this.dialogMembers = false
            this.formMembers.groupname = ''
        },
        saveDialogMembers() {
            this.store({ target: 'group-members', data: this.formMembers }).then((res) => {
                if (res.status === 200) {
                    this.getData()
                    this.$swallInfo("Ditambahkan!", "Data berhasil ditambahkan.")
                } else {
                    this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                }
                this.closeDialogMembers()
            })
        },
        editItem(data) {
            this.dialog = true
            this.editIndex = data.name
            this.form = {
                name: data.name,
                q_origin_key: data.q_origin_key,
            }
        },
        deleteItem(name) {
            if (this.$can('update-server') && this.$can('create-server')) {
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
                        this.delete({ target: 'group', id: name }).then((e) => {
                            if (e.status === 200) {
                                this.$swallInfo("Terhapus!", "Data berhasil dihapus.")
                            } else {
                                this.$swallErrors("Error!", "Terjadi kesalahan, silahkan hubungi tim IT!")
                            }
                            this.getData();
                        });
                    }
                });
            } else {
                this.$swallErrors("Error!", "Terjadi kesalahan, silahkan hubungi tim IT!")
            }
        },
        keyname() {
            this.form.q_origin_key = this.form.name
        },
        members(groupname) {
            this.dialogMembers = true
            this.formMembers.groupname = groupname
        },
        membersMinus(name) {
            this.show({ target: 'group', id: name }).then((res) => {
                if (res.status === 200) {
                    this.dialogShow = true
                    this.dataShow = res.data.results[0]
                } else {
                    this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                }
            })
        },
        delete_member(namegroup, namemember) {
            this.$swal({
                title: `Apakah anda akan menghapus member atas nama "${namemember}" pada grup "${namegroup}" ini?`,
                text: "Jika anda menghapus data ini maka data tersebut tidak dapat dikembalikan lagi!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus sekarang!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteMember({ id: namegroup, member: namemember, target: 'group-members' })
                        .then((res) => {
                            if (res.status === 200) {
                                this.loadingShow = true
                                this.show({ target: 'group', id: namegroup }).then((res) => {
                                    if (res.status === 200) {
                                        this.dataShow = res.data.results[0]
                                        this.loadingShow = false
                                    } else {
                                        this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                                    }
                                })
                                this.$swallInfo("Terhapus!", `Data member atas nama ${namemember} telah dihapus pada grup ${namegroup}.`)
                            } else {
                                this.$swallErrors('Terjadi kesalahan', `Status sumber permintaan ${res.status}`)
                            }
                        })
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
                        {{ this.editIndex.length < 1 ? 'Buat data grup pengguna baru' : 'Perbaharui data grup pengguna' }}
                            </span>
                </v-card-title>

                <v-card-text>
                    <v-text-field v-model="form.name" class="mb-input" outlined label="NAMA GRUP"
                        @keyup="keyname($event)"></v-text-field>
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
        <v-dialog v-model="dialogMembers" max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Tambah Member Untuk Group {{ this.formMembers.groupname }}</span>
                </v-card-title>

                <v-card-text>
                    <v-autocomplete dense chips multiple small-chips outlined v-model="membersForm" :items="users"
                        item-text="name" item-value="name" label="pilih user" class="mb-input">
                    </v-autocomplete>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialogMembers">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveDialogMembers"
                        v-if="$can('create-server') && $can('update-server')">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogShow" max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Lihat/Hapus Member Untuk Group <strong>{{ this.dataShow.name }}</strong></span>
                </v-card-title>

                <v-card-text v-if="loadingShow">
                    <div class="d-flex justify-center">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                </v-card-text>
                <v-card-text v-else>
                    <v-simple-table>
                        <template v-slot:default>
                            <tr>
                                <th style="text-align: left;">Original Key</th>
                                <td>: {{ dataShow['q_origin_key'] }}</td>
                                <th style="text-align: left;">ID</th>
                                <td>: {{ dataShow['id'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Group Type</th>
                                <td>: {{ dataShow['group-type'] }}</td>
                                <th style="text-align: left;">Auth Timeout</th>
                                <td>: {{ dataShow['authtimeout'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Auth Concurrent Override</th>
                                <td>: {{ dataShow['auth-concurrent-override'] }}</td>
                                <th style="text-align: left;">Auth Concurrent Value</th>
                                <td>: {{ dataShow['auth-concurrent-value'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Http Digest Realm</th>
                                <td>: {{ dataShow['http-digest-realm'] }}</td>
                                <th style="text-align: left;">SSO Attribute Value</th>
                                <td>: {{ dataShow['sso-attribute-value'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">User ID</th>
                                <td>: {{ dataShow['user-id'] }}</td>
                                <th style="text-align: left;">Password</th>
                                <td>: {{ dataShow['password'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Username</th>
                                <td>: {{ dataShow['user-name'] }}</td>
                                <th style="text-align: left;">Sponsor</th>
                                <td>: {{ dataShow['sponsor'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Company</th>
                                <td>: {{ dataShow['company'] }}</td>
                                <th style="text-align: left;">Email</th>
                                <td>: {{ dataShow['email'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Mobile Phone</th>
                                <td>: {{ dataShow['mobile-phone'] }}</td>
                                <th style="text-align: left;">SMS Server</th>
                                <td>: {{ dataShow['sms-server'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">SMS Custom Server</th>
                                <td>: {{ dataShow['sms-custom-server'] }}</td>
                                <th style="text-align: left;">Expired Type</th>
                                <td>: {{ dataShow['expire-type'] }}</td>
                            </tr>
                            <tr>
                                <th style="text-align: left;">Expire</th>
                                <td>: {{ dataShow['expire'] }}</td>
                                <th style="text-align: left;">Max Account</th>
                                <td>: {{ dataShow['max-accounts'] }}</td>
                            </tr>
                        </template>
                    </v-simple-table>
                    <v-divider class="mt-5 mb-5"></v-divider>
                    <span class="mt-5 text-h5">Members Group <strong>"{{ this.dataShow.name }}"</strong></span>
                    <v-row class="mt-2">
                        <div v-for="i in dataShow.member" :key="i.name">
                            <v-chip class="ma-2" close @click:close="delete_member(dataShow.name, i.name)">
                                {{ i.name }}
                            </v-chip>
                        </div>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogShow = !dialogShow">
                        Closed
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
                            <v-toolbar-title>Daftar Grup Pengguna Fortigate</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn class="mx-2" fab dark small color="primary" @click="dialog = true">
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
                            <v-container>
                                <tr>
                                    <th style="text-align: left;">Original Key</th>
                                    <td>: {{ item['q_origin_key'] }}</td>
                                    <th style="text-align: left;">ID</th>
                                    <td>: {{ item['id'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Group Type</th>
                                    <td>: {{ item['group-type'] }}</td>
                                    <th style="text-align: left;">Auth Timeout</th>
                                    <td>: {{ item['authtimeout'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Auth Concurrent Override</th>
                                    <td>: {{ item['auth-concurrent-override'] }}</td>
                                    <th style="text-align: left;">Auth Concurrent Value</th>
                                    <td>: {{ item['auth-concurrent-value'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Http Digest Realm</th>
                                    <td>: {{ item['http-digest-realm'] }}</td>
                                    <th style="text-align: left;">SSO Attribute Value</th>
                                    <td>: {{ item['sso-attribute-value'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">User ID</th>
                                    <td>: {{ item['user-id'] }}</td>
                                    <th style="text-align: left;">Password</th>
                                    <td>: {{ item['password'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Username</th>
                                    <td>: {{ item['user-name'] }}</td>
                                    <th style="text-align: left;">Sponsor</th>
                                    <td>: {{ item['sponsor'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Company</th>
                                    <td>: {{ item['company'] }}</td>
                                    <th style="text-align: left;">Email</th>
                                    <td>: {{ item['email'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Mobile Phone</th>
                                    <td>: {{ item['mobile-phone'] }}</td>
                                    <th style="text-align: left;">SMS Server</th>
                                    <td>: {{ item['sms-server'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">SMS Custom Server</th>
                                    <td>: {{ item['sms-custom-server'] }}</td>
                                    <th style="text-align: left;">Expired Type</th>
                                    <td>: {{ item['expire-type'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Expire</th>
                                    <td>: {{ item['expire'] }}</td>
                                    <th style="text-align: left;">Max Account</th>
                                    <td>: {{ item['max-accounts'] }}</td>
                                </tr>
                                <tr>
                                    <th style="text-align: left;">Multiple Guest Add</th>
                                    <td>: {{ item['multiple-guest-add'] }}</td>
                                    <th style="text-align: left;">Members</th>
                                    <td>: <strong v-for="i in item['member']" :key="i.name">{{ i.name }}, </strong>
                                    </td>
                                </tr>
                            </v-container>
                        </td>
                    </template>
                    <template v-slot:[`item.act`]="{ item }">
                        <v-icon small class="mr-2" @click="members(item.name)" color="primary"
                            v-if="$can('update-server') && $can('create-server')">
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-icon small class="mr-2" @click="membersMinus(item.name)" color="error"
                            v-if="$can('update-server') && $can('create-server')">
                            mdi-account-multiple-minus
                        </v-icon>
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