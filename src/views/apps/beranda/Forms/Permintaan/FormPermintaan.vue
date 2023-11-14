<template>
  <v-container>
    <v-form ref="form" v-model="validform" lazy-validation>
      <v-card class="card">
        <v-card-title class="d-flex justify-center mb-6">
          <h3>Form Permintaan</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col col="12" md="4">
              <v-text-field
                dense
                outlined
                class="mb-input"
                label="Nama"
                v-model="form.user.name"
              ></v-text-field>
            </v-col>
            <v-col col="12" md="4">
              <v-select
                dense
                outlined
                :items="data_divisi"
                item-text="deptname"
                item-value="id"
                label="Divisi"
                class="mb-input"
                v-model="form.user.dept_id"
              ></v-select>
            </v-col>
            <v-col col="12" md="4">
              <v-select
                dense
                outlined
                :items="data_role"
                item-text="rolename"
                item-value="id"
                label="Jabatan"
                class="mb-input"
                v-model="form.user.role_id"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-title>Permintaan</v-card-title>
        <v-card-text>
          <v-checkbox
            v-model="email"
            :label="`Email: ${email ? 'ya' : 'tidak'}`"
          ></v-checkbox>
          <v-text-field
            :disabled="!email"
            dense
            outlined
            class="mb-input"
            label="Alamat email"
            v-model="permintaan[0].detail"
          ></v-text-field>
          <v-checkbox
            v-model="wifi"
            :label="`Wifi: ${wifi ? 'ya' : 'tidak'}`"
          ></v-checkbox>
          <v-container>
            <v-row>
              <v-text-field
                :disabled="!wifi"
                dense
                outlined
                class="mb-input"
                label="Nama lengkap"
                v-model="akseswifi.nama"
              ></v-text-field>
              <v-text-field
                :disabled="!wifi"
                dense
                outlined
                class="mb-input"
                label="Alamat email aktif"
                v-model="akseswifi.email"
              ></v-text-field>
              <v-text-field
                :disabled="!wifi"
                dense
                outlined
                class="mb-input"
                label="Pin"
                v-model="akseswifi.pin"
              ></v-text-field>
            </v-row>
          </v-container>
          <v-checkbox
            v-model="server"
            :label="`Server: ${server ? 'ya' : 'tidak'}`"
          ></v-checkbox>
          <v-text-field
            :disabled="!server"
            dense
            outlined
            class="mb-input"
            label="Keterangan server"
            v-model="permintaan[2].detail"
          ></v-text-field>
        </v-card-text>
        <v-card-title>Permintaan tambahan</v-card-title>
        <v-card-text>
          <v-container>
            <v-row
              no-gutters
              v-for="(item, index) in permintaan.slice(3)"
              :key="index"
            >
              <v-col>
                <v-text-field
                  dense
                  outlined
                  class="mb-input"
                  label="Detail permintaan"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  dense
                  outlined
                  class="mb-input"
                  label="Untuk keperluan ?"
                ></v-text-field>
              </v-col>
              <v-btn class="mx-2" fab dark color="primary" small @click="add()">
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                fab
                dark
                color="error"
                small
                v-if="permintaan.length > 4"
                @click="remove(index)"
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!validform"
            class="rounded-0"
            color="primary"
            :loading="loading"
            x-large
            dark
            @click="submit()"
            >submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    validform: false,
    loading: false,
    data_divisi: [],
    data_role: [],
    email: false,
    wifi: false,
    server: false,
    akseswifi: {
      nama: "",
      email: "",
      pin: "",
    },
    permintaan: [
      { type: "email", detail: "", notes: "" },
      { type: "akses-wifi", detail: "", notes: "" },
      { type: "akses-server", detail: "", notes: "" },
      { type: "lainya", detail: "", notes: "" },
    ],
  }),
  computed: {
    ...mapState("form_permintaan", {
      form: (state) => state.form,
    }),
  },
  created() {
    this.attr_form().then((res) => {
      this.data_divisi = res.data.depts;
      this.data_role = res.data.roles;
    });
  },
  methods: {
    ...mapActions("form_permintaan", ["attr_form", "store"]),
    add() {
      this.permintaan.push({ type: "lainya", detail: "", notes: "" });
    },
    remove(e) {
      this.permintaan.splice(e, 1);
    },
    submit() {
      this.$refs.form.validate();
      this.permintaan[1].detail = this.akseswifi;
      this.form.permintaan = this.permintaan;
      console.log(this.form);
    },
  },
};
</script>
