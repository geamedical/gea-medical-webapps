<template>
  <form-view @action="callback" :errors="errors" :request="request" v-if="$can('create-form-permintaan')" />
</template>
<script>
import { mapActions } from "vuex";
import FormView from './FormView.vue'
export default {
  components:{
    FormView
  },
  data: () => ({
    errors: [],
    request: [],
  }),
  methods: {
    ...mapActions("form_permintaan", ["store"]),
    callback() {
      this.store().then((e) => {
        this.loading = false;
        if (e.status === 200) {
          this.$swal({
            title: "Ditambahkan!",
            text: "Data berhasil ditambahkan.",
            icon: "success",
          });
          this.$router.push({ name: "form-permintaan.data" });
        } else {
          this.errors = e.data.errors
          var txt = '<div>'
          e.data.errors.forEach(e => {
            txt += `${e.message}</br>`
          });
          // eslint-disable-next-line no-unused-vars
          txt += '</div>'
          this.$swal({
            title: "Error!",
            html: txt,
            icon: "warning",
          });
        }
      });
    },
  },
};
</script>
