<template>
    <div v-if="$can('read-documentation')">
        <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="scrollDistance">
            <v-list subheader three-line>
                <v-subheader>Informasi Panduan</v-subheader>
                <v-list-item v-for="i in datainfo" :key="i.id">
                    <v-list-item-content>
                        <v-list-item-title>{{ i.title }}</v-list-item-title>
                        <v-list-item-subtitle>
                            Informasi tentang penggunaan fitur <strong>{{ i.title }}</strong> dapat anda lihat disini.
                        </v-list-item-subtitle>
                        <v-list-item-action style="margin-left: 0px !important;">
                            <v-btn small depressed color="primary" outlined :to="`/users-info/${i.id}`">
                                Lihat
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            datainfo: [],
            search: '',
            option: {
                page: 1,
                itemsPerPage: 5,
                sortBy: 'created_at',
                sortDesc: true
            },
            busy: false,
            scrollDistance: '10px',
        }
    },
    methods: {
        ...mapActions("dokumentasi", ["index"]),
        loadMore: function () {
            if (this.$can('read-documentation')) {
                this.busy = true;
                const tableAttr = { options: this.option, search: this.search };
                this.index(tableAttr)
                    .then((res) => {
                        if (res.data.data.length > 0) {
                            res.data.data.forEach(e => {
                                this.datainfo.push(e)
                            });
                            this.option.page++
                        }
                        this.busy = false;
                    })
            }
        }
    }
}
</script>