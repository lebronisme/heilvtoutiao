<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <!-- //手机输入框 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '这尼玛是你的手机号？',
          },
        ]"
        ><template #left-icon>
          <HeilvIcon name="shouji"></HeilvIcon>
        </template>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度为6位' },
        ]"
      >
        <!-- 最左侧的icon小图标 --><template #left-icon>
          <HeilvIcon name="yanzhengma"></HeilvIcon>
        </template>
        <template #button>
          <van-count-down
            v-if="isCountDown"
            :time="time"
            format="ss秒后重新发送"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            size="small"
            class="yzm"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 提交button按钮 -->
      <div style="margin: 16px">
        <van-button round block class="login-btn" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '18698566366',
      code: '246810',
      time: 10 * 1000,
      isCountDown: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        // console.log('校验通过')
        this.isCountDown = true
        try {
          await getSmsCode(this.mobile)
          Toast.fail('发送成功')
        } catch (err) {
          console.log(err)
          Toast.fail('发送失败,请重试')
        }
      } catch (err) {
        console.log(err)
        // console.log('校验失败')
        Toast.fail('手机号码不正确')
        // this.$toast.fail('手机号码不正确')
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
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  // font-size: 22px;
  background-color: #ededed;
  border-radius: 23px;
  color: #666;
  position: fixed;
  right: 10px;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #3296fa;
  border-radius: 10px;
  font-size: 24px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 10px;
}
</style>
