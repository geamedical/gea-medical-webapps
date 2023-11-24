<template>
  <div>
    <form-view @action="callback" :id="null"/>
  </div>
</template>
<script>
import FormView from './FormView'
import { mapActions } from "vuex"
export default {
  components: { FormView },
  methods: {
    ...mapActions("dokumentasi", ["store"]),
    callback(e) {
      this.store(e.form).then((e)=>{
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
