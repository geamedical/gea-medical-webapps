<template>
    <div>
        <editor api-key="no-api-key" :init="{
            height: 500,
            menubar: false,
            plugins: [
                'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar:
                'undo redo | casechange blocks | bold italic backcolor | \
                           alignleft aligncenter alignright alignjustify | \
                           bullist numlst checklist outdent indent | removeformat | a11ycheck code table help'
        }" initial-value="Tulis disini" v-model="text" />
    </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue';
export default {
    components: {
        'editor': Editor
    },
    data: () => ({
        text: '',
    }),
    watch:{
        text(e){
            this.$emit('callback', e)
        }
    }
}
</script>