<template>
  <v-card flat color="card">
    <v-card-title>Data Dokumentasi</v-card-title>
    <v-card-text>
      <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
        @keyup="filter()"></v-text-field>
      <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading" :expanded.sync="expanded" item-key="id" show-expand>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <h3>{{ item.title }}</h3>
            <div v-html="item.desc"></div>
            <h4>Point</h4>
            <ul>
              <div v-for="i in item.listep" :key="i.id">
                <li>
                  <strong>{{ i.title }}</strong><br />
                  <div v-html="i.desc"></div>
                </li>
              </div>
            </ul>
            <h3>Roudmap Aktifitas</h3>
            <v-breadcrumbs :items="item.map">
              <template v-slot:divider>
                <v-icon>mdi-forward</v-icon>
              </template>
            </v-breadcrumbs>
            <h3>Flowchart</h3>
            <FlowChart :nodes="item.chart" :conns="parseFlow(item.flow)"></FlowChart>
          </td>
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          {{ parseDate(item.created_at) }}
        </template>
        <template v-slot:[`item.desc`]="{ item }">
          <div v-html="item.desc"></div>
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          {{ parseDate(item.updated_at) }}
        </template>
        <template v-slot:[`item.act`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('update-user')">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-role')">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import moment from 'moment'
import FlowChart from '@/components/FlowChart.vue'
export default {
  components: { FlowChart },
  data() {
    return {
      search: "",
      baseUrl: `http://${process.env.BASE_URL_API}/api/images/avatar-users/`,
      totalDesserts: 0,
      expanded: [],
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "JUDUL", value: "title" },
        { text: "KETERANGAN", value: "desc" },
        { text: "DIBUAT", value: "created_at" },
        { text: "DIPERBAHARUI", value: "updated_at" },
        { text: "ACT", value: "act" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    parseDate(e) {
      return moment(e).format("MMMM Do YYYY, h:mm:ss a");
    },
    parseFlow(e) {
      const data = {
        id: e.id,
        documentation_id: e.documentation_id,
        source: '',
        destination: '',
        type: '',
        style: '',
        markerd: '',
        created_at: '',
        updated_at: '',
      }
      console.log(data);
    },
    ...mapActions("dokumentasi", ["index", "edit", "delete"]),
    getDataFromApi() {
      this.loading = true;
      const tableAttr = { options: this.options, search: this.search };
      this.index(tableAttr).then((res) => {
        this.desserts = res.data.data;
        this.totalDesserts = res.data.meta.total;
        this.loading = false;
      });
    },
    filter() {
      this.getDataFromApi();
    },
    setpermission(id) {
      this.$router.push({ path: `/master-data-role/setrole/${id}` });
    },
    editItem(id) {
      this.$router.push({ path: `/master-data-role/show/${id}` });
    },
    deleteItem(id) {
      this.$swal({
        title: "Apakah anda yakin akanmenghapus data ini?",
        text: "Data yang sudah terhapus tidak dapat dikembalikan lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(id).then((e) => {
            if (e.status === true) {
              this.$swal({
                title: "Terhapus!",
                text: "Data berhasil dihapus.",
                icon: "success",
              });
            } else {
              this.$swal({
                title: "Error!",
                text: "Terjadi kesalahan, silahkan hubungi tim IT!",
                icon: "warning",
              });
            }
            this.getDataFromApi();
          });
        }
      });
    },
  },
};
</script>
