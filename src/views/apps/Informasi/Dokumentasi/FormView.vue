<template>
    <v-form v-model="valid" @submit.prevent="submit">
        <v-card color="card" flat>
            <v-card-title>Form Dokumentasi</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col col="12" md="12">
                        <v-text-field dense outlined v-model="docinfo.title" label="Judul Dokumentasi" class="mb-input"
                            :rules="[(v) => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col col="12" md="12">
                        <html-editor @callback="callback" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-title class="d-flex justify-space-between">
                Langkah-langkah
                <div>
                    <v-btn class="mx-2" fab dark small color="primary" @click="addlist">
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab dark small color="error" @click="removelist">
                        <v-icon dark>
                            mdi-minus
                        </v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text v-for="i in docinfo.listep" :key="i.id">
                <v-text-field dense outlined v-model="i.title" :label="`Judul Langkah ${i.id}`" class="mb-input"
                    :rules="[(v) => !!v || 'Item is required']"></v-text-field>
                <v-textarea dense outlined v-model="i.desc" :label="`Keterangan ${i.id}`" class="mb-input"
                    :rules="[(v) => !!v || 'Item is required']"></v-textarea>
            </v-card-text>
            <v-card-title class="d-flex justify-space-between">
                Langkah-langkah dalam Roudmap
                <div>
                    <v-btn class="mx-2" fab dark small color="primary" @click="addlistmap">
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab dark small color="error" @click="removelistmap">
                        <v-icon dark>
                            mdi-minus
                        </v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text v-for="i in docinfo.mapstep" :key="i.id">
                <v-row no-gutters>
                    <v-col col="12" md="2">
                        <v-text-field type="number" dense outlined v-model="i.step" :label="`Urutan Langkah ${i.step}`"
                            class="mb-input" :rules="[(v) => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col col="12" md="10">
                        <v-text-field dense outlined v-model="i.title" :label="`Judul Langkah ${i.step}`" class="mb-input"
                            :rules="[(v) => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>Flowchart</v-card-text>
            <v-card-text>
                <FlowChart :nodes="chart" :conns="flow"></FlowChart>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" type="submit">
                    Submit data
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import HtmlEditor from '@/components/HtmlEditor'
import FlowChart from '@/components/FlowChart.vue';
import { mapState } from "vuex";
export default {
    components: { HtmlEditor, FlowChart },
    data: () => ({
        valid: false,
        loading: false,
        docinfo: {
            title: '',
            desc: '',
            listep: [
                {
                    id: 0,
                    title: '',
                    desc: ''
                }
            ],
            mapstep: [
                {
                    id: 1,
                    step: 1,
                    title: ''
                }
            ]
        },
    }),
    computed: {
        ...mapState("dokumentasi", {
            chart: (state) => state.chart,
            flow: (state) => state.flow,
        }),
    },
    methods: {
        callback(text) {
            this.docinfo.desc = text
        },
        addlist() {
            let idset = this.docinfo.listep.length - 1
            this.docinfo.listep.push({
                id: ++idset,
                title: '',
                desc: ''
            })
        },
        removelist() {
            this.docinfo.listep.splice(this.docinfo.listep.length - 1, 1);
        },
        addlistmap() {
            let idset = this.docinfo.mapstep.length
            let set = ++idset
            this.docinfo.mapstep.push({
                id: set,
                step: set,
                title: ''
            })
        },
        removelistmap() {
            this.docinfo.mapstep.splice(this.docinfo.mapstep.length - 1, 1);
        },
        submit() {
            console.log(this.docinfo);
            // this.loading = true;
            // this.$emit('someEvent', 'exec-action')

            // this.store().then((e) => {
            //     this.loading = false;
            //     if (e.status) {
            //         this.$swal({
            //             title: "Ditambahkan!",
            //             text: "Data berhasil ditambahkan.",
            //             icon: "success",
            //         });
            //     } else {
            //         this.$swal({
            //             title: "Error!",
            //             text: "Terjadi kesalahan, silahkan hubungi tim IT!",
            //             icon: "warning",
            //         });
            //     }
            //     this.$router.push({ name: "dokumentasi.data" });
            // });
        },
    },
};
</script>