<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default {
  name: "App",
  components: {
    AConfigProvider: ConfigProvider
  },

  data() {
    return {
      locale: zhCN,
    };
  }

};
</script>

<style>
 * {
  margin: 0;
  padding: 0;
 }
 body,html {
  margin: 0;
  width: 100%;
  height: 100vh;
}
.ant-page-header {
  padding: 20px 0;
}
</style>