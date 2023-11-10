<template>
  <v-form v-model="valid">
    <v-card color="card" flat>
      <v-card-title>Form Role</v-card-title>
      <v-card-text>
        <v-text-field
          dense
          outlined
          v-model="form.rolename"
          label="name"
          class="mb-input"
          :rules="[(v) => !!v || 'Item is required']"
        ></v-text-field>
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
    valid: false,
    loading: false,
  }),
  computed: {
    ...mapState("masterdata_role", {
      form: (state) => state.form,
    }),
  },
  methods: {
    ...mapActions("masterdata_role", ["store"]),
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
        this.$router.push({ name: "master-data-role.data" });
      });
    },
  },
};
</script>
