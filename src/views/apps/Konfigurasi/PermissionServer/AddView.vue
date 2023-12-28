<template>
  <form-view @action="callback" :search="search" :errors="errors" v-if="$can('create-permission')" />
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
    search: null
  }),
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('create-permission'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("permission_server", ["attr_form_user", "store"]),
    callback() {
      this.store().then((e) => {
        if (e.status === true) {
          this.$swal({
            title: "Ditambahkan!",
            text: "Data berhasil ditambahkan.",
            icon: "success",
          });
          this.$router.push({ name: "server-permission.data" });
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
