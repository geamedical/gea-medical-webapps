<template>
  <form-view @action="callback" :errors="errors" :request="request" v-if="$can('create-form-permintaan')" />
</template>
<script>
import { mapActions, mapState } from "vuex";
import FormView from './FormView.vue'
export default {
  components: {
    FormView
  },
  data: () => ({
    errors: [],
    request: [],
  }),
  created() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-form-permintaan'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
    this.showData()
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('read-form-permintaan'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
    this.showData()
  },
  computed: {
    ...mapState("form_permintaan", {
      form: (state) => state.form,
    }),
  },
  methods: {
    ...mapActions("form_permintaan", ["edit", "update", "attr_form", "validatePin"]),
    showData() {
      this.edit(this.$route.params.id).then((res) => {
        this.form.user = {
          name: res.data.user.name,
          telp: res.data.user.telp,
          role_id: res.data.user.role_id,
          dept_id: res.data.user.dept_id,
        }
        this.request = res.data.request
      });
    },
    callback() {
      this.loading = true;
      let payload = {
        id: this.$route.params.id,
        form: this.form
      }
      this.update(payload).then((e) => {
        this.loading = false;
        if (e.status === true) {
          this.$swal({
            title: "Ditambahkan!",
            text: "Data berhasil ditambahkan.",
            icon: "success",
          });
          this.$router.push({ name: "form-permintaan.data" });
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
