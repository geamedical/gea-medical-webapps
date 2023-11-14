<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card flat class="card">
      <v-card-title>Form masterdata departemen</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <v-text-field
              dense
              outlined
              v-model="form.deptname"
              label="nama departemen"
              class="mb-input"
              :rules="[(v) => !!v || 'Item is required']"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="$can('create-dept')" text color="primary" @click="submit">
          Submit
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <div class="d-flex justify-center mt-5">
          <alert-components
            :type="alert.type"
            :title="alert.title"
            :msg="alert.msg"
          ></alert-components>
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import AlertComponents from "@/components/AlertComponents.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    AlertComponents,
  },
  data: () => ({
    valid: false,
    loading: false,
  }),
  computed: {
    ...mapState("masterdata_dept", {
      form: (state) => state.form,
    }),
  },
  methods: {
    ...mapActions("masterdata_dept", ["store"]),
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
        this.$router.push({ name: "master-data-dept.data" });
      });
    },
  },
};
</script>
