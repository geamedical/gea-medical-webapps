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
              :error-messages="showErr(errors, 'request.1.detail')" @change="cekpin"></v-text-field>
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
        <v-btn :disabled="!validform" class="rounded-0" color="primary" :loading="loading" x-large dark @click="submit()"
          v-if="$can('update-form-permintaan')">submit</v-btn>
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
      { no: 0, type: "email", detail: "", notes: "", created_at: "", updated_at: "" },
      { no: 1, type: "akses-wifi", detail: "", notes: "", created_at: "", updated_at: "" },
      { no: 2, type: "akses-server", detail: "", notes: "", created_at: "", updated_at: "" },
      { no: 3, type: "lainya", detail: "", notes: "", created_at: "", updated_at: "" },
    ],
    created_at: "",
    updated_at: ""
  }),
  created() {
    if (!this.$can('read-form-permintaan'))
      this.$router.push({ name: "error-401" }).catch(() => true)

    this.attr_form().then((res) => {
      this.data_divisi = res.data.depts;
      this.data_role = res.data.roles;
    });
    this.edit(this.$route.params.id).then((res) => {
      this.user = {
        name: res.data.user.name,
        telp: res.data.user.telp,
        role_id: res.data.user.role_id,
        dept_id: res.data.user.dept_id,
      }
      const arrfilter = ['email', 'akses-wifi', 'akses-server', 'lainya']
      arrfilter.forEach(e => {
        const filteredData = res.data.request.filter(item => item.type === e);
        filteredData.forEach(el => {
          this.setState(el)
        });
      });
    });
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-form-permintaan'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("form_permintaan", ["edit", "update", "attr_form", "validatePin"]),
    showErr(arr, index) {
      const find = arr.find(x => x.field === index)
      return find !== undefined ? find.message : ''
    },
    cekpin() {
      this.validatePin(this.akseswifi.pin).then((res) => {
        console.log(res);
      })
    },
    setState(data) {
      switch (data.type) {
        case 'email':
          this.email = true
          this.permintaan[0] = { no: 0, type: data.type, detail: data.detail, notes: data.notes, created_at: data.created_at, updated_at: data.updated_at }
          break;
        case 'akses-wifi':
          console.log(JSON.parse(data.detail));
          this.wifi = true
          this.permintaan[1] = { no: 0, type: data.type, detail: JSON.parse(data.detail), notes: data.notes, created_at: data.created_at, updated_at: data.updated_at }
          break;
        case 'akses-server':
          this.server = true
          this.permintaan[2] = { no: 0, type: data.type, detail: data.detail, notes: data.notes, created_at: data.created_at, updated_at: data.updated_at }
          break;
        case 'lainya':
          // eslint-disable-next-line no-case-declarations
          let index = this.permintaan.length - 1
          this.permintaan[index] = { no: index, type: data.type, detail: data.detail, notes: data.notes, created_at: data.created_at, updated_at: data.updated_at }
          break;
      }
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
