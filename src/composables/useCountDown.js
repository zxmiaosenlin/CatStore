import { computed, onUnmounted, ref } from "vue"
import dayjs from "dayjs"

//封装倒计时逻辑函数
export const useCountDown = () => {
  //1.响应式的数据
  const time = ref(0)
  let timer = null
  //2.开启倒计时的函数
  const start = (currentTime) => {
    //开始倒计时的逻辑
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
    //格式化操作 为××分××秒 太搞笑了 这个插件就是把秒数转化的  
  }
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  //组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return { formatTime, start }
}