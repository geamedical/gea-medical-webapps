<template>
  <div>
    <form-view
      @action="callback"
      :id="parseInt($route.params.id)"
      v-if="$can('read-documentation')"
    />
  </div>
</template>
<script>
import FormView from "./FormView";
import { mapActions } from "vuex";
export default {
  components: { FormView },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can("read-documentation"))
        this.$router.push({ name: "error-401" }).catch(() => true);
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
          this.$router.push({ name: "dokumentasi.data" }).catch(() => {});
        } else {
          var str = "";
          if (e.data.errors !== undefined){
            if (e.data.errors.length > 0) {
              str +='<div>'
              e.data.errors.forEach((obj) => {
                str +=`${obj.message}</br>`
              });
              str +='</div>'
            }else{
              str +='Terjadi kesalahan, silahkan hubungi tim IT!'
            }
          }else{
            str +='Terjadi kesalahan, silahkan hubungi tim IT!'
          }
          this.$swal({
            title: "Error!",
            html: str,
            icon: "warning",
          });
        }
      });
    },
  },
};
</script>
