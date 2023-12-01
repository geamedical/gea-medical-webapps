<template>
    <v-form ref="form" v-model="validform" lazy-validation v-if="$can('create-form-permintaan')">
        <v-card flat class="card">
            <v-card-title>Form Permintaan</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col col="12" md="3">
                        <v-text-field dense outlined class="mb-input" label="Nama" v-model="form.user.name"
                            :error-messages="showErr(errors, 'user.name')"></v-text-field>
                    </v-col>
                    <v-col col="12" md="3">
                        <v-text-field dense outlined class="mb-input" label="HP/WA" v-model="form.user.telp"
                            :error-messages="showErr(errors, 'user.telp')" counter maxlength="13"></v-text-field>
                    </v-col>
                    <v-col col="12" md="3">
                        <v-select dense outlined :items="data_divisi" item-text="deptname" item-value="id" label="Divisi"
                            class="mb-input" v-model="form.user.dept_id"
                            :error-messages="showErr(errors, 'user.dept_id')"></v-select>
                    </v-col>
                    <v-col col="12" md="3">
                        <v-select dense outlined :items="data_role" item-text="rolename" item-value="id" label="Jabatan"
                            class="mb-input" v-model="form.user.role_id"
                            :error-messages="showErr(errors, 'user.role_id')"></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-title>Permintaan</v-card-title>
            <v-card-text>
                <!-- email::start -->
                <v-switch v-model="email" inset :label="`Email: ${email ? 'ya' : 'tidak'}`"></v-switch>
                <v-text-field :disabled="!email" dense outlined class="mb-input" label="Alamat email"
                    v-model="permintaan[findData('email')].detail" :rules="[
                        v => !!v || 'E-mail harus diisi!',
                        v => /.+@.+/.test(v) || 'E-mail tidak valid!',
                    ]" v-if="findData('email') > -1"></v-text-field>
                <v-textarea outlined :name="permintaan[findData('email')].notes"
                    v-model="permintaan[findData('email')].notes" label="Untuk Keperluan?" :disabled="!email"
                    v-if="findData('email') > -1"></v-textarea>
                <!-- email::end -->

                <!-- wifi::started -->
                <v-switch v-model="wifi" inset :label="`Wifi: ${wifi ? 'ya' : 'tidak'}`"
                    :disabled="this.authenticated.pin === '' || this.authenticated.pin === null ? false : true"></v-switch>
                <v-container v-if="findData('akses-wifi') > -1">
                    <v-row>
                        <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Nama lengkap"
                            v-model="akseswifi.nama" :rules="[
                                v => !!v || 'Nama lengkap harus diisi!',
                            ]"></v-text-field>
                        <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Alamat email aktif"
                            v-model="akseswifi.email" :rules="[
                                v => !!v || 'E-mail harus diisi!',
                                v => /.+@.+/.test(v) || 'E-mail tidak valid!',
                            ]"></v-text-field>
                        <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Pin" v-model="akseswifi.pin"
                            :counter="4" :rules="[
                                v => !!v || 'Pin harus diisi',
                                v => v.length <= 4 || 'Pin maximal 4 karakter!',
                            ]" @change="cekpin"></v-text-field>
                        <v-textarea outlined :name="permintaan[findData('akses-wifi')].notes"
                            v-model="permintaan[findData('akses-wifi')].notes" label="Untuk Keperluan?" :disabled="!wifi"
                            @change="setupWifi(findData('akses-wifi'))"></v-textarea>
                    </v-row>
                </v-container>
                <!-- wifi::ended -->

                <!-- server::started -->
                <v-switch v-model="server" inset :label="`Akses Server: ${server ? 'ya' : 'tidak'}`"></v-switch>
                <v-row no-gutters v-if="findData('akses-server') > -1" class="mb-5">
                    <v-col col="12" md="6" v-for="i in serverName" :key="i">
                        <v-checkbox v-model="selectedServer" :label="i" :value="i" class="mb-input"></v-checkbox>
                    </v-col>
                </v-row>
                <v-textarea outlined :name="permintaan[findData('akses-server')].notes"
                    v-model="permintaan[findData('akses-server')].notes" label="Untuk Keperluan?" :disabled="!server"
                    v-if="findData('akses-server') > -1" @change="setupServer(findData('akses-server'))"></v-textarea>
                <!-- server::ended -->

            </v-card-text>
            <v-card-title>
                <v-switch v-model="anyReq" inset :label="`Apakah anda memiliki permintaan tambahan: ${anyReq ? 'ya' : 'tidak'}`"></v-switch>
            </v-card-title>
            <v-card-text v-if="anyReq">
                <v-container>
                    <v-row no-gutters v-for="(item, index) in permintaan.filter(item => item.type === 'lainya')"
                        :key="index">
                        <v-col>
                            <v-text-field dense outlined class="mb-input" label="Detail permintaan"
                                v-model="item.detail"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field dense outlined class="mb-input" label="Untuk keperluan ?"
                                v-model="item.notes"></v-text-field>
                        </v-col>
                        <v-btn class="mx-2" fab dark color="primary" small @click="add()">
                            <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab dark color="error" small v-if="permintaan.length > 1"
                            @click="remove(item.no)">
                            <v-icon dark> mdi-delete </v-icon>
                        </v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="$can('create-form-permintaan')" text color="primary" @click="submit">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    props: {
        errors: Array,
        request: Array
    },
    data: () => ({
        validform: false,
        loading: false,
        selectedServer: [],
        serverName: ['NAS', 'VPN', 'MPM.GEA', 'GLOBAL.GEA', 'RMP.GEA', 'YOUTUBE/SOSMED', 'LAINYA'],
        data_divisi: [],
        data_role: [],
        email: false,
        wifi: false,
        server: false,
        anyReq: false,
        akseswifi: {
            nama: "",
            email: "",
            pin: "",
        },
        permintaan: [],
    }),
    watch: {
        email(e) {
            if (e) {
                let setno = this.permintaan.length
                this.permintaan.push({ no: setno, type: "email", detail: "", notes: "", created_at: "", updated_at: "" })
            } else {
                const indexToRemove = this.permintaan.findIndex(item => item.type === 'email')
                if (indexToRemove !== -1) {
                    this.permintaan.splice(indexToRemove, 1);
                }
            }
        },
        wifi(e) {
            if (e) {
                let setno = this.permintaan.length
                this.permintaan.push({ no: setno, type: "akses-wifi", detail: "", notes: "", created_at: "", updated_at: "" })
            } else {
                const indexToRemove = this.permintaan.findIndex(item => item.type === 'akses-wifi')
                if (indexToRemove !== -1) {
                    this.permintaan.splice(indexToRemove, 1);
                }
            }
        },
        server(e) {
            if (e) {
                let setno = this.permintaan.length
                this.permintaan.push({ no: setno, type: "akses-server", detail: "", notes: "", created_at: "", updated_at: "" })
            } else {
                const indexToRemove = this.permintaan.findIndex(item => item.type === 'akses-server')
                if (indexToRemove !== -1) {
                    this.permintaan.splice(indexToRemove, 1);
                }
            }
        },
        anyReq(e) {
            if (e) {
                let setno = this.permintaan.length
                this.permintaan.push({ no: setno, type: "lainya", detail: "", notes: "", created_at: "", updated_at: "" })
            } else {
                const indexToRemove = this.permintaan.findIndex(item => item.type === 'lainya')
                if (indexToRemove !== -1) {
                    this.permintaan.splice(indexToRemove, 1);
                }
            }
        },
        request(e) {
            if (e.length > 0) {
                this.permintaan = e
                const emailfind = this.permintaan.findIndex(i => i.type === 'email')
                const serverfind = this.permintaan.findIndex(i => i.type === 'akses-server')
                this.email = emailfind > -1 ? true : false
                this.server = serverfind > -1 ? true : false
                this.selectedServer = this.permintaan[serverfind].detail.split(',')
            }
        }
    },
    computed: {
        ...mapState("form_permintaan", {
            form: (state) => state.form,
        }),
        ...mapState("auth", {
            authenticated: (state) => state.authenticated,
        }),
    },
    mounted() {
        if (this.$store.state.auth.permissions.length > 0) {
            if (!this.$can('create-form-permintaan'))
                this.$router.push({ name: "error-401" }).catch(() => true)
        }
        this.attr_form().then((res) => {
            this.data_divisi = res.data.depts;
            this.data_role = res.data.roles;
        });
        this.setupUser()
    },
    methods: {
        ...mapActions("form_permintaan", ["attr_form", "validatePin"]),
        setupWifi(i) {
            this.permintaan[i].detail = JSON.stringify(this.akseswifi)
        },
        setupServer(i) {
            this.permintaan[i].detail = this.selectedServer.join()
        },
        findData(key) {
            return this.permintaan.findIndex(item => item.type === key)
        },
        setupUser() {
            this.form.user = {
                name: this.authenticated.name,
                telp: this.authenticated.telp,
                role_id: this.authenticated.role_id,
                dept_id: this.authenticated.dept_id,
            }
        },
        cekpin() {
            const datapostcek = { pin: this.akseswifi.pin, username: this.form.user.name }
            this.validatePin(datapostcek).then((res) => {
                if (res.data.total > 0) {
                    this.akseswifi.pin = ''
                    this.$swal({
                        title: "Error!",
                        text: "PIN Tidak valid, seseorang telah menggunakan pin tersebut, silahkan gunakan pin lain!",
                        icon: "warning",
                    });
                }
            })
        },
        add() {
            let noset = this.permintaan.length
            this.permintaan.push({ no: noset, type: "lainya", detail: "", notes: "", created_at: "", updated_at: "" });
        },
        remove(e) {
            const indexToRemove = this.permintaan.findIndex(item => item.no === e);
            if (indexToRemove !== -1) {
                this.permintaan.splice(indexToRemove, 1);
            }
        },
        showErr(arr, index) {
            const find = arr.find(x => x.field === index)
            return find !== undefined ? find.message : ''
        },
        submit() {
            this.loading = true;
            this.$refs.form.validate();
            this.form.request = this.permintaan;
            this.$emit('action', this.form)
        },
    },
};
</script>