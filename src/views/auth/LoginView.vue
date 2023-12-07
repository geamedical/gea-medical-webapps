<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card elevation="0" color="card">
          <v-card-title>
            <p class="mt-5">{{ appname }}</p>
            <v-spacer></v-spacer>
            <SwitchMode />
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field label="Tulis Username Anda Disini" name="username" prepend-inner-icon="mdi-account"
                class="rounded-0" outlined placeholder="Username" v-model="form.username"></v-text-field>
              <v-text-field label="Tulis Kata Sandi Anda Disini" name="password" prepend-inner-icon="mdi-lock"
                class="rounded-0" outlined :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass"
                v-model="form.password"></v-text-field>

              <v-card-actions class="text--secondary">
                <v-checkbox color="primary" label="Ingat Saya" v-model="form.remember_me"></v-checkbox>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-btn class="rounded-0" color="primary" :disabled="
                form.email === '' && form.password === '' ? true : false
              " :loading="loading" x-large block dark type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <alert-components :type="alert.type" :title="alert.title" :msg="alert.msg"></alert-components>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SwitchMode from "@/components/SwitchMode.vue";
import AlertComponents from "@/components/AlertComponents.vue";
export default {
  components: {
    SwitchMode,
    AlertComponents,
  },
  data() {
    return {
      appname: "GEA MEDICAL",
      showPass: false,
      loading: false,
      form: {
        username: "",
        password: "",
        remember_me: false,
      },
      alert: {
        type: "",
        title: "",
        msg: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  mounted() {
    if (this.isAuth) {
      const cekRoute = this.$router.currentRoute.meta.requiresAuth;
      if (!cekRoute) this.$router.push({ name: "dashboard" }).catch(() => { })
    }
  },
  methods: {
    ...mapActions("auth", ["submitLogin"]),
    submit() {
      this.loading = true;
      this.submitLogin(this.form).then((res) => {
        this.loading = false;
        if (this.form.remember_me)
          localStorage.setItem("username", this.form.username);
        this.alert = {
          type: res.data.msg === "login error" ? "error" : "success",
          title: res.data.msg,
          msg:
            res.data.msg === "login error"
              ? "Username & password salah !!"
              : "Berhasil.",
        };
        if (res.status === true)
          this.$router.push({ name: "dashboard" }).catch(() => true);
      });
    },
  },
};
</script>
