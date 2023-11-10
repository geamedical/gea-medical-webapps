<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-badge color="primary" :content="`${count !== null && count > 0 ? 'New ' : ''}${count}`" overlap>
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
            </v-badge>
        </template>
        <v-list subheader two-line dense>
            <v-list-item-group v-model="selected" active-class="pink--text" v-if="items.length > 0">
                <div v-for="(item, index) in items" :key="index"
                    @click="approval(item.initial, item.id, item.user_id_approval)">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon :class="item.initial === 'form_cutis' ? 'primary' : 'secondary'">
                                {{ item.initial === 'form_cutis' ? 'mdi-plane-car' : 'mdi-frequently-asked-questions' }}
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.initial === 'form_cutis' ? 'Permohonan Cuti' : 'Permohonan Izin'
                            }}</v-list-item-title>

                            <v-list-item-subtitle class="text--primary">Mulai Tanggal : {{ parseDate(item.date)
                            }}</v-list-item-subtitle>

                            <v-list-item-subtitle class="text--primary">Sampai Tanggal : {{ parseDate(item.todate)
                            }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-list-item-action-text>{{ parseDate(item.created_at) }}</v-list-item-action-text>

                            <v-icon v-if="item.approval === 'y'" color="grey lighten-1" disabled>
                                mdi-check
                            </v-icon>

                            <v-icon v-else color="yellow darken-3">
                                mdi-signature
                            </v-icon>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                </div>
            </v-list-item-group>
            <v-list-item v-else>
                <v-list-item-content>
                    <v-list-item-title>Tidak ada data</v-list-item-title>
                    <v-list-item-subtitle>Untuk saat ini anda tidak memiliki
                        pemberitahuan.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            count: null,
            items: [],
            selected: null,
        }
    },
    computed: {
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
};
</script>