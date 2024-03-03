import { defineStore } from 'pinia';
import myRequest from '@/request/index';

const useHomeStore = defineStore('home', {
  state() {
    return {
      houseList: [],
      currentPage: 1,
    };
  },
  actions: {
    async fetchHomeHouseList() {
      const res = await myRequest.get({
        url: '/home/houselist',
        params: {
          page: this.currentPage,
        },
      });
      this.houseList.push(...res.data);
    },
  },
});

export default useHomeStore;
