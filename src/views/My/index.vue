<template>
  <div>
    <!-- 登录后的样式 -->
    <div class="topHeader header-login" v-if="user && user.token">
      <div class="avator">
        <div class="avator-left">
          <van-image round :src="userInfo.photo" />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="avator-button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录的样式 -->
    <div class="topHeader header-notlogin" v-else>
      <div class="unloginBox" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group> <van-cell title="消息通知" is-link /> </van-cell-group>
    <van-cell title="小智同学" is-link />
    <van-button type="default" block v-if="user && user.token" @click="loginOut"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  created () {
    // 刚打开页面的时候，立刻检验本地token是否存在
    this.getUserInfoFn()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async loginOut () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) { console.log(err) }
    },
    // 刚打开页面的时候，立刻检验本地token是否存在
    async getUserInfoFn () {
      if (this.user && this.user.token) {
        try {
          const res = await getUserInfo()
          console.log('res', res)
          this.userInfo = res.data.data
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.topHeader {
  width: 750px;
  height: 401px;
  background: rgba(77, 164, 251, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
  .unloginBox {
    display: flex;
    padding-top: 148px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 132px;
      height: 132px;
      padding: 0;
      margin: 0;
      margin-bottom: 15px;
    }
    p {
      text-align: center;
      width: 145px;
      height: 28px;
      color: #ffffff;
      font-size: 28px;
    }
  }
}
.header-login {
  padding-top: 116px;
  .avator {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avator-left {
      display: flex;
      align-items: center;
      .van-image {
        width: 100px;
        height: 100px;
        margin-right: 22px;
      }
      span {
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }

    .avator-button {
      width: 116px;
      height: 32px;
      font-size: 20px;
      text-align: center;
      line-height: 32px;
      background-color: #ffffff;
      border-radius: 16px;
      color: #666666;
      font-weight: normal;
    }
  }
  .list {
    display: flex;
    li {
      text-align: center;
      flex: 1;
      p {
        font-weight: 400;
        color: #ffffff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
.van-cell-group {
  margin: 9px 0;
}
</style>
