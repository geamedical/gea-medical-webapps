<template>
  <v-form v-model="valid" v-if="$can('update-role')">
    <v-card color="card" flat>
      <v-card-title>Form Set Role</v-card-title>
      <v-card-text>
        <v-autocomplete dense outlined v-model="formsetrole.role_id" :items="role" item-text="coderole" item-value="id"
          label="pilih role user" :rules="[(v) => !!v || 'Item is required']" class="mb-input"></v-autocomplete>
        <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
          :server-items-length="totalDesserts" :loading="loadingtable" class="elevation-0 mt-5">
          <template v-slot:[`item.name`]="{ item }">
            <strong>{{ item.name.toUpperCase() }}</strong>
          </template>
          <template v-slot:[`item.create`]="{ item }">
            <v-switch inset v-model="formsetrole.permission_id" color="primary"
            :value="item.child[0].id"></v-switch>
          </template>
          <template v-slot:[`item.read`]="{ item }">
            <v-switch inset v-model="formsetrole.permission_id" color="primary"
            :value="item.child[1].id"></v-switch>
          </template>
          <template v-slot:[`item.update`]="{ item }">
            <v-switch inset v-model="formsetrole.permission_id" color="primary"
            :value="item.child[2].id"></v-switch>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-switch inset v-model="formsetrole.permission_id" color="primary"
            :value="item.child[3].id"></v-switch>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" @click="submit">
          Submit data
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    valid: false,
    loading: false,
    role: [],
    search: "",
    totalDesserts: 0,
    desserts: [],
    loadingtable: true,
    options: {},
    headers: [
      { text: "Grup Akses", value: "name" },
      { text: "Create", value: "create" },
      { text: "Read", value: "read" },
      { text: "Update", value: "update" },
      { text: "Delete", value: "delete" },
    ],
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  mounted() {
    if (this.$store.state.auth.permissions.length > 0) {
      if (!this.$can('update-role'))
        this.$router.push({ name: "error-401" }).catch(() => true)
    }
  },
  computed: {
    ...mapState("masterdata_role", {
      formsetrole: (state) => state.formsetrole,
    }),
  },
  created() {
    this.attr_form_user().then((res) => {
      this.role = res.data.roles;
    });
    this.setroleedit(this.$route.params.id);
  },
  methods: {
    ...mapActions("masterdata_user", ["attr_form_user"]),
    ...mapActions("masterdata_role", ["setroleedit", "submitSetRole", "listRolePermission"]),
    ...mapActions("masterdata_akses", ["edit"]),
    getDataFromApi() {
      this.loadingtable = true;
      const tableAttr = { options: this.options, search: this.search };
      this.listRolePermission(tableAttr).then((e) => {
        this.desserts = e.data.data;
        this.totalDesserts = e.data.meta.total;
        this.loadingtable = false;
      });
    },
    submit() {
      this.loading = true;
      this.submitSetRole(this.$route.params.id).then((e) => {
        this.loading = false;
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
        this.$router.push({ name: "master-data-role.data" });
      });
    },
  },
};
</script>
