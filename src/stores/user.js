//管理用户数据相关 
//这里的目的是通过调用这个方法，将用户数据存入pinia中，便于管理 
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from '@/apis/user'
import { useCartStore } from "./catStore"

export const useUserStore = defineStore('user', () => {
  const userCart = useCartStore()
  //state
  const userInfo = ref({})
  //action
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.data.result
  }
  //退出时清除用户信息action
  const clearUserInfo = () => {
    userInfo.value = {}
    //执行清除购物车的action函数
    userCart.clearCart()
  }
  return { userInfo, getUserInfo, clearUserInfo }
}, { persist: true })