<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="house-item">
    <div class="inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="#" />
      </div>
      <div class="infos">
        <div class="summary overflow1">{{ itemData.summaryText }}</div>
        <div class="name overflow2">{{ itemData.houseName }}</div>
        <div class="price"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.house-item {
  width: 50%;
  height: 254px;
  padding: 5px;

  .inner {
    .cover {
      img {
        width: 100%;
      }
    }
    .infos {
      margin: 10px 0;
      padding: 0 10px;
      bottom: 10px;
      color: #000;
    }
  }
}
</style>
