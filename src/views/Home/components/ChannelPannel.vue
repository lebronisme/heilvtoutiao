<template>
  <div>
    <!-- 我的频道版块 -->
    <div class="channel-container">
      <div class="title">
        <p>我的频道</p>
        <!-- 右侧点击按钮 -->
        <van-button
          round
          size="mini"
          plain
          type="danger"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <!-- 下方的栏目 -->
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 推荐频道版块 -->
    <div class="channel-container">
      <div class="title">
        <p>推荐频道</p>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannel" :key="item.id">
          <div class="inner van-ellipsis" @click="addFn(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/home'
export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllChannelsFn()
  },
  data () {
    return {
      recommendChannel: [],
      isCloseShow: false
    }
  },
  methods: {
    async getAllChannelsFn () {
      try {
        const res = await getAllChannels()
        // console.log('666', res)
        // 使用数组的过滤方法，如果获取到的所有频道列表数据中，当前项的id值不在channel中，那就将这个数据添加到recommendChannel中，这样二者的数据就不重合
        this.recommendChannel = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      } catch (err) {
        console.log(err)
      }
    },
    addFn (id) {
      // 触发点击的时候，获取当前项的id值，再从recommendChannel列表中找到这个数据的索引值，然后将其添加到channels的数据中，添加之后将其从recommendChannel列表中删除
      const index = this.recommendChannel.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannel[index])
      this.recommendChannel.splice(index, 1)
    },
    // 给inner绑定点击事件，当标签是完成和编辑状态的时候，都可以进行操作，传入的index为当前被操作项的索引值
    onClick (index) {
      if (this.isCloseShow) {
        // 如果处于编辑状态，进行删除功能
        const arr = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannel.push(arr)
        // 如果删除的栏目是当前高亮的栏目之前的，就把active的值减1
        if (index < this.active) {
          this.$emit('delChannel', this.active - 1)
        }
      } else {
        // 否则进行高亮操作
        this.$emit('changeActive', index)
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
.channel-container {
  .title {
    display: flex;
    padding: 30px 16px 48px 24px;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
    }
    .van-button {
      width: 103px;
      height: 48px;
      line-height: 48px;
      border-radius: 20px;
    }
  }
  .van-col {
    margin-bottom: 15px;
    .inner {
      width: 160px;
      height: 86px;
      margin-left: 14px;
      background-color: #f4f5f6;
      border-radius: 6px;
      font-size: 28px;
      font-weight: 400;
      text-align: center;
      line-height: 86px;
      color: #222222;
      position: relative;
      .van-icon-close {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
      }
    }
  }
}
</style>
