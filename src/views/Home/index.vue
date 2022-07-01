<template>
  <div>
    <van-nav-bar fixed>
      <template #title
        ><van-button type="default" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArtList :id="item.id"></ArtList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelsShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <!-- 点击菜单之后的弹出层 -->
    <van-popup
      v-model="isChannelsShow"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- ChannelPannel中的changeActive事件，一是可以改变active的值，用$event接收，二是同时将弹出框收起来 -->
      <ChannelPannel
        :channels="channels"
        :active="active"
        @changeActive="
          active = $event;
          isChannelsShow = false;
        "
        @delChannel="active = $event"
      ></ChannelPannel>
    </van-popup>
  </div>
</template>

<script>
import ArtList from '@/components/ArtList.vue'
import ChannelPannel from './components/ChannelPannel.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannelsFn()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelsShow: false
    }
  },
  methods: {
    async getMyChannelsFn () {
      const channels = getItem(CHANNELS)
      // 如果未登录但是本地存储有数据，就从本地拿数据
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        // 登录过后，或者本地无数据，就直接去Ajax拿数据
        try {
          const res = await getMyChannels()
          console.log('res', res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log('err', err)
        }
      }
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: { ArtList, ChannelPannel }
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
/deep/.van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  width: 750px;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
