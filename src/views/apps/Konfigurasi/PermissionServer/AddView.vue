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
      if (!this.$can('create-server'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("permission_server", ["attr_form_user", "store"]),
    callback() {
      this.store().then((e) => {
        console.log(e.status);
        if (e.status === 200) {
          this.$swallInfo("Ditambahkan!", "Data berhasil ditambahkan.")
          this.$router.push({ name: "server-permission.data" });
        } else {
          this.errors = e.data.errors
          this.$swallErrors("Error!", "Terjadi kesalahan, silahkan hubungi tim IT!")
        }
      });
    },
  },
};
</script>
