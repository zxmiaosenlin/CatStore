//封装购物车模块
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCartStore = defineStore('cat', () => {
  //state-cartList(购物车列表)
  const cartList = ref([])
  //action-添加购物车方法
  const addCard = (goods) => {
    //已添加过-count + 1
    //没添加过-直接push
    //思路：已经传过来的数据，如果skuId在已有数据中存在，则加1，如果不存在则直接push
    //array.find返回满足条件的第一个单元值
    //这里是输入的id和购物车已有的id匹配，有的话返回满足条件的第一个（这里应该也是只有一个）对象
    const item = cartList.value.find((item) =>  goods.skuId === item.skuId )
    if (item) {
      //返回的对象里面的count进行变更
      item.count += goods.count
      console.log(cartList.value);
      
    } else {
      //如果不存在一样的id 那直接把新获得的对象加入数组中
      cartList.value.push(goods)
      console.log(cartList.value);
    }
  }
  return { cartList, addCard }
}, {persist: true})