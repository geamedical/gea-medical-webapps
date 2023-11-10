<template>
    <div>
        <v-list dense nav subheader v-if="!isDashboard">
            <v-subheader>Aksi Data</v-subheader>
            <v-list-item-group v-model="selectedRightDrawer" color="primary">
                <v-list-item v-for="([title, icon, link, permission], i) in menu" :key="i" @click="movePage(link)" router
                    exact>
                    <v-list-item-action v-if="$can(permission)">
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content v-if="$can(permission)">
                        <v-list-item-title>{{ title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-list subheader three-line v-if="isDashboard">
            <v-subheader>Informasi Panduan</v-subheader>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Form Permintaan</v-list-item-title>
                    <v-list-item-subtitle>
                        Informasi tentang penggunaan fitur <strong>Form Permintaan</strong> dapat anda lihat disini.
                    </v-list-item-subtitle>
                    <v-list-item-action style="margin-left: 0px !important;">
                        <v-btn small depressed color="primary" outlined to="/users-info/form-permintaan">
                            Lihat
                        </v-btn>
                    </v-list-item-action>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Laporan error</v-list-item-title>
                    <v-list-item-subtitle>
                        Jika anda mengalami masalah tentang bug, error, dan keluhan lainya. Anda dapat menghubungi kami.
                    </v-list-item-subtitle>
                    <v-list-item-action style="margin-left: 0px !important;">
                        <v-btn small depressed color="primary" outlined to="/users-info/error-reporting">
                            Lihat
                        </v-btn>
                    </v-list-item-action>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedRightDrawer: 0,
            menu: [],
            isDashboard: false
        }
    },
    mounted(){
        this.rendered(this.$route.name)
    },
    watch: {
        $route(e) {
            this.rendered(e.name)
        }
    },
    methods: {
        rendered(e){
            console.log(e);
            switch (e) {
                case 'dashboard':
                    this.isDashboard = true
                    break;
                case 'users-info':
                    this.isDashboard = true
                    break;
                case 'master-data-pengguna.data':
                    this.menu = this.$store.state.masterdata_user.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-pengguna.add':
                    this.menu = this.$store.state.masterdata_user.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-pengguna.show':
                    this.menu = this.$store.state.masterdata_user.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-role.data':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-role.add':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-role.show':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-dept.data':
                    this.menu = this.$store.state.masterdata_dept.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-dept.add':
                    this.menu = this.$store.state.masterdata_dept.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-dept.show':
                    this.menu = this.$store.state.masterdata_dept.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-role.setrole':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-akses.data':
                    this.menu = this.$store.state.masterdata_akses.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-akses.add':
                    this.menu = this.$store.state.masterdata_akses.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-akses.show':
                    this.menu = this.$store.state.masterdata_akses.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                default:
                    break;
            }
        },
        movePage(nameurl) {
            this.$router.push({ name: nameurl })
        }
    }
};
</script>