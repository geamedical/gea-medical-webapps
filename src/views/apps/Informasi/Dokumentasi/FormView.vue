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
                        <html-editor @event="setdesc" :data="docinfo.desc" />
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
            <v-card-text>
                <div v-for="i in docinfo.listep" :key="i.id">
                    <v-text-field dense outlined v-model="i.title" :label="`Judul Langkah ${i.id}`" class="mb-input"
                        :rules="[(v) => !!v || 'Item is required']"></v-text-field>
                    <v-textarea dense outlined v-model="i.desc" :label="`Keterangan ${i.id}`" class="mb-input"
                        :rules="[(v) => !!v || 'Item is required']"></v-textarea>
                </div>
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
            <v-card-text>
                <v-row no-gutters v-for="index in docinfo.mapstep" :key="index.id">
                    <v-col col="12" md="2">
                        <v-text-field type="number" dense outlined v-model="index.step"
                            :label="`Urutan Langkah ${index.step}`" class="mb-input"
                            :rules="[(v) => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col col="12" md="10">
                        <v-text-field dense outlined v-model="index.text" :label="`Judul Langkah ${index.step}`"
                            class="mb-input" :rules="[(v) => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>Flowchart</v-card-text>
            <v-card-text>
                <FlowChart :nodes="chart" :conns="flow"></FlowChart>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" type="submit"
                    v-if="$can('create-documentation') || $can('update-documentation')">
                    Submit data
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import HtmlEditor from '@/components/HtmlEditor'
import FlowChart from '@/components/FlowChart.vue';
import { mapState, mapActions } from "vuex";
export default {
    components: { HtmlEditor, FlowChart },
    props: {
        id: Number
    },
    mounted() {
        if (this.id !== null) {
            this.edit(this.id).then((res) => {
                this.docinfo.title = res.data.title
                this.docinfo.desc = res.data.desc
                this.docinfo.listep = res.data.listep
                this.docinfo.mapstep = res.data.map
            })
        }
    },
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
                    id: 0,
                    step: 1,
                    text: ''
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
        ...mapActions("dokumentasi", ["edit"]),
        enc(text) {
            return this.$CryptoJS.AES.encrypt(text).toString()
        },
        setdesc(text) {
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
            let idset = this.docinfo.mapstep.length - 1
            this.docinfo.mapstep.push({
                id: ++idset,
                step: ++idset,
                text: ''
            })
        },
        removelistmap() {
            this.docinfo.mapstep.splice(this.docinfo.mapstep.length - 1, 1);
        },
        submit() {
            const datapost = {
                form: {
                    title: this.docinfo.title,
                    desc: this.docinfo.desc,
                    listep: this.docinfo.listep,
                    mapstep: this.docinfo.mapstep,
                    flowchart: {
                        chart: this.chart,
                        flow: this.flow
                    }
                }
            }
            if (this.id !== null)
                datapost['id'] = this.id
            this.loading = true;
            this.$emit('action', datapost)
            this.loading = false;
        },
    },
};
</script>