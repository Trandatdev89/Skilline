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

  const updateOrder = ()=>{
    listOrder.order = [];
    listOrder.total = 0;
  }

  return {listOrder,getListOrderNeedPayment,updateOrder};

},{
  persist:true
});

export default useOrderStore;