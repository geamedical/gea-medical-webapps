<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <v-form>
            <v-card color="card" flat>
                <v-alert border="top" colored-border type="info" class="card" color="primary" flat>
                    <v-row>
                        <v-col col="12" md="8">
                            <p>
                                Bantu kami untuk mendapatkan data ter <i><strong>up to date</strong></i> dengan selalu
                                memperbaharui data diri anda sekarang.
                            </p>
                            <p>
                                Data yang selalu diperbaharui akan memudahkan divisi lain untuk mencari tahu informasi
                                tentang anda.
                            </p>
                            <p>
                                Tidak perlu khawatir, karna informasi data diri anda hanya bisa di akses oleh pengguna
                                yang
                                memiliki otoritas.
                            </p>
                        </v-col>
                        <v-col col="12" md="4">
                            <v-img max-height="150" max-width="250" src="@/assets/svg/account.svg"></v-img>
                        </v-col>
                    </v-row>
                </v-alert>
                <v-card-title>Form Profile</v-card-title>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-select dense outlined v-model="form.role_id" :items="role" item-text="rolename"
                                item-value="id" label="pilih role user" class="mb-input" disabled></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select dense outlined v-model="form.dept_id" :items="dept" item-text="deptname"
                                item-value="id" label="pilih departemen user" class="mb-input" disabled></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field dense outlined v-model="form.username" label="Username"
                                class="mb-input"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field dense outlined v-model="form.name" label="Nama Lengkap"
                                class="mb-input"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field dense outlined v-model="form.email" label="Alamat Email"
                                class="mb-input"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field type="number" dense outlined v-model="form.nik" class="mb-input"
                                label="nik"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.npwp" class="mb-input"
                                label="No. NPWP"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.noktp" class="mb-input"
                                label="No. KTP"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.telp" class="mb-input"
                                label="No. Ponsel"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-radio-group v-model="form.gender">
                                <template v-slot:label>
                                    <div>Pilih <strong>jenis kelamin</strong> anda :</div>
                                </template>
                                <v-radio value="Male" label="Pria"></v-radio>
                                <v-radio value="Female" label="Wanita"></v-radio>
                                <v-radio value="Other" label="Lainya"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-radio-group v-model="form.marital">
                                <template v-slot:label>
                                    <div>Pilih <strong>status pernikahan</strong> anda :</div>
                                </template>
                                <v-radio value="Married" label="Sudah Menikah"></v-radio>
                                <v-radio value="Unmarried" label="Belum Menikah"></v-radio>
                                <v-radio value="Other" label="Lainya"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea name="address" dense outlined label="Alamat tempat tinggal" auto-grow
                                class="mb-input" :value="form.address" v-model="form.address"></v-textarea>
                        </v-col>
                        <v-col cols="12" md="4">
                            <DatePicker label="Tgl. Lahir" @someEvent="callback" :disabled="false"></DatePicker>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.password" class="mb-input"
                                label="Password"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.password_confirmation" class="mb-input"
                                label="konfirmasi password"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-switch v-model="form.activation" inset disabled
                                :label="`Aktivasi: ${form.activation ? 'Aktif' : 'Tidak Aktif'}`"></v-switch>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn depressed :loading="loading" color="primary" block @click="submit">
                        Submit data
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>
<script>
import DatePicker from '@/components/DatePicker.vue'
import { mapActions, mapState } from "vuex";
export default {
    components: {
        DatePicker
    },
    data: () => ({
        role: [],
        dept: [],
        valid: false,
        loading: false,
    }),
    computed: {
        ...mapState('auth', {
            form: state => state.formProfile,
        }),
    },
    created() {
        this.attr_form_user().then((res) => {
            this.dept = res.data.depts
            this.role = res.data.roles
        })
        this.getProfile()
    },
    methods: {
        ...mapActions('auth', ['attr_form_user', 'getProfile', 'updateProfile']),
        callback(e) {
            this.form.birthdate = e
        },
        submit() {
            this.loading = true
            this.updateProfile().then((e) => {
                this.loading = false
                if (e.status) {
                    this.$swal({
                        title: "Diperbaharui!",
                        text: "Data berhasil diperbaharui.",
                        icon: "success",
                    });
                } else {
                    this.$swal({
                        title: "Error!",
                        text: `Terjadi kesalahan, silahkan hubungi tim IT. Pesan kesalahan : ${e.data.errors}`,
                        icon: "warning",
                    });
                }
            })
        },
    }
}
</script>