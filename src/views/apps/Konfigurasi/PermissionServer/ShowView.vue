<template>
  <form-view @action="callback" :search="search" :errors="errors" v-if="$can('read-permission')" />
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
  created() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('update-permission')) this.$router.push({ name: "error-401" }).catch(() => true)
    }
    this.edit(this.$route.params.id).then((res) => {
      this.search = res.data.user.name
    })
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-permission'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("permission_server", ["edit", "update"]),
    callback() {
      this.update(this.$route.params.id).then((res) => {
        this.loading = false;
        if (res.status === true) {
          this.$swal({
            title: "Diperbaharui!",
            text: "Data berhasil diperbaharui.",
            icon: "success",
          });
          this.$router.push({ name: "server-permission.data" });
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
