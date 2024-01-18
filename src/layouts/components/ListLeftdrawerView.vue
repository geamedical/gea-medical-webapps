<template>
    <div>
        <v-list>
            <v-menu offset-x down max-width="150" :style="{ background: $vuetify.theme.themes[theme].bg }">
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item link v-bind="attrs" v-on="on">
                        <v-list-item-content>
                            <v-list-item-title class="text-h6 white--text">{{ authenticated.name }}</v-list-item-title>
                            <v-list-item-subtitle class="white--text">{{ authenticated.email }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-icon class="white--text">mdi-menu-down</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </template>
                <v-list>
                    <v-list-item link to="/profile">
                        <v-list-item-action>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Profil</v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click="keluar">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Keluar</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense shaped subheader>
            <v-subheader>Keseluruhan</v-subheader>
            <div v-for="(item) in menus" :key="item.no">
                <v-list-item v-if="!item.child" link :to="item.link">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-group v-else :prepend-icon="item.icon" color="#FFFFFF" no-action>
                    <template v-slot:activator>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </template>
                    <v-list-item v-for="([title, icon, link, permission], x) in item.itemchild" :key="x" :to="link" link>
                        <v-list-item-title v-if="$can(permission)">{{ title }}</v-list-item-title>
                        <v-list-item-icon v-if="$can(permission)">
                            <v-icon>{{ icon }}</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
            </div>
            <v-subheader>Konfigurasi</v-subheader>
            <div v-for="(item) in menus_konfigurasi" :key="item.no">
                <v-list-item v-if="!item.child" link :to="item.link">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>

                <v-list-group v-else :prepend-icon="item.icon" color="#FFFFFF" no-action>
                    <template v-slot:activator>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </template>
                    <v-list-item v-for="([title, icon, link, permission], x) in item.itemchild" :key="x" :to="link" link>
                        <v-list-item-title v-if="$can(permission)">{{ title }}</v-list-item-title>
                        <v-list-item-icon v-if="$can(permission)">
                            <v-icon>{{ icon }}</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
            </div>
            <v-subheader>Master Data</v-subheader>
            <div v-for="(item) in menus_masterdata" :key="item.no">
                <v-list-item link :to="item.link" v-if="$can(item.permission)">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </div>
            <v-subheader>Informasi</v-subheader>
            <div v-for="(item) in menus_informasi" :key="item.no">
                <v-list-item link :to="item.link" v-if="$can(item.permission)">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </div>
        </v-list>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data: () => ({
        LeftSelectedDrawer: 0,
        menus: [
            {
                no: 0,
                title: 'Beranda',
                icon: 'mdi-apps',
                child: false,
                itemchild: [],
                link: '/dashboard'
            },
            {
                no: 1,
                title: 'Forms',
                icon: 'mdi-list-box-outline',
                child: true,
                itemchild: [
                    ['Permintaan Akses', 'mdi-frequently-asked-questions', '/form-permintaan', 'read-form-permintaan'],
                ],
                link: '/'
            },
            {
                no: 2,
                title: 'Permintaan',
                icon: 'mdi-leak',
                child: true,
                itemchild: [
                    ['Akses Server', 'mdi-server', '/permintaan-server', 'read-form-permintaan'],
                    ['Akses Folder NAS Server', 'mdi-access-point', '/permintaan-folder-nas', 'read-form-permintaan'],
                ],
                link: '/permintaan'
            },
        ],
        menus_konfigurasi: [
            {
                no: 11,
                title: 'Perizinan akses',
                icon: 'mdi-folder-key',
                child: true,
                itemchild: [
                    ['Folder Server NAS', 'mdi-folder-sync', '/folder-nas-permission', 'read-nasserver'],
                    ['Server', 'mdi-server-network', '/server-permission', 'read-server'],
                    ['Fortigate', 'mdi-vpn', '/fortigate', 'read-server'],
                ],
                link: '/'
            },
        ],
        menus_informasi: [
            {
                no: 10,
                title: 'Dokumentasi',
                icon: 'mdi-television-guide',
                child: true,
                link: '/dokumentasi',
                permission: 'read-documentation'
            },
            {
                no: 12,
                title: 'Penggunaan Email',
                icon: 'mdi-email-multiple-outline',
                child: true,
                link: '/office-mail',
                permission: 'read-email'
            },
        ],
        menus_masterdata: [
            {
                no: 6,
                title: 'Data Pengguna',
                icon: 'mdi-account-group',
                child: false,
                itemchild: [],
                link: '/master-data-pengguna',
                permission: 'read-user'
            },
            {
                no: 7,
                title: 'Data Departemen',
                icon: 'mdi-lightbulb-group-outline',
                child: false,
                itemchild: [],
                link: '/master-data-dept',
                permission: 'read-departement'
            },
            {
                no: 8,
                title: 'Data Role',
                icon: 'mdi-group',
                child: false,
                itemchild: [],
                link: '/master-data-role',
                permission: 'read-role'
            },
            {
                no: 9,
                title: 'Data Akses',
                icon: 'mdi-security',
                child: false,
                itemchild: [],
                link: '/master-data-akses',
                permission: 'read-permission'
            },
        ]
    }),
    computed: {
        theme() {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        ...mapState('auth', {
            authenticated: state => state.authenticated,
            permissions: state => state.permissions,
        }),
    },
    methods: {
        ...mapActions('auth', ['logout']),
        keluar() {
            this.logout().then(e => {
                if (e === true) {
                    this.$router.push({ name: 'login' })
                }
            })
        }
    }
};
</script>
<style scoped>
.v-application .secondary--text {
    color: #FFFFFF !important;
    caret-color: #FFFFFF !important;
}
</style>