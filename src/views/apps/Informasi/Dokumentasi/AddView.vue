<template>
  <div>
    <form-view @action="callback" :id="null" v-if="$can('create-documentation')" />
  </div>
</template>
<script>
import FormView from './FormView'
import { mapActions } from "vuex"
export default {
  components: { FormView },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('create-documentation'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("dokumentasi", ["store"]),
    callback(e) {
      this.store(e.form).then((e) => {
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
        this.$router.push({ name: "dokumentasi.data" });
      })
    },
  },
};
</script>
