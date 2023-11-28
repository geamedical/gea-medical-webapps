<template>
  <v-form ref="form" v-model="validform" lazy-validation v-if="$can('create-form-permintaan')">
    <v-card flat class="card">
      <v-card-title>Form Permintaan</v-card-title>
      <v-card-text>
        <v-row>
          <v-col col="12" md="3">
            <v-text-field dense outlined class="mb-input" label="Nama" v-model="form.user.name"
              :error-messages="showErr(errors, 'user.name')" disabled></v-text-field>
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
      </v-card-text>
      <v-card-title>Permintaan</v-card-title>
      <v-card-text>
        <v-checkbox v-model="email" :label="`Email: ${email ? 'ya' : 'tidak'}`"></v-checkbox>
        <v-text-field :disabled="!email" dense outlined class="mb-input" label="Alamat email"
          v-model="permintaan[0].detail" :error-messages="showErr(errors, 'request.0.detail')" :rules="[
            v => !!v || 'E-mail harus diisi!',
            v => /.+@.+/.test(v) || 'E-mail tidak valid!',
          ]"></v-text-field>
        <v-checkbox v-model="wifi" :label="`Wifi: ${wifi ? 'ya' : 'tidak'}`"
          v-if="this.authenticated.pin === '' || this.authenticated.pin === null"></v-checkbox>
        <v-container v-if="this.authenticated.pin === '' || this.authenticated.pin === null">
          <v-row>
            <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Nama lengkap" v-model="akseswifi.nama"
              :error-messages="showErr(errors, 'request.1.detail')" :rules="[
                v => !!v || 'Nama lengkap harus diisi!',
              ]"></v-text-field>
            <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Alamat email aktif"
              v-model="akseswifi.email" :error-messages="showErr(errors, 'request.1.detail')" :rules="[
                v => !!v || 'E-mail harus diisi!',
                v => /.+@.+/.test(v) || 'E-mail tidak valid!',
              ]"></v-text-field>
            <v-text-field :disabled="!wifi" dense outlined class="mb-input" label="Pin" v-model="akseswifi.pin"
              :error-messages="showErr(errors, 'request.1.detail')" :counter="4" :rules="[
                v => !!v || 'Pin harus diisi',
                v => v.length <= 4 || 'Pin maximal 4 karakter!',
              ]" @change="cekpin"></v-text-field>
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
              <v-text-field dense outlined class="mb-input" label="Detail permintaan" v-model="item.detail"
                :error-messages="showErr(errors, `request.${permintaan.length - 1}.detail`)"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field dense outlined class="mb-input" label="Untuk keperluan ?" v-model="item.notes"
                :error-messages="showErr(errors, `request.${permintaan.length - 1}.notes`)"></v-text-field>
            </v-col>
            <v-btn class="mx-2" fab dark color="primary" small @click="add()">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark color="error" small v-if="permintaan.length > 4" @click="remove(item.no)">
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
      { no: 0, type: "email", detail: "", notes: "" },
      { no: 1, type: "akses-wifi", detail: "", notes: "" },
      { no: 2, type: "akses-server", detail: "", notes: "" },
      { no: 3, type: "lainya", detail: "", notes: "" },
    ],
  }),
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
    this.form.user = {
      name: this.authenticated.name,
      telp: this.authenticated.telp,
      role_id: this.authenticated.role_id,
      dept_id: this.authenticated.dept_id,
    }
  },
  methods: {
    ...mapActions("form_permintaan", ["store", "attr_form", "validatePin"]),
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
      this.permintaan.push({ no: noset, type: "lainya", detail: "", notes: "" });
    },
    remove(e) {
      console.log(e);
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
      if (this.wifi) {
        if (this.akseswifi.email !== '' && this.akseswifi.pin !== '')
          this.permintaan[1].detail = JSON.stringify(this.akseswifi);
      }
      const filteredData = this.permintaan.filter(i => i.detail != '' || i.notes != '');
      this.form.request = filteredData;
      this.store().then((e) => {
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
