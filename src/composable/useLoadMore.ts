import { reactive, ref } from 'vue'
import type { ApiResponse } from '@/type/ApiResponse.ts'

interface requestParam {
  page: number,
  size: number,
  keyword?: string,
  sort?: string
}

const useLoadMore = () => {
  const isLoading = ref<boolean>(false)
  const hasMore = ref<boolean>(true)
  const request = reactive<requestParam>({
    page: 1,
    size: 10
  });
  const data = ref<any>([]);

  const loadMoreData = async (requestApi: ()=>Promise<ApiResponse<any>>) => {
    try{
      if (isLoading.value || !hasMore.value) {
        return;
      }

      isLoading.value = true
      const response:ApiResponse<any> = await requestApi();
      if(response.data.list.length < request.size){
        hasMore.value = false;
      }

      data.value.push(...response.data.list);
      request.page++;
      isLoading.value = false;
    }catch (Error){
      console.log(Error);
    }
  }

  return {
    data,
    loadMoreData,
    isLoading,
    hasMore,
    request
  }
}

export default useLoadMore