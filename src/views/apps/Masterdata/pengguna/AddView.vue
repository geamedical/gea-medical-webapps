<template>
  <form-view @action="callback" :errors="errors" v-if="$can('create-user')" />
</template>
<script>
import FormView from './FormView.vue'
import { mapActions } from "vuex";
export default {
  components: {
    FormView
  },
  data: () => ({
    errors: [],
  }),
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('create-user'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("masterdata_user", ["attr_form_user", "store"]),
    callback(e) {
      this.store(e).then((e) => {
        if (e.status === true) {
          this.$swal({
            title: "Ditambahkan!",
            text: "Data berhasil ditambahkan.",
            icon: "success",
          });
          this.$router.push({ name: "master-data-pengguna.data" });
        } else {
          this.errors = e.data.errors
          this.$swal({
            title: "Error!",
            text: "Terjadi kesalahan, silahkan hubungi tim IT!",
            icon: "warning",
          });
        }
      });
    },
  },
};
</script>
