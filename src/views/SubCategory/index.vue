<script setup>
import { getCategoryFilterAPI } from '@/apis/category'
import { ref } from 'vue';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryAPI } from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue';

const route = useRoute()
const categoryFilterList = ref({})
const CategoryFilterAPI = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilterList.value = res.data.result
}
onMounted(() => { CategoryFilterAPI() })

//获取基础列表数据
const goodList = ref([])

//这里写请求要传入的参数，这里暂时都是默认值，等到触发某些事件的时候会调用函数修改其中的参数
//这里来的参数是要看文档决定的
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  //这里拿到了请求到的数据
  goodList.value = res.data.result.items
}
onMounted(() => { getGoodList() })

//tab切换回调
//这里实现的是筛选功能，核心逻辑是改变tab栏的激活时触发对应的sortField参数的改变

const tabChange = () => {
  //这里状态触发时，意味着切换tab对应的页面，page初始化成1
  reqData.value.page = 1
  //状态触发意味着请求数据的参数发生改变
  //这里重新调用拥有新的参数的函数
  getGoodList()
}

//加载更多
const disabled = ref(false) //刚开始的时候不结束监听
const load = async () => {
  //获取下一页数据给res
  reqData.value.page += 1
  const res = await getSubCategoryAPI(reqData.value)
  //使用展开运算符拼接数组得到新的数组赋值给goodList.value
  goodList.value = [...goodList.value, ...res.data.result.items]
  //结束监听条件是如果没有新的数据了，也就是说新page的数组长度为0时，结束监听
  if (res.data.result.items.length == 0) disabled.value = true
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryFilterList.parentId}` }">{{ categoryFilterList.parentName
          }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilterList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 这里是 tab区域代码 -->
      <!-- 这里使用element-Plus定义好组件的方法 tab-change对应tab栏状态的切换-->
      <!-- 在js编译的区域写状态切换时触发的事件 -->
      <!-- 还有个重要的指令是用v-model获取到用户切换的tab栏的name属性，把name属性给 reqData.sortField 实现参数的更新-->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- 这里实现列表的无限加载，使用的是element-Plus提供的组件参数 -->
      <!--  v-infinite-scroll这个指令是触底时会触发的方法，在上方定义对应的方法-->
      <!-- 这里结束监听用的是 :infinite-scroll-disabled传入的disabled是true还是false，在上方定义-->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <!-- 这里用v-for的目的是去除goods，作为参数传给GoodItem--封装好等待传入参数的组件 -->
        <GoodsItem v-for="goods in goodList" :key="goods.id" :goods="goods" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>