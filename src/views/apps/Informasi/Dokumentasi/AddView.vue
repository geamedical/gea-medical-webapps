<template>
  <div>
    <form-view />
  </div>
</template>
<script>
import FormView from './FormView'
import { mapActions } from "vuex"
export default {
  components: { FormView },
  methods: {
    ...mapActions("dokumentasi", ["store"]),
  },
};
</script>
