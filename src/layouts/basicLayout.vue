<template>
  <a-layout>
    <a-layout-header class="header" style="display: flex">
      <div class="left-header">
        <a-button type="link" class="logo-btn">
          <a-image src="https://preview.pro.ant.design/logo.svg" :preview="false" :width="28" :height="28" />
          <h1 style="margin-left: 10px;">fastapi-vue-admin</h1>
        </a-button>
      </div>
      <div style="flex: 1 0 0%"></div>
      <div class="right-header">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <a-avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" :size="30" ></a-avatar>
            <span style="margin-left: 10px;">Serati Ma</span>
          </a>
          <template #overlay>
            <a-menu @click="logout">
              <a-menu-item key="1">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" :v-model="collapsed">
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light"
          :style="{ height: '100%', borderRight: 0 }" :items="menus" @click="handleClick"></a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 0 24px">
        <a-layout-content :style="{ minHeight: 'calc(100vh - 64px)' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { reactive, ref, watch } from "vue";
import type { MenuProps } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "BasicLayout",
  components: {},

  setup() {
    const router = useRouter();
    const route = useRoute();
    const current = [route.path]

    const selectedKeys = ref<string[]>(current);
    const openKeys = ref<string[]>(['sub1']);
    const collapsed = ref<boolean>(false);

    const menus = reactive([
      {
        key: 'sub1', label: '仪表盘', title: '仪表盘', children: [
          { key: '/dashboard/analysis', label: '分析页', title: '分析页' },
          { key: '/dashboard/workplace', label: '工作台', title: '工作台' }
        ]
      },
      {
        key: 'sub2', label: '系统管理', title: '系统管理', children: [
          { key: '/system/menu', label: '菜单管理', title: '菜单管理' },
          { key: '/system/dept', label: '部门管理', title: '部门管理' },
          { key: '/system/position', label: '岗位管理', title: '岗位管理' },
          { key: '/system/role', label: '角色管理', title: '角色管理' },
          { key: '/system/user', label: '用户管理', title: '用户管理' },
          { key: '/system/log', label: '操作日志', title: '操作日志' },
        ]
      },
    ])

    const logout: MenuProps["onClick"] = ({ key }) => {
      console.log(`Click on item ${key}`);
      router.push('/login')
    };

    const handleClick = ({ item, key, keyPath }) => {
      router.push(key)
      console.log(openKeys)
    }

    watch(() => route.path, (newPath, oldPath) => {
      if (newPath === '/workplace') {
        openKeys.value.splice(0, openKeys.value.length);
      }

      selectedKeys.value.splice(0, selectedKeys.value.length);
      selectedKeys.value.push(newPath);
    })

    return {
      selectedKeys,
      openKeys,
      collapsed,
      logout,
      handleClick,
      menus
    };
  },
};
</script>

<style lang="scss" scoped>
.left-header {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 10px;
}

.right-header {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.ant-dropdown-trigger {
  height: 50px;
  line-height: 50px;
}

.ant-dropdown-trigger:hover {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.03);
}

.ant-dropdown-link {
  color: rgba(0, 0, 0, 0.65);
}

.logo-btn {
  display: flex;
  align-items: center;
  width: 300px;
}

.header {
  background: rgba(255, 255, 255, 0.6);
}

.ant-btn-link {
  color: rgba(0, 0, 0, 0.65);
}

.ant-btn-link:hover {
  color: rgba(0, 0, 0, 0.65);
}

.ant-layout-header {
  padding-inline: 0;
}
</style>