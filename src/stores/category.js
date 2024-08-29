import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
export const useCategoryStore = defineStore('category', () => {
  //导航列表的数据管理
  //state
  const categoryList = ref([])
  //action
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.data.result
  }
  return { categoryList, getCategory }
})
 