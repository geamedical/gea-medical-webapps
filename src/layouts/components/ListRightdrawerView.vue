<template>
    <div class="mt-5">
        <v-subheader style="font-size: 20px; font-weight: bold;">Aksi Data</v-subheader>
        <v-divider></v-divider>
        <v-list dense nav subheader v-if="!isDashboard">
            <v-list-item-group v-model="selectedRightDrawer" color="primary">
                <div v-for="([title, icon, link, permission], i) in menu" :key="i">
                    <v-list-item @click="movePage(link)" router exact v-if="$can(permission)">
                        <v-list-item-action>
                            <v-icon>{{ icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{ title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-list-item-group>
        </v-list>
        <v-divider v-if="!isDashboard"></v-divider>
        <ListUserOnline v-if="!isDashboard && !visibleUser($route.name)"></ListUserOnline>
        <ListDocumentation v-if="isDashboard"></ListDocumentation>
        <form-flowchart v-if="$route.name === 'dokumentasi.add' || $route.name === 'dokumentasi.show'"></form-flowchart>
    </div>
</template>
<script>
import ListUserOnline from '@/components/ListUserOnline.vue';
import ListDocumentation from '@/components/ListDocumentation.vue';
import FormFlowchart from '@/components/FormFlowchart.vue';
export default {
    components: {
        ListUserOnline,
        ListDocumentation,
        FormFlowchart
    },
    data() {
        return {
            selectedRightDrawer: 0,
            menu: [],
            isDashboard: false
        }
    },
    mounted() {
        this.rendered(this.$route.name)
    },
    watch: {
        $route(e) {
            this.rendered(e.name)
        }
    },
    methods: {
        visibleUser(route) {
            if (route !== null) {
                const indexOfResult = route.indexOf('dokumentasi');
                return indexOfResult !== -1 ? true : false
            }
        },
        rendered(e) {
            // console.log(e);
            switch (e) {
                case 'dashboard':
                    this.isDashboard = true
                    break;
                case 'profile':
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
                case 'form-permintaan.data':
                    this.menu = this.$store.state.form_permintaan.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'form-permintaan.add':
                    this.menu = this.$store.state.form_permintaan.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'form-permintaan.show':
                    this.menu = this.$store.state.form_permintaan.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'dokumentasi.data':
                    this.menu = this.$store.state.dokumentasi.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'dokumentasi.add':
                    this.menu = this.$store.state.dokumentasi.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'dokumentasi.show':
                    this.menu = this.$store.state.dokumentasi.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'folder-nas-permission.data':
                    this.menu = this.$store.state.permission_nas.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'folder-nas-permission.add':
                    this.menu = this.$store.state.permission_nas.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'folder-nas-permission.show':
                    this.menu = this.$store.state.permission_nas.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'server-permission.data':
                    this.menu = this.$store.state.permission_server.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'server-permission.add':
                    this.menu = this.$store.state.permission_server.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'server-permission.show':
                    this.menu = this.$store.state.permission_server.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                default:
                    break;
            }
        },
        movePage(nameurl) {
            this.$router.push({ name: nameurl }).catch(() => { })
        }
    }
};
</script>