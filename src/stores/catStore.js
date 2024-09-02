//封装购物车模块
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserStore } from "./user"
import { insertCartAPI } from '@/apis/cart'
import { findNewCartListAPI } from '@/apis/cart'
import { delCartList } from "@/apis/cart"

export const useCartStore = defineStore('cat', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  //state-cartList(购物车列表)
  const cartList = ref([])

  //获取最新购物车列表函数
  const updateNewList = async () => {
    //调用获取最新购物车列表接口
    const res = await findNewCartListAPI()
    //用接口购物车列表覆盖本地购物车列表
    cartList.value = res.data.result
  }

  //action-添加购物车方法
  const addCard = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      //登录之后的加入购物车逻辑
      //调用加入购物车接口
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      //已添加过-count + 1
      //没添加过-直接push
      //思路：已经传过来的数据，如果skuId在已有数据中存在，则加1，如果不存在则直接push
      //array.find返回满足条件的第一个单元值
      //这里是输入的id和购物车已有的id匹配，有的话返回满足条件的第一个（这里应该也是只有一个）对象
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        //返回的对象里面的count进行变更
        item.count += goods.count
      } else {
        //如果不存在一样的id 那直接把新获得的对象加入数组中
        cartList.value.push(goods)
      }
    }
  }
  //清空购物车
  const clearCart = () => {
    cartList.value = []
  }
  //删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      //调用删除接口
      await delCartList([skuId])
      updateNewList()
    } else {
      //思路：数组中删除某一项
      //方法一：找到要删除项的下标 使用splice
      //方法二：使用filter
      //1.splice
      /* const index = cartList.value.findIndex(item => skuId === item.skuId)
      cartList.value.splice(index, 1) */
      //2.filter
      cartList.value = cartList.value.filter(item => skuId !== item.skuId)
    }
  }
 
  //计算总价
  const sumCount = computed(() => {
    //遍历数组？？
    let sum = 0
    for (let i = 0; i < cartList.value.length; i++) {
      sum = sum + cartList.value[i].count * cartList.value[i].price
    }
    return sum
  })
  //计算总数量
  const sumNum = computed(() => {
    let sum = 0
    for (let i = 0; i < cartList.value.length; i++) {
      sum += cartList.value[i].count
    }
    return sum
  })
  //收集单选框的状态
  const singleCheck = (skuId, selected) => {
    //通过skuId来修改selected的状态
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  //是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected === true))
  //定义全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }
  //计算已选择商品的数量
  const allCount = computed(() => {
    let sum = cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count, 0)
    return sum
  }
  )
  //计算已选择商品的价格
  const allPrice = computed(() => {
    let sum = cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count * c.price, 0)
    return sum
  }
  )

  return { cartList, addCard, delCart, sumCount, sumNum, singleCheck, isAll, allCheck, allCount, allPrice, clearCart, updateNewList }
}, { persist: true })