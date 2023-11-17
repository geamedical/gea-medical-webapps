<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
      <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
    </div>
    <data-pengguna v-if="$route.params.data === 'data-pengguna'" />
    <form-permintaan v-if="$route.params.data === 'form-permintaan'" />
    <profile-view v-if="$route.params.data === 'profile'" />
    <errors-report v-if="$route.params.data === 'error-reporting'" />
  </v-container>
</template>
<script>
import DataPengguna from "./panduan/DataPengguna.vue";
import FormPermintaan from "./panduan/FormPermintaan.vue";
import ErrorsReport from "./panduan/ErrorsReport.vue";
import ProfileView from "./panduan/ProfileView.vue";
export default {
  components: {
    DataPengguna,
    FormPermintaan,
    ErrorsReport,
    ProfileView
  },
};
</script>
