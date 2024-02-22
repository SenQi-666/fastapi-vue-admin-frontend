<template>
  <page-header />
  <div class="table-search-wrapper">
    <a-card :bordered="false">
      <a-form :model="formState" @finish="onFinish">
        <a-row>
          <a-col flex="0 1 400px">
            <a-form-item name="name" label="名称" style="max-width: 300px;">
              <a-input v-model:value="formState.name" placeholder="请输入名称" allowClear></a-input>
            </a-form-item>
          </a-col>
          <a-col flex="0 1 400px">
            <a-form-item name="available" label="状态" style="max-width: 300px;">
              <a-select v-model:value="formState.available" placeholder="全部" allowClear>
                <a-select-option value="true">启用</a-select-option>
                <a-select-option value="false">停用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="resetFields">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>

  <div class="table-wrapper">
    <a-card title="菜单列表" :bordered="false" :headStyle="{ borderBottom: 'none', padding: '20px 24px' }"
      :bodyStyle="{ padding: '0 24px', minHeight: 'calc(100vh - 400px)' }">
      <a-table v-if="menuTreeData && menuTreeData.length" :rowKey="record => record.id" :columns="columns"
        :data-source="menuTreeData" :row-selection="rowSelection" @change="handleTableChange"
        :scroll="{ x: 500, y: 'calc(100vh - 500px)' }" :pagination="false" :defaultExpandAllRows="true" :style="{ minHeight: '500px' }">
        <template v-slot:bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.dataIndex === 'type'">
            <a-tag :color="record.type === 1 ? 'blue' : (record.type === 2 ? 'green' : 'orange')"> {{ record.type === 1 ? '目录' : (record.type === 2 ? '功能' : '权限') }}
            </a-tag>
          </template>
          <template v-if="column.dataIndex === 'available'">
            <span><a-badge :color="record.available ? 'green' : 'red'" /> {{ record.available ? '启用' :
              '禁用' }}
            </span>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link">修改</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, unref } from 'vue';
import PageHeader from '../../../components/PageHeader.vue';
import { list_convert_tree } from '../../../utils/util.js';
import type { TableColumnsType } from 'ant-design-vue';
import { Table } from 'ant-design-vue';

export default {
  name: "Menu",
  components: {
    PageHeader: PageHeader
  },

  setup() {
    interface DataType {
      id: number;
      name: string;
      icon?: string;
      order: number;
      type: number;
      permission: string;
      available: boolean;
      description?: string;
      children?: DataType[];
    }

    const columns: TableColumnsType = [
      {
        title: '菜单名称',
        dataIndex: 'name',
      },
      {
        title: '图标',
        dataIndex: 'icon',
        align: 'center'
      },
      {
        title: '显示排序',
        dataIndex: 'order',
        align: 'center'
      },
      {
        title: '菜单类型',
        dataIndex: 'type',
        align: 'center'
      },
      {
        title: '权限标识',
        dataIndex: 'permission',
        align: 'center'
      },
      {
        title: '状态',
        dataIndex: 'available',
        align: 'center'
      },
      {
        title: '备注',
        dataIndex: 'description',
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        fixed: 'right',
        width: 100
      }
    ];

    const dataSource = [
      {
        "created_at": "2024-02-18 17:40:18",
        "updated_at": "2024-02-18 17:40:20",
        "id": 1,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "仪表盘",
        "type": 1,
        "icon": "",
        "order": 1,
        "permission": "",
        "parent_id": null,
        "available": true
      },
      {
        "created_at": "2024-02-18 17:41:30",
        "updated_at": "2024-02-18 17:41:32",
        "id": 2,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "工作台",
        "type": 2,
        "icon": "",
        "order": 1,
        "permission": "",
        "parent_id": 1,
        "available": true
      },
      {
        "created_at": "2024-01-10 15:17:48",
        "updated_at": "2024-01-10 15:17:48",
        "id": 4,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "菜单管理",
        "type": 2,
        "icon": "",
        "order": 1,
        "permission": "",
        "parent_id": 3,
        "available": true
      },
      {
        "created_at": "2024-01-10 15:17:48",
        "updated_at": "2024-01-10 15:17:48",
        "id": 3,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "系统管理",
        "type": 1,
        "icon": "",
        "order": 2,
        "permission": "",
        "parent_id": null,
        "available": true
      },
      {
        "created_at": "2024-01-17 17:52:42",
        "updated_at": "2024-01-17 17:52:44",
        "id": 5,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "部门管理",
        "type": 2,
        "icon": "",
        "order": 2,
        "permission": "",
        "parent_id": 3,
        "available": true
      },
      {
        "created_at": "2024-01-17 17:54:17",
        "updated_at": "2024-01-17 17:54:20",
        "id": 6,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "岗位管理",
        "type": 2,
        "icon": "",
        "order": 3,
        "permission": "",
        "parent_id": 3,
        "available": true
      },
      {
        "created_at": "2024-01-17 17:54:51",
        "updated_at": "2024-01-17 17:54:53",
        "id": 7,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "角色管理",
        "type": 2,
        "icon": "",
        "order": 4,
        "permission": "",
        "parent_id": 3,
        "available": true
      },
      {
        "created_at": "2024-01-17 17:54:51",
        "updated_at": "2024-01-17 17:54:53",
        "id": 8,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "用户管理",
        "type": 2,
        "icon": "",
        "order": 5,
        "permission": "",
        "parent_id": 3,
        "available": true
      },
      {
        "created_at": "2024-01-17 17:54:51",
        "updated_at": "2024-01-17 17:54:53",
        "id": 9,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "操作日志",
        "type": 2,
        "icon": "",
        "order": 6,
        "permission": "",
        "parent_id": 3,
        "available": true
      }
    ]

    const menuTreeData = ref<DataType[]>([])
    menuTreeData.value = list_convert_tree(dataSource)

    const expand = ref(false);

    interface formData {
      name?: string
      available?: string
    }

    const formState: formData = reactive({
      name: "",
      available: "true"
    });
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
      console.log('formState: ', formState);
    };

    const resetFields = () => {
      Object.keys(formState).forEach((key: string) => {
        delete formState[key];
      });
      formState.available = "true"
      console.log(formState)
    }

    const handleTableChange = (item: any) => {
      console.log(item);
    }

    const selectedRowKeys = ref<DataType['id'][]>([]);

    const onSelectChange = (selectingRowKeys: DataType['id'][], selectingRows: DataType[]) => {
      console.log(`selectingRowKeys: ${selectingRowKeys}`, 'selectingRows: ', selectingRows);
      selectedRowKeys.value = selectingRowKeys;
    }

    const rowSelection = computed(() => {
      return {
        checkStrictly: false,
        onChange: onSelectChange,
      }
    });

    return {
      columns,
      dataSource,
      menuTreeData,
      formState,
      onFinish,
      expand,
      resetFields,
      handleTableChange,
      rowSelection,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-search-wrapper {
  margin-block-end: 16px;
}
</style>