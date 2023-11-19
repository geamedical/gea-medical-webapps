<template>
  <v-form v-model="valid">
    <v-card color="card" flat>
      <v-card-title>Form Role</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col col="12" md="3">
            <v-text-field dense outlined v-model="form.company" label="Inisial Group Perusahaan" class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"></v-text-field>
          </v-col>
          <v-col col="12" md="3">
            <v-text-field dense outlined v-model="form.code" label="Kode" class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"></v-text-field>
          </v-col>
          <v-col col="12" md="3">
            <v-text-field dense outlined v-model="form.rolename" label="Nama Role/Jabatan" class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"></v-text-field>
          </v-col>
          <v-col col="12" md="3">
            <v-text-field dense outlined v-model="form.coderole" label="Kode-Role" class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"></v-text-field>
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
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    baseUrl: `http://${process.env.BASE_URL_API}/api/images/avatar-users/`,
    valid: false,
    loading: false,
    alert: {
      type: "",
      title: "",
      msg: [],
    },
  }),
  computed: {
    ...mapState("masterdata_role", {
      form: (state) => state.form,
    }),
  },
  created() {
    this.edit(this.$route.params.id);
  },
  methods: {
    ...mapActions("masterdata_role", ["edit", "update"]),
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
        this.$router.push({ name: "master-data-role.data" });
      });
    },
  },
};
</script>
