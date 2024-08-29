//导入
import httpInstance from "@/utils/http"

//测试
export function getCategory() {
  return httpInstance({
    url: 'home/category/head'
  })
}