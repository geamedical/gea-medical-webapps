<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
      <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
    </div>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="4">
        <v-card flat color="card" rounded v-if="$can(item.authorization)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-subtitle>{{ item.artist }}</v-card-subtitle>
              <v-card-actions>
                <v-btn class="ml-2 mt-2" outlined rounded small :to="item.link">
                  periksa
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar color="bg" size="70" class="mt-5 mr-5">
              <v-icon class="ma-5" size="30" tile :color="item.color">
                {{ item.src }}
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-card flat class="mt-5" color="card">
      <v-card-text>
        <apexchart type="bar" :options="options" :series="series"></apexchart>
      </v-card-text>
    </v-card> -->
    <!-- <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="mt-5" color="card">
          <v-card-text>
            <apexchart type="donut" :options="optionsDonuts" :series="optionsDonuts.series"></apexchart>
          </v-card-text>
        </v-card>
        <v-card flat class="mt-5" color="card">
          <v-card-text>
            <apexchart type="area" :options="options" :series="series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat class="mt-5" color="card">
          <v-card-text>
            <apexchart type="line" :options="options" :series="series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      items: [
        {
          color: 'primary',
          src: 'mdi-account-group',
          title: 'Pengguna',
          artist: 'Daftar data pengguna',
          link:'/master-data-pengguna',
          authorization:'read-user'
        },
        {
          color: 'error',
          src: 'mdi-microsoft-teams',
          title: 'Departemen',
          artist: 'Daftar data pengguna',
          link:'/master-data-dept',
          authorization:'read-departement'
        },
        {
          color: 'accent',
          src: 'mdi-lightbulb-group-outline',
          title: 'Role',
          artist: 'Daftar data role',
          link:'/master-data-role',
          authorization:'read-role'
        },
        {
          color: 'secondary',
          src: 'mdi-security',
          title: 'Akses menu',
          artist: 'Daftar data akses menu',
          link:'/master-data-akses',
          authorization:'read-permission'
        },
        {
          color: 'accent',
          src: 'mdi-frequently-asked-questions',
          title: 'Permintaan',
          artist: 'Daftar data permintaan',
          link:'/form-permintaan',
          authorization:'read-form-permintaan'
        },
        {
          color: 'error',
          src: 'mdi-television-guide',
          title: 'Informasi',
          artist: 'Daftar informasi/panduan',
          link:'/dokumentasi',
          authorization:'read-documentation'
        },
        {
          color: 'accent',
          src: 'mdi-server-security',
          title: 'NAS Server',
          artist: 'Daftar permintaan NAS Server',
          link:'/permintaan-folder-nas',
          authorization:'read-permission'
        },
        {
          color: 'error',
          src: 'mdi-server',
          title: 'Akses Server',
          artist: 'Daftar permintaan Akses Server',
          link:'/permintaan-server',
          authorization:'read-permission'
        },
        {
          color: 'primary',
          src: 'mdi-script-text-key',
          title: 'Perizinan Akses',
          artist: 'Daftar Perizinan Akses Server',
          link:'/server-permission',
          authorization:'read-permission'
        },
      ],
      // optionsDonuts: {
      //   series: [44, 55, 13, 33],
      //   labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
      // },
      // options: {
      //   chart: {
      //     foreColor: '#ccc',
      //     toolbar: {
      //       show: false
      //     },
      //   },
      //   stroke: {
      //     width: 3
      //   },
      //   dataLabels: {
      //     enabled: false
      //   },
      //   tooltip: {
      //     theme: (this.$vuetify.theme.dark) ? 'dark' : 'light'
      //   },
      //   grid: {
      //     borderColor: "#535A6C",
      //     xaxis: {
      //       lines: {
      //         show: true
      //       }
      //     }
      //   },
      //   xaxis: {
      //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      //   }
      // },
      // series: [{
      //   name: 'series-1',
      //   data: [30, 40, 45, 50, 49, 60, 70, 91]
      // }]
    }
  },
}
</script>
