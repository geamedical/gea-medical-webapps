<template>
    <v-form @submit.prevent="submit">
        <v-card color="card" flat>
            <v-card-title>Form Perizinan Server</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-text-field dense outlined v-model="form.server" label="Nama Server" class="mb-input"
                            :error-messages="getMsg('server')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-autocomplete dense outlined v-model="form.authorization_id" :items="user" item-text="name"
                            :search-input.sync="find" item-value="id" label="pilih user" class="mb-input"
                            :error-messages="getMsg('authorization_id')"></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block type="submit"
                    v-if="$can('create-user') || $can('update-user')">
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
        search: String
    },
    data: () => ({
        find: null,
        err: [],
        user: [],
        valid: false,
        loading: false,
    }),
    computed: {
        ...mapState("permission_server", {
            form: (state) => state.form,
        }),
    },
    mounted() {
        this.getUser()
    },
    watch: {
        errors(e) {
            this.err = e
        },
        search(v) {
            console.log(v);
            if (v !== null) this.find = v
        },
        find(v) {
            if (v !== null) {
                this.getUser();
            }
        },
    },
    methods: {
        ...mapActions("permission_server", ["attr_form_user"]),
        getUser() {
            this.attr_form_user({ search: this.find === null ? '' : this.find }).then((res) => {
                this.user = res.data.data
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