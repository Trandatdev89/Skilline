<template>
  <div class="ckeditor-wrapper">
    <div ref="editorEl"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

  import {
    ClassicEditor,
    Bold,
    Italic,
    Underline,
    Heading,
    Paragraph,
    Link,
    List,
    ListProperties,
    Table,
    TableToolbar,
    Image,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    MediaEmbed,
    Essentials
  } from 'ckeditor5'

  import 'ckeditor5/ckeditor5.css'
  import { Base64UploadAdapterPlugin } from '@/components/ckeditor/plugins/Base64UploadAdapterPlugin.ts'
  import MyButtonPlugin from '@/components/ckeditor/plugins/MyButtonPlugin.ts'
  import MyDropDownPlugin from '@/components/ckeditor/plugins/MyDropdownPlugin.ts'

  const props = defineProps<{
    modelValue: string
    readonly?: boolean
    listTypeMail?:any[]
    listNotification?:any[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
    (e: 'save', value: string): void,
    (e: 'cancel'): void,
    (e:'changeType',value:string):void
  }>()

  const editorEl = ref<HTMLElement | null>(null)
  let editorInstance: any = null

  onMounted(async () => {
    editorInstance = await ClassicEditor.create(editorEl.value!, {
      licenseKey: 'GPL',
      initialData: props.modelValue || '',
      myDropdown:{
        listType: props.listTypeMail || props.listNotification
      },
      plugins: [
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Underline,
        Heading,
        Link,
        List,
        ListProperties,
        Table,
        TableToolbar,
        Image,
        ImageToolbar,
        ImageUpload,
        ImageResize,
        MediaEmbed,
        MyButtonPlugin,
        MyDropDownPlugin
      ],
      extraPlugins: [Base64UploadAdapterPlugin],
      toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'link',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
        'imageUpload',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
        '|',
        'myButton',
        '|',
        'myDropdown'
      ]
    });

    /* Sync editor → v-model */
    editorInstance.model.document.on('change:data', () => {
      emit('update:modelValue', editorInstance.getData())
    })

    editorInstance.on('myButton:save', (evt: any, payload: any) => {
      emit('save', payload.data)
    })

    editorInstance.on('myDropdown:changeType', (evt, payload) => {
      emit('changeType', payload)
    })

    if (props.readonly) {
      editorInstance.enableReadOnlyMode('readonly')
    }
  })

  watch(
      () => props.modelValue,
      (value) => {
        if (editorInstance && value !== editorInstance.getData()) {
          editorInstance.setData(value || '')
        }
      }
  )

  onBeforeUnmount(() => {
    editorInstance?.destroy()
  })
</script>

<style scoped>
  .ckeditor-wrapper :deep(.ck-editor__editable) {
    min-height: 200px;
  }
</style>
