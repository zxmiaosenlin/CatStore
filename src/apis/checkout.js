import httpInstance from "@/utils/http"

//支付信息接口
export const getCheckInfoAPI = () => {
  return httpInstance({
    url: 'member/order/pre'
  })
}