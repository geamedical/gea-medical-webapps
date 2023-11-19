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
        <ListDocumentation v-if="isDashboard"></ListDocumentation>
        <form-flowchart v-if="$route.name === 'dokumentasi.add'"></form-flowchart>
    </div>
</template>
<script>
import ListDocumentation from '@/components/ListDocumentation.vue';
import FormFlowchart from '@/components/FormFlowchart.vue';
export default {
    components: {
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
        rendered(e) {
            console.log(e);
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