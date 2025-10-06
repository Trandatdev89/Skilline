import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useOrderStore = defineStore("order-store",()=>{

  const listOrder = reactive({
    order:[],
    total:0
  });

  const getListOrderNeedPayment = (value:any,totalAmount:number)=>{
    listOrder.order = value;
    listOrder.total = totalAmount;
  }

  return {listOrder,getListOrderNeedPayment};

});

export default useOrderStore;