<template>
  <div>
    <form-view @action="callback" :id="parseInt($route.params.id)" v-if="$can('read-documentation')" />
  </div>
</template>
<script>
import FormView from './FormView'
import { mapActions } from "vuex"
export default {
  components: { FormView },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-documentation'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("dokumentasi", ["update"]),
    callback(e) {
      this.update(e).then((e) => {
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
        this.$router.push({ name: "dokumentasi.data" }).catch(() => { })
      })
    },
  },
};
</script>
