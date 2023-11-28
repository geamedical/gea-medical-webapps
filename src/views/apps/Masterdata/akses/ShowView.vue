<template>
  <v-form ref="form" v-model="valid" lazy-validation v-if="$can('read-permission')">
    <v-card flat class="card">
      <v-card-title>Form Privileges</v-card-title>
      <v-card-text>
        <section>
          <v-text-field
            v-model="form.name"
            label="Name"
            outlined
            dense
            color="primary"
            autocomplete="false"
            :rules="[(v) => !!v || 'Item is required']"
          />
        </section>
        <section>
          <v-row>
            <v-col v-for="n in radioGroup" :key="n" cols="12" md="2" sm="12">
              <v-checkbox
                v-model="form.permission"
                :label="`${n}`"
                :value="n"
              ></v-checkbox>
            </v-col>
          </v-row>
        </section>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$can('update-permission')"
          text
          color="primary"
          @click="submit"
        >
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
    radioGroup: ["create", "read", "update", "delete"],
    valid: false,
    loading: false,
  }),
  computed: {
    ...mapState("masterdata_akses", {
      form: (state) => state.form,
    }),
  },
  created() {
    if (!this.$can('read-permission'))
      this.$router.push({ name: "error-401" }).catch(() => true)
    this.edit(this.$route.params.id);
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-permission'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("masterdata_akses", ["edit", "update"]),
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
        this.$router.push({ name: "master-data-akses.data" });
      });
    },
  },
};
</script>
