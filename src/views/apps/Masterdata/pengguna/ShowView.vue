<template>
  <v-form v-model="valid">
    <v-card color="card" flat>
      <v-card-title>Form Pengguna</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-select dense outlined v-model="form.role_id" :items="role" item-text="rolename" item-value="id"
              label="pilih role user" class="mb-input"></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select dense outlined v-model="form.dept_id" :items="dept" item-text="deptname" item-value="id"
              label="pilih departemen user" class="mb-input"></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field dense outlined v-model="form.username" label="Username" class="mb-input"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field dense outlined v-model="form.name" label="Nama Lengkap" class="mb-input"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field dense outlined v-model="form.email" label="Alamat Email" class="mb-input"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field type="number" dense outlined v-model="form.nik" class="mb-input" label="nik"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.npwp" class="mb-input" label="No. NPWP"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.noktp" class="mb-input" label="No. KTP"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.telp" class="mb-input" label="No. Ponsel"></v-text-field>
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
            <v-textarea name="address" dense outlined label="Alamat tempat tinggal" auto-grow class="mb-input"
              :value="form.address" v-model="form.address"></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <DatePicker label="Tgl. Lahir" @someEvent="callback" :disabled="false"></DatePicker>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.password" class="mb-input" label="Password"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.password_confirmation" class="mb-input"
              label="konfirmasi password"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-switch v-model="form.activation" inset :label="`Aktivasi: ${form.activation?'Aktif':'Tidak Aktif'}`"></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" @click="submit">
          Submit data
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
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
    ...mapState("masterdata_user", {
      form: (state) => state.form,
    }),
  },
  created() {
    this.attr_form_user().then((res) => {
      this.dept = res.data.depts;
      this.role = res.data.roles;
    });
    this.edit(this.$route.params.id);
  },
  methods: {
    ...mapActions("masterdata_user", ["attr_form_user", "edit", "update"]),
    callback(e) {
      this.form.birthdate = e
    },
    submit() {
      this.loading = true;
      this.update(this.$route.params.id).then((e) => {
        this.loading = false;
        if (e.status === true) {
          this.$swal({
            title: "Diperbaharui!",
            text: "Data berhasil diperbaharui.",
            icon: "success",
          });
        } else {
          this.$swal({
            title: "Error!",
            text: "Terjadi kesalahan, silahkan hubungi tim IT!",
            icon: "warning",
          });
        }
        this.$router.push({ name: "master-data-pengguna.data" });
      });
    },
  },
};
</script>
