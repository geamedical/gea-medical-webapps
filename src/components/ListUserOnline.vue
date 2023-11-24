<template>
    <div>
        <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="scrollDistance">
            <v-list subheader>
                <v-subheader>Rekanan Aktif</v-subheader>
                <v-list-item v-for="i in datainfo" :key="i.id">
                    <v-list-item-avatar>
                        <v-avatar size="40" color="primary">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-text="i.name"></v-list-item-title>
                        <v-list-item-subtitle><strong :class="i.islogin === 'n' ? 'error--text' : 'accent--text'">{{
                            Online(i.islogin) }}</strong></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            datainfo: [],
            search: 'y',
            option: {
                page: 1,
                itemsPerPage: 10,
                sortBy: 'islogin',
                sortDesc: true
            },
            busy: false,
            scrollDistance: '10px',
        }
    },
    computed: {
        ...mapGetters(["isAuth"]),
        ...mapState("auth", {
            authenticated: (state) => state.authenticated,
        }),
    },
    mounted() {
        if (this.authenticated.length > 0) {
            this.getNotifLogin()
            this.getNotifLogout()
        }
    },
    methods: {
        ...mapActions("masterdata_user", ["index"]),
        Online(login) {
            return login === 'n' ? 'offline' : 'online'
        },
        getNotifLogin() {
            this.sockets.subscribe("auth-login:user", () => {
                this.loadMore();
            });
        },
        getNotifLogout() {
            this.sockets.subscribe("auth-logout:user", () => {
                this.loadMore();
            });
        },
        loadMore: function () {
            if (this.authenticated.length > 0 || this.isAuth) {
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