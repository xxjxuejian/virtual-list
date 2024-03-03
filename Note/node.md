### html结构是怎么样的？每个div的作用是什么

```html
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
```

1. 在最外层的house-list上面绑定滚动事件，同时这个容器作为滚动容器，他的高度设置: itemHeight\*垂直方向上的item数量。它身上设置overflow：auto
2. 接着是内层的height-container容器，用来将外层滚动容器撑开，他的高度是根据列表数量决定的，当列表数量变多（价值下一页）它的高度也要继续变高。其中高度：scrollHeight = itemHeight \* houseList.length;
3. 然后是存放每一个列表项目houst-item的容器lists。
4. 关于css：
   1. 外层的house-list需要设置为相对定位。原因：内部需要开启绝对定位，相对于自己，所以自己需要相对定位
   2. 内部的滚动容器height-container需要设置为绝对定位。原因：用来撑开house-list的盒子，高度很高，开启定位，脱离文档流，不影响后面盒子。
   3. 列表的容器lists设置为绝对定位。原因：为了实现滚动的效果，外层容器滚动时，这个盒子会向上移动，就移出屏幕了，需要把该容器向下移动，即要频繁的改变位置，脱离文档流来操作，会更加节省性能。

### 需要哪些参数？

1. 发送网络请求获取房屋列表数据，以及一个页码变量
2. 要确定页面中垂直方向上显示几个item,最好是多渲染一行，这样更流畅。
3. 要确定每个item的高度，可视窗口的高度，
4. 需要一个计算属性visibleData，仅仅存放页面中需要渲染的数据项
5. 确定开始索引，结束索引，用来对原始房屋列表切片
6. 滚动容器的高度是可变的，所以需要计算属性scrollHeight
7. 列表容器要向下移动，每次移动多少呢，要计算出来，那需要根据你每次滚动的距离和itemHeight. offSet = scrollTop - (scrollTop % itemHeight);

### 触底加载

1. 滚动事件需要防抖处理下
2. 页面加载到底部要触发加载下一页，这里使用的是`IntersectionObserver`,那就需要设置一个元素，在最底部，当滚动到底部让该元素可见时，触发回调
3. 这个底部元素我放在了高度容器里面，定位到高度容器底部
4. 到底是修改页码，发送网络请求，给数组中添加数据，数组长度改变会让容器高度变化，可滚动高度变大

### 其他

1. 设计上是让页面显示6条数据，一行两条。但是需要多加载一行数据，相当于预先渲染两条数据。
2. 由于是两列的布局，滚动时进行数据切片，让每条数据的位置变来变去。就是说上一次渲染0，1，2，3，4，5，6，7。下一次渲染可能是1，2，3，4，5，6，7，8。那么1，2到上面看不见了，但是3原本在左侧就到了右侧（而且分成两列时，取到这样的索引没有意义）就会导致item跳来跳去。y理想状态是:  
   0,1,2,3,4,5,6,7  
   2,3,4,5,6,7,8,9  
   4,5,6,7,8,9,10,11  
   所以开始索引startIndex = Math.floor(scrollTop / itemHeight) \* 2，变为2的整数倍
3. 每次切8条数据，到列表尾部可能不到8条了，就手动的把开始索引startIndex = list.length-8

### 存在的问题

1. 滚的快的化还是会白屏，可以加上加载动画
2. item不定高的情况怎么解决
