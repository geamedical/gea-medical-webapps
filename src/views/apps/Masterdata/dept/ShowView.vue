<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card flat class="card">
      <v-card-title>Form masterdata departemen</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.company" label="Inisial Perusahaan" class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.code" label="Kode Departemen" class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field dense outlined v-model="form.deptname" label="nama departemen" class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="$can('update-departement')" text color="primary" @click="submit">
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
    valid: false,
    loading: false,
  }),
  computed: {
    ...mapState("masterdata_dept", {
      form: (state) => state.form,
    }),
  },
  created() {
    if (!this.$can('read-departement'))
      this.$router.push({ name: "error-401" }).catch(() => true)
    this.edit(this.$route.params.id);
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-departement'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("masterdata_dept", ["edit", "update"]),
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
        this.$router.push({ name: "master-data-dept.data" });
      });
    },
  },
};
</script>
