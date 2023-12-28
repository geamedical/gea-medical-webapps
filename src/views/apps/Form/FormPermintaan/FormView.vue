<template>
    <v-form ref="form" v-model="validform" lazy-validation v-if="$can('create-form-permintaan')">
        <v-card flat class="card">
            <v-card-title>Form Permintaan</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col col="12" md="3">
                        <v-autocomplete dense outlined v-model="form.user.name" :items="usersOptions" item-text="name"
                            item-value="name" label="pilih user" class="mb-input"
                            :error-messages="showErr(errors, 'user.name')">
                            <template #item="{ item }">
                                <v-list-item class="d-flex">
                                    <div class="ml-2" @click="toggleItem(item)">{{ item.name }}-{{ item.nik }}</div>
                                </v-list-item>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col col="12" md="3">
                        <v-text-field dense outlined class="mb-input" label="HP/WA" v-model="form.user.telp"
                            :error-messages="showErr(errors, 'user.telp')" counter maxlength="13" disabled></v-text-field>
                    </v-col>
                    <v-col col="12" md="3">
                        <v-select dense outlined :items="data_divisi" item-text="deptname" item-value="id" label="Divisi"
                            class="mb-input" v-model="form.user.dept_id" :error-messages="showErr(errors, 'user.dept_id')"
                            disabled></v-select>
                    </v-col>
                    <v-col col="12" md="3">
                        <v-select dense outlined :items="data_role" item-text="rolename" item-value="id" label="Jabatan"
                            class="mb-input" v-model="form.user.role_id" :error-messages="showErr(errors, 'user.role_id')"
                            disabled></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col col="12" md="6">
                        <v-autocomplete dense outlined v-model="form.user_accepted.accept_primary_id" :items="usersGa"
                            item-text="name" item-value="id" label="pilih yang akan menyetujui" class="mb-input">
                        </v-autocomplete>
                    </v-col>
                    <v-col col="12" md="6">
                        <v-autocomplete dense outlined v-model="form.user_accepted.accept_secondary_id" :items="usersIt"
                            item-text="name" item-value="id" label="pilih yang akan mengerjakan" class="mb-input"
                            :error-messages="showErr(errors, 'user_accepted.accept_secondary_id')">
                        </v-autocomplete>
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
                <v-switch v-model="wifi" inset :label="`Wifi: ${wifi ? 'ya' : 'tidak'}`" :disabled="setpin"></v-switch>
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
                    </v-row>
                    <v-row>
                        <v-textarea outlined :name="permintaan[findData('akses-wifi')].notes"
                            v-model="permintaan[findData('akses-wifi')].notes" label="Untuk Keperluan?" :disabled="!wifi"
                            @change="setupWifi(findData('akses-wifi'))"></v-textarea>
                    </v-row>
                </v-container>
                <!-- wifi::ended -->

                <!-- server::started -->
                <v-switch v-model="server" inset :label="`Akses Server: ${server ? 'ya' : 'tidak'}`"></v-switch>
                <v-row no-gutters v-if="findData('akses-server') > -1" class="mb-5">
                    <v-col col="12" md="6" v-for="i in serverName" :key="i.id">
                        <v-checkbox v-model="selectedServer" :label="i.server" :value="i" class="mb-input"></v-checkbox>
                    </v-col>
                </v-row>
                <v-textarea outlined :name="permintaan[findData('akses-server')].notes"
                    v-model="permintaan[findData('akses-server')].notes" label="Untuk Keperluan?" :disabled="!server"
                    v-if="findData('akses-server') > -1" @change="setupServer(findData('akses-server'))"
                    @keyup="setupServer(findData('akses-server'))"></v-textarea>
                <!-- server::ended -->

            </v-card-text>
            <v-card-title v-if="cekNasServer()">
                Karena anda meminta akses server (NAS), maka silahkan menentukan folder mana yang akan anda akses.
            </v-card-title>
            <v-card-text v-if="cekNasServer()">
                <v-chip-group v-model="folderGroup" column multiple>
                    <v-chip class="mr-2" v-for="i in NasDir" :key="i.id" :value="i" v-on:click="setPermission(i)">
                        <v-icon left>
                            mdi-folder
                        </v-icon>
                        {{ i.dirname }}
                    </v-chip>
                </v-chip-group>
            </v-card-text>
            <v-card-title>
                <v-switch v-model="anyReq" inset
                    :label="`Apakah anda memiliki permintaan tambahan: ${anyReq ? 'ya' : 'tidak'}`"></v-switch>
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
        setpin: true,
        validform: false,
        loading: false,
        usersOptions: [],
        usersGa: [],
        usersIt: [],
        folderGroup: [],
        selectedServer: [],
        selectedDir: [],
        NasDir: [],
        serverName: [],
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
        mappedMyValue(e) {
            this.permintaan = e.request
            if (e.server.length > 0) {
                this.server = true
                this.selectedServer = e.server
                let fg = []
                e.directory.forEach(el => {
                    fg.push({
                        id: el.id,
                        primary_authorization_id: el.primary_authorization_id,
                        secondary_authorization_id: el.secondary_authorization_id,
                        dirname: el.dirname,
                        created_at: el.created_at,
                        updated_at: el.updated_at,
                    })
                });
                this.folderGroup = fg
                this.selectedDir = e.directory
            }
            const fAksesWifi = this.$findArrayByObjectName(e.request, 'type', 'akses-wifi')
            if (fAksesWifi) {
                let parseobj = JSON.parse(fAksesWifi.detail)
                this.setpin = false
                this.akseswifi = parseobj
                this.wifi = true
            }
            const fMail = this.$findArrayByObjectName(e.request, 'type', 'email')
            if (fMail) {
                this.email = true
            }
            const fOther = this.$findArrayByObjectName(e.request, 'type', 'lainya')
            if (fOther) {
                this.anyReq = true
            }
        },
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
        },
        folderGroup(v) {
            this.selectedDir = v
        },
        selectedDir(v) {
            if (v.length > 0) {
                var txtnotes = ''
                v.forEach(e => {
                    txtnotes += `Akses server NAS pada folder "${e.dirname}" dengan menunggu persetujuan utama / persetujuan pengganti, jika yang bersangkutan berhalangan maka persetujuan diserahkan pada pengguna yang telah ditentukan. `
                });
                this.permintaan[this.findData('akses-server')].notes = txtnotes
                this.permintaan[this.findData('akses-server')].detail = txtnotes
            } else {
                this.permintaan[this.findData('akses-server')].notes = ''
                this.permintaan[this.findData('akses-server')].detail = ''
            }
        }
    },
    computed: {
        ...mapState("form_permintaan", {
            form: (state) => state.form,
        }),
        mappedMyValue: {
            get() {
                return this.form;
            },
            set(newValue) {
                this.$store.commit('form_permintaan/SET_FORM', newValue)
            },
        },
    },
    mounted() {
        if (this.$store.state.auth.permissions.length > 0) {
            if (!this.$can('create-form-permintaan'))
                this.$router.push({ name: "error-401" }).catch(() => true)
        }
        this.attr_form().then((res) => {
            this.usersOptions = res.data.user
            this.usersGa = res.data.userGa
            this.usersIt = res.data.userIt
            this.data_divisi = res.data.dept
            this.data_role = res.data.role
        });
        this.getserverfetch()
        this.getdirfetch()
    },
    methods: {
        ...mapActions("form_permintaan", ["attr_form", "validatePin", "getdir", "getserver"]),
        async setPermission(item) {
            const { value: formValues } = await this.$swal({
                title: "Izin Akses",
                html: `
                        <select id="swal-input1" class="swal2-input">
                            <option value="read">Read<option>
                            <option value="write">Write<option>
                            <option value="read&write">Read & Write<option>
                        </select>
                    `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById("swal-input1").value
                    ];
                }
            });
            if (formValues) {
                const result = this.selectedDir.find(i => i.id === item.id);
                switch (formValues[0]) {
                    case 'read':
                        result['read'] = 'y'
                        result['write'] = 'n'
                        break
                    case 'write':
                        result['read'] = 'n'
                        result['write'] = 'y'
                        break
                    case 'read&write':
                        result['read'] = 'y'
                        result['write'] = 'y'
                        break
                }
            }
        },
        toggleItem(e) {
            this.form.user.name = e.name
            this.form.user.telp = e.telp
            this.form.user.dept_id = e.dept_id
            this.form.user.role_id = e.role_id
            this.setpin = e.pin !== '1234' || e.pin !== '' ? false : true
        },
        cekNasServer() {
            let obj = this.selectedServer.find(o => o.server === 'Server Nas');
            if (obj !== undefined) {
                return true
            } else {
                return false
            }
        },
        getdirfetch() {
            this.getdir().then((res) => {
                this.NasDir = res.data
            })
        },
        getserverfetch() {
            this.getserver().then((res) => {
                this.serverName = res.data
            })
        },
        setupWifi(i) {
            this.permintaan[i].detail = JSON.stringify(this.akseswifi)
        },
        setupServer(i) {
            this.permintaan[i].detail = this.permintaan[i].notes
        },
        findData(key) {
            return this.permintaan.findIndex(item => item.type === key)
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
            if (this.cekNasServer()) {
                this.form.directory = this.selectedDir;
            }
            this.form.server = this.selectedServer
            this.$emit('action', this.form)
        },
    },
};
</script>