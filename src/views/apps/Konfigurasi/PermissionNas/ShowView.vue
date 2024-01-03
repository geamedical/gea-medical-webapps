<template>
  <form-view @action="callback" :errors="errors" :search1="search1" :search2="search2" v-if="$can('read-permission')" />
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
    search1: '',
    search2: ''
  }),
  created() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('update-nasserver')) this.$router.push({ name: "error-401" }).catch(() => true)
    }
    this.edit(this.$route.params.id).then((res) => {
      this.search1 = res.data.user_primary.name
      this.search2 = res.data.user_secondary.name
    });
  },
  methods: {
    ...mapActions("permission_nas", ["edit", "update"]),
    callback() {
      this.update(this.$route.params.id).then((res) => {
        this.loading = false;
        if (res.status === true) {
          this.$swal({
            title: "Diperbaharui!",
            text: "Data berhasil diperbaharui.",
            icon: "success",
          });
          this.$router.push({ name: "folder-nas-permission.data" });
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
