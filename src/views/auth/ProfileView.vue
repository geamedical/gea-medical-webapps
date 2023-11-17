<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <v-form>
            <v-card color="card" flat>
                <v-card-title>Form Profile</v-card-title>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-select dense disabled outlined v-model="form.role_id" :items="role" item-text="rolename"
                                item-value="id" label="pilih role user" :rules="[v => !!v || 'Item is required']"
                                class="mt-input"></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select dense disabled outlined v-model="form.dept_id" :items="dept" item-text="deptname"
                                item-value="id" label="pilih departemen user" :rules="[v => !!v || 'Item is required']"
                                class="mt-input"></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.name" label="name" class="mt-input"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.email" label="email" class="mt-input"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" dense disabled outlined v-model="form.nik" class="mt-input"
                                label="nik" :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" dense outlined v-model="form.telp" class="mt-input" label="No. HP"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" dense outlined v-model="form.password" class="mt-input"
                                label="Password" :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.password_confirmation" class="mt-input"
                                label="konfirmasi password" :rules="[v => !!v || 'Item is required']"></v-text-field>
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
import { mapActions, mapState } from "vuex";
export default {
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