<template>
  <v-form ref="form" v-model="validform" lazy-validation>
    <v-card class="card">
      <v-card-title class="d-flex justify-center mb-6">
        <h3>Form Permintaan</h3>
      </v-card-title>
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
              class="mb-input" v-model="form.user.dept_id" :error-messages="showErr(errors, 'user.dept_id')"></v-select>
          </v-col>
          <v-col col="12" md="3">
            <v-select dense outlined :items="data_role" item-text="rolename" item-value="id" label="Jabatan"
              class="mb-input" v-model="form.user.role_id" :error-messages="showErr(errors, 'user.role_id')"></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title>Permintaan</v-card-title>
      <v-card-text>
        <v-checkbox v-model="email" :label="`Email: ${email ? 'ya' : 'tidak'}`"></v-checkbox>
        <v-text-field :disabled="!email" dense outlined class="mb-input" label="Alamat email"
          v-model="permintaan[0].detail" :error-messages="showErr(errors, 'request.0.detail')"></v-text-field>
        <v-checkbox v-model="wifi" :label="`Wifi: ${wifi ? 'ya' : 'tidak'}`"></v-checkbox>
        <v-container>
          <v-row>
            <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Nama lengkap" v-model="akseswifi.nama"
              :error-messages="showErr(errors, 'request.1.detail')"></v-text-field>
            <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Alamat email aktif"
              v-model="akseswifi.email" :error-messages="showErr(errors, 'request.1.detail')"></v-text-field>
            <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Pin" v-model="akseswifi.pin"
              :error-messages="showErr(errors, 'request.1.detail')"></v-text-field>
          </v-row>
        </v-container>
        <v-checkbox v-model="server" :label="`Server: ${server ? 'ya' : 'tidak'}`"></v-checkbox>
        <v-text-field :disabled="!server" dense outlined class="mb-input" label="Keterangan server"
          v-model="permintaan[2].detail" :error-messages="showErr(errors, 'request.2.detail')"></v-text-field>
      </v-card-text>
      <v-card-title>Permintaan tambahan</v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters v-for="(item, index) in permintaan.slice(3)" :key="index">
            <v-col>
              <v-text-field dense outlined class="mb-input" label="Detail permintaan"
                v-model="permintaan[permintaan.length - 1].detail"
                :error-messages="showErr(errors, `request.${permintaan.length - 1}.detail`)"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field dense outlined class="mb-input" label="Untuk keperluan ?"
                v-model="permintaan[permintaan.length - 1].notes"
                :error-messages="showErr(errors, `request.${permintaan.length - 1}.notes`)"></v-text-field>
            </v-col>
            <v-btn class="mx-2" fab dark color="primary" small @click="add()">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark color="error" small v-if="permintaan.length > 4" @click="remove(index)">
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!validform" class="rounded-0" color="primary" :loading="loading" x-large dark
          @click="submit()">submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    validform: false,
    loading: false,
    data_divisi: [],
    data_role: [],
    email: false,
    wifi: false,
    server: false,
    errors: [],
    akseswifi: {
      nama: "",
      email: "",
      pin: "",
    },
    permintaan: [
      { type: "email", detail: "", notes: "" },
      { type: "akses-wifi", detail: "", notes: "" },
      { type: "akses-server", detail: "", notes: "" },
      { type: "lainya", detail: "", notes: "" },
    ],
  }),
  computed: {
    ...mapState("form_permintaan", {
      form: (state) => state.form,
    }),
  },
  created() {
    this.edit(this.$route.params.id);
    this.attr_form().then((res) => {
      this.data_divisi = res.data.depts;
      this.data_role = res.data.roles;
    });
  },
  methods: {
    ...mapActions("form_permintaan", ["edit", "update", "attr_form"]),
    add() {
      this.permintaan.push({ type: "lainya", detail: "", notes: "" });
    },
    remove(e) {
      this.permintaan.splice(e, 1);
    },
    showErr(arr, index) {
      const find = arr.find(x => x.field === index)
      return find !== undefined ? find.message : ''
    },
    submit() {
      this.loading = true;
      this.update(this.$route.params.id).then((e) => {
        this.loading = false;
        if (e.status === true) {
          this.$swal({
            title: "Ditambahkan!",
            text: "Data berhasil ditambahkan.",
            icon: "success",
          });
        } else {
          this.$swal({
            title: "Error!",
            text: "Terjadi kesalahan, silahkan hubungi tim IT!",
            icon: "warning",
          });
        }
        this.$router.push({ name: "form-permintaan.data" });
      });
    },
  },
};
</script>
