<template>
  <v-form v-model="valid">
    <v-card color="card" flat>
      <v-card-title>Form Pengguna</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-select
              dense
              outlined
              v-model="form.role_id"
              :items="role"
              item-text="rolename"
              item-value="id"
              label="pilih role user"
              class="mb-input"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              dense
              outlined
              v-model="form.dept_id"
              :items="dept"
              item-text="deptname"
              item-value="id"
              label="pilih departemen user"
              class="mb-input"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              dense
              outlined
              v-model="form.name"
              label="name"
              class="mb-input"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              dense
              outlined
              v-model="form.email"
              label="email"
              class="mb-input"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              type="number"
              dense
              outlined
              v-model="form.nik"
              class="mb-input"
              label="nik"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              dense
              outlined
              v-model="form.password"
              class="mb-input"
              label="Password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              dense
              outlined
              v-model="form.password_confirmation"
              class="mb-input"
              label="konfirmasi password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          depressed
          :loading="loading"
          color="primary"
          block
          :disabled="!valid"
          @click="submit"
        >
          Submit data
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
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
    ...mapState("masterdata_user", {
      form: (state) => state.form,
    }),
  },
  created() {
    this.attr_form_user().then((res) => {
      this.dept = res.data.depts;
      this.role = res.data.roles;
    });
  },
  methods: {
    ...mapActions("masterdata_user", ["attr_form_user", "store"]),
    submit() {
      this.loading = true;
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
        this.$router.push({ name: "master-data-pengguna.data" });
      });
    },
  },
};
</script>
