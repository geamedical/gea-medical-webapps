<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <section>
            <data-view />
        </section>
    </v-container>
</template>
<script>
import DataView from './DataView.vue';
export default {
    components: { DataView }
}
</script>
  