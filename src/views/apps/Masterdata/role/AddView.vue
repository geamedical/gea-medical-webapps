<template>
  <v-form v-model="valid" v-if="$can('create-role')">
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
    valid: false,
    loading: false,
  }),
  computed: {
    ...mapState("masterdata_role", {
      form: (state) => state.form,
    }),
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('create-role'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("masterdata_role", ["store"]),
    submit() {
      this.loading = true;
      this.store().then((e) => {
        this.loading = false;
        if (e.status) {
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
        this.$router.push({ name: "master-data-role.data" });
      });
    },
  },
};
</script>
