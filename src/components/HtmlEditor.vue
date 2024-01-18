<template>
    <ckeditor :editor="editor" v-model="text" :config="editorConfig"></ckeditor>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    props: {
        data: String
    },
    data() {
        return {
            editor: ClassicEditor,
            text: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            }
        };
    },
    watch: {
        text(e) {
            this.$emit('event', e)
        },
        data(e) {
            this.text = e
        }
    }
}
</script>
<style>
.ck-editor__editable {
    min-height: 500px;
}
</style>