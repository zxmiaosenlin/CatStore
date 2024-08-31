<script setup>
//这里是通用组件
import { ref } from 'vue';
import { useMouseInElement } from '@vueuse/core'
import { watch } from 'vue';

// 图片列表 这里是写死的 我们要从后端获取数据
/* const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
] */

defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})

//小图切换大图显示
//为小图绑定事件 记录激活的下标值
const activeIndex = ref(0)
const enterHandler = (i) => {
  //目的：把i交给activeIndex
  activeIndex.value = i

}

//控制鼠标移动滑块
//获取大盒子的元素对象
const target = ref(null)
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)
const { elementX, elementY, isOutside } = useMouseInElement(target)
//控制滑块根据鼠标移动（监听elementX和elementY的变化 有变化重新设置left和top）
watch([elementX, elementY], () => {
  if (isOutside.value) return
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }
  if (elementX.value < 100) left.value = 0
  if (elementX.value > 300) left.value = 200
  if (elementY.value < 100) top.value = 0
  if (elementY.value > 300) top.value = 200

  //控制大图的显示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})
</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-show="!isOutside"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>