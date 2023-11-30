<template>
    <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon small>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item v-for="item in menu" :key="item.text" link>
                <v-icon small>{{ item.icon }}</v-icon>
                <v-list-item-title v-text="item.text" @click="clickAct(item.text, unique)" v-if="$can(item.permission)">
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
export default {
    props: {
        unique: Number,
        menu: Array
    },
    methods: {
        clickAct(e, id) {
            this.$emit('action', { act: e, id: id })
        }
    }
}
</script>