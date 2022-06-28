<template>
  <div>
    <van-nav-bar title="标题">
      <template #title
        ><van-button type="default" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"
        >内容 1</van-tab
      >
      <template #nav-right>
        <div class="menu">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home'
export default {
  name: 'Home',
  created () {
    this.getMyChannelsFn()
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  methods: {
    async getMyChannelsFn () {
      try {
        const res = await getMyChannels()
        console.log('res', res)
        this.channels = res.data.data.channels
      } catch (err) {
        console.log('err', err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  color: #fff;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  width: 66px;
  height: 82px;
  line-height: 82px;
  text-align: center;
  background-color: rgb(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 66px;
  width: 66px;
  height: 82px;
}
/deep/.van-tabs__nav--line.van-tabs__nav--complete {
  padding-right: 0.21333rem;
  padding-left: 0;
}
</style>
