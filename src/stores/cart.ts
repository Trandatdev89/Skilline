import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useCartStore = defineStore("cart-store",()=>{

  const listCourse = ref<any>([]);

  const handleAddToCart = (courseId:any)=>{
    let isAdd = false;
    const exists = listCourse.value.find((item:any) => item.id === courseId);
    if (!exists) {
      listCourse.value.push(courseId);
      isAdd = true;
    }
    return isAdd;
  }

  const handleSubCart = (listId:any[]) :any =>{
    listCourse.value = listCourse.value.filter((item:any)=>!listId.includes(item.id));
  }

  const handleDeletes = () :any=>{
    listCourse.value = [];
  }

  return {listCourse,handleAddToCart,handleSubCart,handleDeletes};

},{
  persist:true
});

export default useCartStore;