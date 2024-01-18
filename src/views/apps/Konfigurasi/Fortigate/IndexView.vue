<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <section>
            <v-row>
                <v-col col="12" md6 sm12>
                    <TableUsersView />
                </v-col>
                <v-col col="12" md6 sm12>
                    <TableGroupView />
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>
<script>
import TableUsersView from "./TableUsersView"
import TableGroupView from "./TableGroupView"
export default {
    components: {
        TableUsersView,
        TableGroupView
    },
    data: function () {
        return {
            item: []
        }
    },
    created() {
        if (this.$store.state.auth.permissions.length > 0) {
            if (!this.$can('read-server'))
                this.$router.push({ name: "error-401" }).catch(() => true)
        }
    },
    mounted() {
        if (this.$store.state.auth.permissions.length > 0) {
            if (!this.$can('read-server'))
                this.$router.push({ name: "error-401" }).catch(() => true)
        }
    }
}
</script>
  