<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
      <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
    </div>
    <v-card class="card" flat>
      <v-alert border="top" colored-border type="info" flat class="card" color="primary">
        <v-row>
          <v-col col="12" md="8">
            <p>
              Jangan pernah malas untuk <i><strong>membaca informasi panduan</strong></i> kami.
            </p>
            <p>
              Kurangnya informasi yang didapat sering kali membuat kerugian, miskomunikasi, <i>human error</i>, dan masih banyak lagi.
            </p>
            <p>
              Jika anda mendapati adanya kekurangan dari informasi panduan ini, jangan sungkan untuk memberikan masukan agar dapat segera ditangani, terimakasih.
            </p>
          </v-col>
          <v-col col="12" md="4">
            <v-img max-height="150" max-width="250" src="@/assets/svg/documentation-info.svg"></v-img>
          </v-col>
        </v-row>
      </v-alert>
      <v-card-title> {{ title }} </v-card-title>
      <v-card-text>
        <div v-html="desc"></div>
        <ul>
          <li v-for="i in listep" :key="i.id">
            <strong>{{ i.title }}</strong><br />
            <p>{{ i.desc }}</p>
          </li>
        </ul>
      </v-card-text>
      <h3>Roudmap Aktifitas {{ title }}</h3>
      <v-breadcrumbs :items="mapstep">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
      <FlowChart :nodes="chart" :conns="flow"></FlowChart>
      <v-card-text>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import FlowChart from '@/components/FlowChart.vue';
import { mapActions } from "vuex";
export default {
  components: {
    FlowChart
  },
  data() {
    return {
      loading: false,
      title: '',
      desc: '',
      listep: [],
      mapstep: [],
      chart: [],
      flow: [],
    }
  },
  mounted() {
    this.show(this.$route.params.id)
  },
  created() {
    this.show(this.$route.params.id)
  },
  watch: {
    "$route.params.id"(id) {
      this.show(id)
    }
  },
  methods: {
    ...mapActions("dokumentasi", ["edit"]),
    show(id) {
      this.edit(id).then((res) => {
        this.title = res.data.title
        this.desc = res.data.desc
        this.listep = res.data.listep
        this.mapstep = res.data.map
        this.chart = res.data.chart
        const dataflow = []
        res.data.flow.forEach(e => {
          dataflow.push({
            id: e.id,
            documentation_id: e.documentation_id,
            source: JSON.parse(e.source),
            destination: JSON.parse(e.destination),
            type: e.type,
            style: JSON.parse(e.style),
            markerd: e.markerd,
          })
        });
        this.flow = dataflow
      })
    }
  }
};
</script>
