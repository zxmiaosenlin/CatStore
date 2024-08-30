import httpInstance from '@/utils/http'
export function getBannerAPI() {
  return httpInstance({
    url: '/home/banner'
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
    url: '/home/new'
  })
}