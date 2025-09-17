import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useAuthentication = defineStore('useAuthentication',()=>{

  const userInfo = reactive({
    userId:'',
    isAuthentication:false
  });

  const isAuthentication = (value:any)=>{
    userInfo.isAuthentication = true;
    userInfo.userId = value.userId;
  }

  return {userInfo,isAuthentication};
});

export default useAuthentication;