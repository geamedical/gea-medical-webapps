<template>
    <v-alert outlined v-if="type !== '' && title !== '' && msg !== ''" :type="type" :title="title">
        {{ msg }}
    </v-alert>
</template>
<script>
export default {
    props: {
        type: String,
        title: String,
        msg: String
    },
}

</script>