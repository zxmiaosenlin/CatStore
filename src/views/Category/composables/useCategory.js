//封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export const useCategory = function () {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.data.result
  }

  onMounted(() => { getCategory() })
  //期望在路由参数变化的时候  可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    //存在问题：需要使用最新的路由参数请求最新的分类数据
    //但是这里拿不到最新的,因为是路由切换前，拿到的是之前的路径
    //使用to就拿到了要跳转的对象
    getCategory(to.params.id)
  })
  onMounted(() => { useCategory() })
  return { categoryData }
}