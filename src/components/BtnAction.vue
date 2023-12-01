<template>
    <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon small>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list dense>
            <div v-for="item in menu" :key="item.text">
                <v-list-item link @click="clickAct(item.text, unique)"  v-if="$can(item.permission)">
                    <v-icon small class="mr-2">{{ item.icon }}</v-icon>
                    <v-list-item-title v-text="item.text"/>
                </v-list-item>
            </div>
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