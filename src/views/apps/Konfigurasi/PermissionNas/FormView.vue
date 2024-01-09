<template>
    <v-form @submit.prevent="submit">
        <v-card flat color="card" class="mb-5" v-if="!$route.params.id">
            <v-card-title>Daftar folder yang tersedia</v-card-title>
            <v-card-text v-if="dirlistLoading === false">
                <v-chip-group v-model="dirgroup" column v-if="dirlist.length > 0">
                    <v-chip filter outlined v-for="i in dirlist" :key="i.path">
                        {{ i.name }}
                    </v-chip>
                </v-chip-group>
                <v-alert dense outlined type="error" v-else>
                    Data folder pada server <strong>kosong</strong>!
                </v-alert>
            </v-card-text>
            <v-card-text class="d-flex justify-center" v-else>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-card-text>
        </v-card>
        <v-card color="card" flat>
            <v-card-title>Form Perizinan Server NAS</v-card-title>
            <v-card-text>
                <v-alert border="left" color="primary" dark>
                    Anda dapat <strong>menulis secara manual</strong> jika memang data yang ingin anda daftarkan tidak
                    tercantum dalam daftar folder yang yang muncul/sistem tidak menampilkan daftar folder yang tersedia pada
                    server NAS.
                </v-alert>
                <v-row no-gutters>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.dirname" label="Nama folder" class="mb-input"
                            :error-messages="getMsg('dirname')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-autocomplete dense outlined v-model="form.primary_authorization_id" :items="user1"
                            item-text="name" :search-input.sync="find1" item-value="id" label="pilih user" class="mb-input"
                            :error-messages="getMsg('primary_authorization_id')"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-autocomplete dense outlined v-model="form.secondary_authorization_id" :items="user2"
                            item-text="name" :search-input.sync="find2" item-value="id" label="pilih user" class="mb-input"
                            :error-messages="getMsg('secondary_authorization_id')"></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block type="submit"
                    v-if="$can('create-nasserver') || $can('update-nasserver')">
                    Submit data
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    props: {
        errors: Array,
        search1: String,
        search2: String,
    },
    data: () => ({
        find1: null,
        find2: null,
        dirgroup: null,
        dirlist: [],
        dirlistLoading: true,
        err: [],
        user1: [],
        user2: [],
        valid: false,
        loading: false,
    }),
    computed: {
        ...mapState("permission_nas", {
            form: (state) => state.form,
        }),
    },
    mounted() {
        this.dirlistLoading = true
        this.getdir().then((res) => {
            this.dirlist = res
            this.dirlistLoading = false
        })
        this.getUser1('')
        this.getUser2('')
    },
    watch: {
        errors(e) {
            this.err = e
        },
        search1(v) {
            console.log(v);
            this.find1 = v
        },
        search2(v) {
            this.find2 = v
        },
        find1(v) {
            if (v !== null) {
                this.getUser1(v);
            }
        },
        find2(v) {
            if (v !== null) {
                this.getUser2(v);
            }
        },
        dirgroup(v) {
            if (v !== null) {
                const find = this.dirlist[v]
                const tableAttr = { options: { page: 1, itemsPerPage: 10, sortBy: '', sortDesc: true }, search: find.name };
                this.index(tableAttr).then((res) => {
                    if (res.data.data.data.length < 1) {
                        this.form.dirname = find.name
                    } else {
                        this.dirgroup = null
                        this.$swallErrors("Error!", "Anda sudah mendaftarkan folder tersebut, anda bisa memperbaharui nya jika diperlukan!")
                        this.form.dirname = ''
                    }
                })
            } else {
                this.$swallErrors("Error!", "Anda harus memilih daftar folder pada list dan pastikan folder yang anda daftarkan belum pernah didaftarkan sebelumnya, anda bisa memperbaharui nya jika diperlukan!")
                this.form.dirname = ''
            }
        }
    },
    methods: {
        ...mapActions("permission_nas", ["attr_form_user", "getdir", "index"]),
        getUser1(e) {
            this.attr_form_user(e !== null ? e : '').then((res) => {
                this.user1 = res.data.data
            });
        },
        getUser2(e) {
            this.attr_form_user(e !== null ? e : '').then((res) => {
                this.user2 = res.data.data
            });
        },
        getMsg(strg) {
            const result = this.err.find(obj => obj.field === strg);
            if (this.err.length > 0) {
                if (result !== undefined) {
                    return result.message
                }
                return ''
            }
            return ''
        },
        submit() {
            this.loading = true
            this.$emit('action')
            this.loading = false
        },
    }
}
</script>