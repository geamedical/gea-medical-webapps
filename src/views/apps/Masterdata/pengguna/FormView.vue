<template>
    <v-form @submit.prevent="submit">
        <v-card color="card" flat>
            <v-card-title>Form Pengguna</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-autocomplete dense outlined v-model="form.role_id" :items="role" item-text="coderole" item-value="id"
                            label="pilih role user" class="mb-input" :error-messages="getMsg('role_id')"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-autocomplete dense outlined v-model="form.dept_id" :items="dept" :item-text="(row) => {return row.company+ ' - ' + row.deptname;}" item-value="id"
                            label="pilih departemen user" class="mb-input" :error-messages="getMsg('dept_id')"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.username" label="Username" class="mb-input"
                            :error-messages="getMsg('username')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.name" label="Nama Lengkap" class="mb-input"
                            :error-messages="getMsg('name')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.email" label="Alamat Email" class="mb-input"
                            :error-messages="getMsg('email')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field type="number" dense outlined v-model="form.nik" class="mb-input" label="nik"
                            :error-messages="getMsg('nik')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.npwp" class="mb-input" label="No. NPWP"
                            :error-messages="getMsg('npwp')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.noktp" class="mb-input" label="No. KTP"
                            :error-messages="getMsg('noktp')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.telp" class="mb-input" label="No. Ponsel"
                            :error-messages="getMsg('telp')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-radio-group v-model="form.gender" :error-messages="getMsg('gender')">
                            <template v-slot:label>
                                <div>Pilih <strong>jenis kelamin</strong> anda :</div>
                            </template>
                            <v-radio value="Male" label="Pria"></v-radio>
                            <v-radio value="Female" label="Wanita"></v-radio>
                            <v-radio value="Other" label="Lainya"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-radio-group v-model="form.marital" :error-messages="getMsg('marital')">
                            <template v-slot:label>
                                <div>Pilih <strong>status pernikahan</strong> anda :</div>
                            </template>
                            <v-radio value="Married" label="Sudah Menikah"></v-radio>
                            <v-radio value="Unmarried" label="Belum Menikah"></v-radio>
                            <v-radio value="Other" label="Lainya"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-textarea name="address" dense outlined label="Alamat tempat tinggal" auto-grow class="mb-input"
                            :value="form.address" v-model="form.address" :error-messages="getMsg('address')"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="3">
                        <DatePicker label="Tgl. Lahir" @someEvent="callback" :disabled="false"></DatePicker>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.pin" label="PIN" class="mb-input"
                            :error-messages="getMsg('pin')" @change="changeData" :counter="4" :rules="[
                                v => !!v || 'Pin harus diisi',
                                v => v.length <= 4 || 'Pin maximal 4 karakter!',
                            ]"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.password" class="mb-input" label="Password"
                            :error-messages="getMsg('password')" @change="changeData" :counter="4" :rules="[
                                v => !!v || 'Password harus diisi',
                                v => v.length <= 4 || 'Password maximal 4 karakter!',
                            ]"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.password_confirmation" class="mb-input"
                            label="konfirmasi password" @change="changeData" :counter="4" :rules="[
                                v => !!v || 'Konfirmasi password harus diisi',
                                v => v.length <= 4 || 'Konfirmasi password maximal 4 karakter!',
                            ]"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-switch v-model="activation" inset :label="`Aktivasi: ${activation.toString()}`"></v-switch>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block type="submit" v-if="$can('create-user') || $can('update-user')">
                    Submit data
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import DatePicker from '@/components/DatePicker.vue'
import moment from 'moment'
import { mapState, mapActions } from "vuex";
export default {
    props: {
        errors: Array
    },
    components: {
        DatePicker
    },
    data: () => ({
        role: [],
        err: [],
        dept: [],
        valid: false,
        activation: false,
        loading: false,
    }),
    computed: {
        ...mapState("masterdata_user", {
            form: (state) => state.form,
        }),
    },
    mounted() {
        this.attr_form_user().then((res) => {
            this.dept = res.data.depts;
            this.role = res.data.roles;
        });
        this.activation = this.form.activation === 'valid' ? true : false
    },
    watch: {
        errors(e) {
            this.err = e
        }
    },
    methods: {
        ...mapActions("masterdata_user", ["attr_form_user"]),
        ...mapActions("form_permintaan", ["validatePin"]),
        callback(e) {
            this.form.birthdate = e
        },
        changeData() {
            const datapostcek = { pin: this.form.pin, username: this.form.username }
            this.validatePin(datapostcek).then((res) => {
                if (res.data.total > 0) {
                    this.form.pin = ''
                    this.$swal({
                        title: "Error!",
                        text: "PIN Tidak valid, seseorang telah menggunakan pin tersebut, silahkan gunakan pin lain!",
                        icon: "warning",
                    });
                } else {
                    this.form.password = this.form.pin
                    this.form.password_confirmation = this.form.password
                }
            })
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
            const datapost = {
                role_id: this.form.role_id,
                dept_id: this.form.dept_id,
                name: this.form.name,
                nik: this.form.nik,
                pin: this.form.pin,
                email: this.form.email,
                username: this.form.username,
                birthdate: moment(this.form.birthdate).format('YYYY-MM-DD'),
                gender: this.form.gender,
                marital: this.form.marital,
                npwp: this.form.npwp,
                noktp: this.form.noktp,
                address: this.form.address,
                telp: this.form.telp,
                activation: this.form.activation ? 'valid' : 'invalid',
                password: this.form.pin,
                password_confirmation: this.form.pin,
            }
            this.$emit('action', datapost)
            this.loading = false
        },
    }
}
</script>