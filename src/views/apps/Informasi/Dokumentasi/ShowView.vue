<template>
  <div>
    <form-view @action="callback" :id="parseInt($route.params.id)"/>
  </div>
</template>
<script>
import FormView from './FormView'
import { mapActions } from "vuex"
export default {
  components: { FormView },
  methods: {
    ...mapActions("dokumentasi", ["update"]),
    callback(e) {
      this.update(e).then((e)=>{
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
        this.$router.push({ name: "dokumentasi.data" }).catch(() => {})
      })
    },
  },
};
</script>
