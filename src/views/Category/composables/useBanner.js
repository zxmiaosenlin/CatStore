//封装Banner轮播图相关的业务代码
import { ref, onMounted } from "vue"
import { getBannerAPI } from "@/apis/home"

export function useBanner() {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: '2' })
    bannerList.value = res.data.result
  }
  onMounted(() => { getBanner() })

  return { bannerList }
}