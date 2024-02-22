<template>
  <a-layout>
    <div class="container">
      <a-layout-content :style="contentStyle">
        <div class="header">
          <div class="logo">
            <a-image
              src="https://preview.pro.ant.design/logo.svg"
              :preview="false"
            />
          </div>
          <div class="title">Ant Design</div>
        </div>
        <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>

        <div class="login-main" style="width: 330px; margin: 0 auto;">
          <a-tabs :v-model="activeKey" centered>
            <a-tab-pane :key="1" tab="账户密码登录">
              <a-form
                :model="formState"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item name="username" :rules="[{ required: true, message: '用户名是必填项！' }]">
                  <a-input v-model:value="formState.username" placeholder="用户名: admin or user">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item name="password" :rules="[{ required: true, message: '密码是必填项！' }]">
                  <a-input-password v-model:value="formState.password" placeholder="密码: ant.design">
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>

                <a-form-item>
                  <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember"
                      >自动登录</a-checkbox
                    >
                  </a-form-item>
                  <a class="login-form-forgot" href="">忘记密码 ?</a>
                </a-form-item>

                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                  >
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>

            <a-tab-pane :key="2" tab="手机号登录">
              <a-form
                :model="formState"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item name="mobile" :rules="[{ required: true, message: '手机号是必填项！' }]">
                  <a-input v-model:value="formState.mobile" placeholder="请输入手机号！">
                    <template #prefix>
                      <MobileOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item name="code" :rules="[{ required: true, message: '验证码是必填项！' }]">
                  <a-space-compact block>
                    <a-input v-model:value="formState.code" placeholder="请输入验证码！" :style="{ width: 'calc(95% + 400px)' }">
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                  <a-button type="primary" :loading="sendCodeLoading" @click="sendSmsCode" style="width: 100%;">获取验证码</a-button>
                  </a-space-compact>
                </a-form-item>

                <a-form-item>
                  <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember"
                      >自动登录</a-checkbox
                    >
                  </a-form-item>
                  <a class="login-form-forgot" href="">忘记密码 ?</a>
                </a-form-item>

                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                  >
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-layout-content>

      <a-layout-footer :style="footerStyle">
        <div class="footer-list">
          <a-button type="link">Ant Design Pro</a-button>
          <a-button type="link"
            ><span
              ><icon-font
                type="icon-github-fill"
                :style="{ fontSize: '16px' }" /></span
          ></a-button>
          <a-button type="link">Ant Design</a-button>
        </div>
        <div class="footer-copyright">
          <icon-font type="icon-copyright" :style="{ fontSize: '16px' }" />
          Powered by Ant Desgin
        </div>
      </a-layout-footer>
    </div>
  </a-layout>
</template>

<script lang="ts">
import type { CSSProperties } from "vue";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { UserOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons-vue';

export default {
  name: "LoginLayout",
  components: {
    UserOutlined: UserOutlined,
    MobileOutlined: MobileOutlined,
    LockOutlined: LockOutlined
  },

  setup() {
    const router = useRouter()

    const contentStyle: CSSProperties = {
      minHeight: 850,
      height: "850px",
      background: "none",
      padding: "35px 0",
    };
    const footerStyle: CSSProperties = {
      textAlign: "center",
      background: "none",
    };

    const activeKey = ref(1);

    interface FormState {
      username: string;
      password: string;
      mobile: string;
      code: string;
      remember: boolean;
    }
    const formState = reactive<FormState>({
      username: "",
      password: "",
      mobile: "",
      code: "",
      remember: true,
    });
    const onFinish = (values: any) => {
      console.log("Success:", values);
      router.push('/')
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };

    const sendCodeLoading = ref<boolean>(false)
    const sendSmsCode = () => {
      console.log("发送验证码")
    }

    return {
      contentStyle,
      footerStyle,
      activeKey,
      formState,
      sendCodeLoading,
      onFinish,
      onFinishFailed,
      sendSmsCode
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-btn-link {
  color: rgba(0, 0, 0, 0.65);
  margin-inline-end: 8px;
}
.ant-btn {
  padding: 0;
}
.container {
  background-image: url(https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr);
  background-size: 100% 100%;
  .desc {
    text-align: center;
    font-size: 15px;
    margin-block-start: 12px;
    margin-block-end: 40px;
  }
  .header {
    display: flex;
    line-height: 44px;
    justify-content: center;
    align-items: center;
    .logo {
      width: 44px;
      height: 44px;
      margin-inline-end: 16px;
    }
    .title {
      font-size: 33px;
      font-weight: 650;
    }
  }
}
.login-form-button {
  width: 100%;
}
.login-form-forgot {
  float: right;
}
</style>