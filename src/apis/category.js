import httpInstance from "@/utils/http"

//这边就比别的多了个query参数id 要放在params中
export function getCategoryAPI(id) {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}

//SubCategory接口
export function getCategoryFilterAPI(id) {
  return httpInstance({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

//这里是基础商品列表的接口函数
//这里使用的是POST请求
//POST请求 能拿到体量更大的数据 而且更为安全 访问不到历史记录
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url: '/category/goods/temporary',
    //这里跟之前的区别是要写上method
    //同时传入的请求参数还有data，要并列写在这个对象中
    method: 'POST',
    data
  })
}