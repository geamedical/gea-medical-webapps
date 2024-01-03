<template>
  <form-view @action="callback" :errors="errors" :search1="search1" :search2="search2" v-if="$can('create-permission')" />
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
      if (!this.$can('create-nasserver'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  methods: {
    ...mapActions("permission_nas", ["attr_form_user", "store"]),
    callback() {
      this.store().then((e) => {
        if (e.status === 200) {
          this.$swallInfo("Ditambahkan!", "Data berhasil ditambahkan.")
          this.$router.push({ name: "folder-nas-permission.data" });
        } else {
          this.errors = e.data.errors
          this.$swallErrors("Error!", "Terjadi kesalahan, silahkan hubungi tim IT!")
        }
      });
    },
  },
};
</script>
