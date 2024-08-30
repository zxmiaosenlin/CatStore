import httpInstance from '@/utils/http'

export function getBannerAPI(params = {}) {
  //默认为1 商品为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

//注意里面传入的是对象
export function findNewAPI() {
  return httpInstance({
    url: '/home/new'
  })
}

//这里是人气推荐的api
export function getHotAPI() {
  return httpInstance({
    url: '/home/hot'
  })
}

//这里是产品列表的api
export function getProductAPI() {
  return httpInstance({
    url: '/home/goods'
  })
}