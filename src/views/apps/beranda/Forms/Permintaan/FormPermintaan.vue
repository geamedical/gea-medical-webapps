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
                v-model="message4"
                label="Nama"
                outlined
                dense
                clearable
              ></v-text-field>
            </v-col>
            <v-col col="12" md="4">
              <v-text-field
                v-model="message4"
                label="Divisi"
                outlined
                dense
                clearable
              ></v-text-field>
            </v-col>
            <v-col col="12" md="4">
              <v-text-field
                v-model="message4"
                label="Jabatan"
                outlined
                dense
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-title>Permintaan</v-card-title>
        <v-card-text>
          <v-checkbox
            v-model="form.checkboxMail"
            :label="`Apakah anda membutuhkan email?: ${
              form.checkboxMail ? 'Ya, butuh' : 'Tidak'
            }`"
          ></v-checkbox>
          <v-text-field
            v-if="form.checkboxMail"
            v-model="message4"
            label="Alamat email"
            outlined
            dense
            clearable
          ></v-text-field>
          <v-checkbox
            v-model="form.checkboxWifi"
            :label="`Apakah anda membutuhkan akses wifi?: ${
              form.checkboxWifi ? 'Ya, butuh' : 'Tidak'
            }`"
          ></v-checkbox>
          <v-row v-if="form.checkboxWifi">
            <v-col>
              <v-text-field
                v-model="message4"
                label="Nama lengkap"
                outlined
                dense
                clearable
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="message4"
                label="Alamat email aktif"
                outlined
                dense
                clearable
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="message4"
                label="Pin"
                outlined
                dense
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-checkbox
            v-model="form.checkboxServer"
            :label="`Apakah anda membutuhkan akses server?: ${
              form.checkboxServer ? 'Ya, butuh' : 'Tidak'
            }`"
          ></v-checkbox>
          <v-text-field
            v-if="form.checkboxServer"
            v-model="message4"
            label="Catatan permintaan akses server"
            outlined
            dense
            clearable
          ></v-text-field>
        </v-card-text>
        <v-card-title>Permintaan tambahan</v-card-title>
        <v-card-text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum iusto, fuga atque odio nihil fugit ab delectus. Hic, praesentium! Ex officiis voluptatem, voluptas minus qui consectetur atque dolore veritatis ipsam!
        </v-card-text>
        <v-card-title>Untuk keperluan</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aspernatur excepturi eum doloremque maxime, reiciendis veniam doloribus cupiditate nobis voluptate temporibus, quos dolor, pariatur officiis ratione. Facilis totam eveniet illo?
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
export default {
  data: () => ({
    validform: false,
    loading: false,
    form: {
      checkboxMail: false,
      checkboxWifi: false,
      checkboxServer: false,
    },
  }),
  methods: {
    submit() {
      this.$refs.form.validate();
    },
  },
};
</script>
