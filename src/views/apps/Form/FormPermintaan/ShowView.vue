<template>
  <v-form ref="form" v-model="validform" lazy-validation>
    <v-card class="card" flat>
      <v-card-title class="d-flex justify-center mb-6">
        <h3>Form Permintaan</h3>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col col="12" md="3">
            <v-text-field dense outlined class="mb-input" label="Nama" v-model="user.name"
              :error-messages="showErr(errors, 'user.name')" disabled></v-text-field>
          </v-col>
          <v-col col="12" md="3">
            <v-text-field dense outlined class="mb-input" label="HP/WA" v-model="user.telp"
              :error-messages="showErr(errors, 'user.telp')" counter maxlength="13" disabled></v-text-field>
          </v-col>
          <v-col col="12" md="3">
            <v-select dense outlined :items="data_divisi" item-text="deptname" item-value="id" label="Divisi"
              class="mb-input" v-model="user.dept_id" :error-messages="showErr(errors, 'user.dept_id')"
              disabled></v-select>
          </v-col>
          <v-col col="12" md="3">
            <v-select dense outlined :items="data_role" item-text="rolename" item-value="id" label="Jabatan"
              class="mb-input" v-model="user.role_id" :error-messages="showErr(errors, 'user.role_id')"
              disabled></v-select>
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
import { mapActions } from "vuex";
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
    form: [],
    user: {
      name: '',
      telp: '',
      role_id: '',
      dept_id: '',
    },
    permintaan: [
      { type: "email", detail: "", notes: "", created_at: "", updated_at: "" },
      { type: "akses-wifi", detail: "", notes: "", created_at: "", updated_at: "" },
      { type: "akses-server", detail: "", notes: "", created_at: "", updated_at: "" },
      { type: "lainya", detail: "", notes: "", created_at: "", updated_at: "" },
    ],
    created_at: "",
    updated_at: ""
  }),
  created() {
    this.attr_form().then((res) => {
      this.data_divisi = res.data.depts;
      this.data_role = res.data.roles;
    });
    this.edit(this.$route.params.id).then((res) => {
      this.form = res.data
      const arr = this.form
      this.user = {
        name: arr.user.name,
        telp: arr.user.telp,
        role_id: arr.user.role_id,
        dept_id: arr.user.dept_id,
      }
      const e = arr.request.findIndex((i) => i.type == "email")
      const f = arr.request.findIndex((i) => i.type == "akses-wifi")
      const s = arr.request.findIndex((i) => i.type == "akses-server")
      const l = arr.request.findIndex((i) => i.type == "lainya")
      const req = arr.request
      const fwifi = JSON.parse(req[f].detail)
      this.akseswifi = {
        nama: fwifi.nama,
        email: fwifi.email,
        pin: fwifi.pin,
      }
      this.permintaan[0].detail = req[e].detail
      this.permintaan[0].created_at = req[e].created_at
      this.permintaan[0].updated_at = req[e].updated_at

      this.permintaan[1].detail = JSON.stringify(this.akseswifi)
      this.permintaan[1].created_at = req[f].created_at
      this.permintaan[1].updated_at = req[f].updated_at

      this.permintaan[2].detail = req[s].detail
      this.permintaan[2].created_at = req[s].created_at
      this.permintaan[2].updated_at = req[s].updated_at

      this.permintaan[3].detail = req[l].detail
      this.permintaan[3].notes = req[l].notes
      this.permintaan[3].created_at = req[l].created_at
      this.permintaan[3].updated_at = req[l].updated_at
      this.created_at = req[l].created_at
      this.updated_at = req[l].updated_at
    });
  },
  methods: {
    ...mapActions("form_permintaan", ["edit", "update", "attr_form"]),
    showErr(arr, index) {
      const find = arr.find(x => x.field === index)
      return find !== undefined ? find.message : ''
    },
    submit() {
      this.loading = true;
      let payload = {
        id: this.$route.params.id, form: {
          user: this.user,
          request: this.permintaan
        }
      }
      this.update(payload).then((e) => {
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
