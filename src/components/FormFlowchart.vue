<template>
    <v-container>
        <v-card flat class="card">
            <v-card-title>Form Chart</v-card-title>
            <v-card-text v-for="i in chart" :key="i.id">
                <v-row no-gutters>
                    <v-col col="12" md="6">
                        <v-text-field type="number" dense outlined class="mb-input" label="X" v-model="i.x"></v-text-field>
                    </v-col>
                    <v-col col="12" md="6">
                        <v-text-field type="number" dense outlined class="mb-input" label="Y" v-model="i.y"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col col="12" md="6">
                        <v-text-field type="number" dense outlined class="mb-input" label="Width"
                            v-model="i.width"></v-text-field>
                    </v-col>
                    <v-col col="12" md="6">
                        <v-text-field type="number" dense outlined class="mb-input" label="Height"
                            v-model="i.height"></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field dense outlined class="mb-input" label="Nama" v-model="i.name"></v-text-field>
                <v-select dense outlined :items="['input', 'output', 'io']" label="Type" class="mb-input"
                    v-model="i.type"></v-select>
                <v-select dense outlined :items="['rect']" label="Shape" class="mb-input" v-model="i.shape"></v-select>
            </v-card-text>
            <v-card-actions>
                <v-btn class="ma-2" text icon color="primary" @click="addChart">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn class="ma-2" text icon color="error" @click="delChart" :disabled="chart.length > 1 ? false : true">
                    <v-icon>mdi-delete-circle</v-icon>
                </v-btn>
                <v-btn class="ma-2" text icon color="secondary">
                    <v-icon>mdi-content-save-check</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card flat class="card">
            <v-card-title>Set Flow</v-card-title>
            <v-card-text v-for="i in flow" :key="i.id">
                <v-select dense outlined :items="chart" item-text="name" item-value="id" label="Source" class="mb-input"
                    v-model="i.source.id"></v-select>
                <v-select dense outlined :items="['left', 'right', 'top', 'button']" item-text="name" item-value="id"
                    label="Source" class="mb-input" v-model="i.source.position"></v-select>
                <v-select dense outlined :items="chart" item-text="name" item-value="id" label="Destination"
                    class="mb-input" v-model="i.destination.id"></v-select>
                <v-select dense outlined :items="['left', 'right', 'top', 'button']" item-text="name" item-value="id"
                    label="Source" class="mb-input" v-model="i.destination.position"></v-select>
                <v-select dense outlined :items="['step', 'bezier']" label="Type" class="mb-input"
                    v-model="i.type"></v-select>
                <v-select dense outlined :items="['arrowclosed', 'arrow']" label="Marker" class="mb-input"
                    v-model="i.markerEnd"></v-select>
                <v-text-field dense outlined class="mb-input" label="Border Width"
                    v-model="i.style.borderWidth"></v-text-field>
                <v-color-picker class="ma-2 mb-input" swatches-max-height="200px"
                    v-model="i.style.borderColor"></v-color-picker>
            </v-card-text>
            <v-card-actions>
                <v-btn class="ma-2" text icon color="primary" @click="addConn">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn class="ma-2" text icon color="error" @click="dellConn" :disabled="flow.length > 1 ? false : true">
                    <v-icon>mdi-delete-circle</v-icon>
                </v-btn>
                <v-btn class="ma-2" text icon color="secondary">
                    <v-icon>mdi-content-save-check</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("dokumentasi", {
            chart: (state) => state.chart,
            flow: (state) => state.flow,
        }),
    },
    methods: {
        addChart() {
            let idset = this.chart.length - 1
            this.chart.push({
                id: `${++idset}`,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                name: '',
                type: '',
                shape: ''
            })
        },
        delChart() {
            this.chart.splice(this.chart.length - 1, 1);
        },
        addConn() {
            let idset = this.flow.length - 1
            this.flow.push({
                id: `${++idset}`,
                source: {
                    id: '',
                    position: ''
                },
                destination: {
                    id: '',
                    position: '',
                },
                type: '',
                style: {
                    borderColor: '',
                    borderWidth: ''
                },
                markerEnd: ''
            })
        },
        dellConn() {
            this.flow.splice(this.flow.length - 1, 1);
        }
    }
}
</script>