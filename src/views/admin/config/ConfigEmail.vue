<template>
  <Ckeditor
      v-model="dataTemplateEmail.htmlContent"
      :listTypeMail="listTypeMail"
      @change-type="changeTypeTemplateEmail"
      @save="handleSaveTemplateEmail" />
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import Ckeditor from '@/components/ckeditor/CKEditor.vue'
  import { TypeTemplateMail } from '@/type/TypeTemplateMail.ts'
  import type TemplateMailReq from '@/type/req/TemplateMailReq.ts'
  import TemplateMailApi from '@/api/TemplateMailApi.ts'
  import AlertService from '@/service/AlertService.ts'


  const content = ref('')
  const dataTemplateEmail = reactive<TemplateMailReq>({
    type:'',
    active:true,
    htmlContent:"",
    language:"vi",
    subject:""
  })

  const listTypeMail = [TypeTemplateMail.WELCOME,
    TypeTemplateMail.TEACHER_APPLICATION,
    TypeTemplateMail.ASSIGNMENT_DEADLINE,
    TypeTemplateMail.CERTIFICATE_ISSUED,
    TypeTemplateMail.COURSE_REMINDER,
    TypeTemplateMail.PASSWORD_RESET,
    TypeTemplateMail.PAYMENT_SUCCESS,
    TypeTemplateMail.COURSE_ENROLLED,
    TypeTemplateMail.LIVE_STREAM_REMINDER];

  const handleSaveTemplateEmail = async (data: any) => {
    try{
      const res = await TemplateMailApi.saveTemplateMail(dataTemplateEmail);

      if(res.code!==200){
        throw res.message;
      }else{
        AlertService.success("Success","Luu template thanh cong!")
      }

    }catch(error){
      AlertService.error("Error","Luu template khong thanh cong!")
    }
  }

  const changeTypeTemplateEmail = (value:string)=>{
    dataTemplateEmail.type = value;
  }

  watch(dataTemplateEmail,(newValue)=>{
    console.log(newValue);
  })
</script>
