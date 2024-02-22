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
    <a-card title="岗位列表" :bordered="false" :headStyle="{ borderBottom: 'none', padding: '20px 24px' }"
      :bodyStyle="{ padding: '0 24px', minHeight: 'calc(100vh - 400px)' }">
      <a-table :rowKey="record => record.id" :columns="columns" :data-source="dataSource" :row-selection="rowSelection"
        @change="handleTableChange" :scroll="{ x: 500, y: 'calc(100vh - 500px)' }" :pagination="pagination" :style="{ minHeight: '500px' }">
        <template v-slot:bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <span>{{ index + 1 }}</span>
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
import type { TableColumnsType } from 'ant-design-vue';
import { Table } from 'ant-design-vue';

export default {
  name: "Position",
  components: {
    PageHeader: PageHeader
  },

  setup() {
    interface DataType {
      id: number;
      name: string;
      order: number;
      description?: string;
      available: boolean;
    }

    const columns: TableColumnsType = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        width: 80
      },
      {
        title: '名称',
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: '排序',
        dataIndex: 'order',
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

    const dataSource: DataType[] = reactive([
      {
        "created_at": "2024-01-12 09:43:04",
        "updated_at": "2024-01-12 09:43:06",
        "id": 1,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "董事长",
        "order": 1,
        "available": true
      },
      {
        "created_at": "2024-01-12 09:43:22",
        "updated_at": "2024-01-12 09:43:24",
        "id": 2,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "运营岗",
        "order": 2,
        "available": true
      },
      {
        "created_at": "2024-01-18 10:54:46",
        "updated_at": "2024-01-18 10:54:49",
        "id": 3,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "销售岗",
        "order": 3,
        "available": true
      },
      {
        "created_at": "2024-01-18 10:55:10",
        "updated_at": "2024-01-18 10:55:12",
        "id": 4,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "人事行政岗",
        "order": 4,
        "available": true
      },
      {
        "created_at": "2024-01-18 10:55:46",
        "updated_at": "2024-01-18 10:55:48",
        "id": 5,
        "description": null,
        "creator": {
          "id": 1,
          "name": "森七"
        },
        "name": "开发岗",
        "order": 5,
        "available": true
      }
    ]);

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

    const pagination = reactive({
      defaultPageSize: 10,
      total: dataSource.length,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 总共 ${total} 条`
    })

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
        selectedRowKeys: unref(selectedRowKeys),
        onChange: onSelectChange,
        hideDefaultSelections: true,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE
        ]
      }
    });

    return {
      columns,
      dataSource,
      formState,
      onFinish,
      expand,
      resetFields,
      pagination,
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