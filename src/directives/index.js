import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    //定义全局指令
    app.directive('img-lazy', {
      mounted(el, binding) {
        //el：指令绑定的那个元素 img
        //binding：bingding.value 指令等于号后面绑定的表达式的值 图片url
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }

        })
      }
    })
  }
}