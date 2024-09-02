//封装购物车相关接口
import httpInstance from "@/utils/http"

//加入购物车接口
export const insertCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}
//获取最新的购物车列表接口
export const findNewCartListAPI = () => {
  return httpInstance({
    url: '/member/cart'
  })
}
//删除购物车列表接口
export const delCartList = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {ids}
  })
}

//合并购物车(合并本地+接口)
//这里data是一个由skuId,selected,count 组成的数组
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}
