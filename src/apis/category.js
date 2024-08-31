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