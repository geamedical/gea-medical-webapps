<template>
  <form-view @action="callback" :errors="errors" v-if="$can('read-user')" />
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
  created() {
    if (!this.$can('update-user'))
      this.$router.push({ name: "error-401" }).catch(() => true)
    this.edit(this.$route.params.id);
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-user'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("masterdata_user", ["edit", "update"]),
    callback(e) {
      this.update({ id: this.$route.params.id, data: e }).then((res) => {
        this.loading = false;
        if (res.status === true) {
          this.$swal({
            title: "Diperbaharui!",
            text: "Data berhasil diperbaharui.",
            icon: "success",
          });
          this.$router.push({ name: "master-data-pengguna.data" });
        } else {
          this.errors = res.data.errors
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
