<script setup>
import HouseItem9 from './HouseItemType9.vue';
import HouseItem3 from './HouseItemType3.vue';
import useHomeStore from '@/store/home/home';
import { debounce } from '@/services/tools.js';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue';

const houseListElement = ref();
const homeStore = useHomeStore();
const itemHeight = 254; //每一个item高度
const clientHeight = 770; //滚动容器的可视高度
// const scrollHeight = itemHeight * 10; //滚动容器的可滚动高度
// const visibleCount = Math.floor(clientHeight / itemHeight); //滚动容器内能装几个item
const visibleCount = 4;

const startIndex = ref(0); //开始索引
const endIndex = ref(startIndex.value + visibleCount * 2); //结束索引
const offSet = ref(0); //偏移量,用来实现滚动样式的，css相关的
const preScrollTop = ref(0);

const { houseList, currentPage } = storeToRefs(homeStore);
homeStore.fetchHomeHouseList();

const scrollHeight = computed(() => {
  return (itemHeight * houseList.value.length) / 2;
});

const visibleData = computed(() => {
  return houseList.value.slice(startIndex.value, endIndex.value);
});
const getTransform = computed(() => {
  return `translate(0,${offSet.value}px)`;
});

function scrollEvent() {
  let scrollTop = houseListElement.value.scrollTop;
  startIndex.value = Math.floor(scrollTop / itemHeight) * 2;
  endIndex.value = Math.min(startIndex.value + visibleCount * 2, houseList.value.length);

  // 切片的实际长度 < visibleCount * 2,保证长度 =visibleCount * 2
  if (endIndex.value - startIndex.value < visibleCount * 2) {
    startIndex.value = endIndex.value - visibleCount * 2;
  }
  offSet.value = scrollTop - (scrollTop % itemHeight);

  /*
  console.log(
    startIndex.value,
    startIndex.value + visibleCount * 2,
    houseList.value.length,
    endIndex.value,
  );
  */
}
const _debouncescrollEvent = debounce(scrollEvent, 100);

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) return;
  // 到底了
  currentPage.value++;
  console.log('触底加载');
  homeStore.fetchHomeHouseList();
});

onMounted(() => {
  intersectionObserver.observe(document.querySelector('.scrollerFooter'));
});
</script>

<template>
  <div class="home">
    <h2 class="title">虚拟列表的练习</h2>
    <div class="house-list" @scroll="_debouncescrollEvent" ref="houseListElement">
      <div class="height-container" :style="{ height: scrollHeight + 'px' }">
        <div class="scrollerFooter">haha</div>
      </div>
      <div class="lists" :style="{ transform: getTransform }">
        <template v-for="house in visibleData" :key="house.cityId">
          <HouseItem9 :item-data="house.data" v-if="house.discoveryContentType === 9"></HouseItem9>
          <HouseItem3 :item-data="house.data" v-else></HouseItem3>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 400px;
  height: 800px;
  margin: 30px auto;
  background-color: #fff;
  .title {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .house-list {
    position: relative;
    height: 770px;
    overflow: auto;

    .height-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .lists {
      display: flex;
      position: absolute;
      left: 0;
      flex-flow: row wrap;
    }
  }

  .scrollerFooter {
    position: absolute;
    bottom: 0;
  }
}
</style>
