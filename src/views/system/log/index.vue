<template>
  <page-header />
  <div class="table-search-wrapper">
    <a-card :bordered="false">
      <a-form :model="formState" @finish="onFinish">
        <a-row>
          <a-col flex="0 1 500px">
            <a-form-item name="request_path" label="请求路径" style="max-width: 300px;">
              <a-input v-model:value="formState.request_path" placeholder="请输入请求路径" allowClear></a-input>
            </a-form-item>
          </a-col>
          <a-col flex="0 1 500px">
            <a-form-item name="creator" label="创建人" style="max-width: 300px;">
              <a-select v-model:value="formState.creator_name" placeholder="请选择创建人" :open="false" @click="showCreatorModal = true">
                <template #suffixIcon>
                  <search-outlined />
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col flex="0 1 500px">
            <a-form-item name="date-range-picker" label="创建日期" style="max-width: 350px;">
              <a-range-picker v-model:value="formState.date_range" value-format="YYYY-MM-DD" />
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
    <a-card title="日志列表" :bordered="false" :headStyle="{ borderBottom: 'none', padding: '20px 24px' }"
      :bodyStyle="{ padding: '0 24px', minHeight: 'calc(100vh - 400px)' }">
      <a-table :rowKey="record => record.id" :columns="columns" :data-source="dataSource"
        @change="handleTableChange" :scroll="{ x: 500, y: 'calc(100vh - 500px)' }" :pagination="pagination"  :style="{ minHeight: '500px' }">
        <template v-slot:bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link">修改</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>

  <a-modal title="选择创建人" v-model:open="showCreatorModal" @ok="creatorHandle" :centered="true" width="1200px">
    <template #footer>
      <a-button @click="showCreatorModal = false">取消</a-button>
      <a-button @click="clearCreator">清空</a-button>
      <a-button type="primary" @click="creatorHandle">确定</a-button>
    </template>
    <div class="table-search-wrapper">
      <a-card :bordered="true">
      <a-form :model="creatorFormState" @finish="creatorFormOnFinish">
        <a-row>
          <a-col flex="0 1 400px">
            <a-form-item name="creator_name" label="姓名" style="max-width: 300px;">
              <a-input v-model:value="creatorFormState.name" placeholder="请输入姓名" allowClear></a-input>
            </a-form-item>
          </a-col>
          <a-col flex="0 1 400px">
            <a-form-item name="available" label="状态" style="max-width: 300px;">
              <a-select v-model:value="creatorFormState.available" placeholder="全部" allowClear>
                <a-select-option value="true">启用</a-select-option>
                <a-select-option value="false">停用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="resetCreatorForm">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    </div>
    <div class="table-wrapper">
      <a-card title="用户列表" :bordered="true" :headStyle="{ borderBottom: 'none', padding: '20px 24px' }"
      :bodyStyle="{ padding: '0 24px' }">
      <a-table :rowKey="record => record.id" :columns="userColumns" :data-source="userDataSource"
        :row-selection="rowSelection" @change="handleTableChange" :scroll="{ x: 500, y: 'calc(100vh - 500px)' }" :pagination="userPagination">
        <template v-slot:bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.dataIndex === 'available'">
            <span><a-badge :color="record.available ? 'green' : 'red'" /> {{ record.available ? '启用' : '禁用' }}
            </span>
          </template>
        </template>
      </a-table>
    </a-card>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { ref, reactive, computed, unref } from 'vue';
import PageHeader from '../../../components/PageHeader.vue';
import type { TableColumnsType } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
  name: "Log",
  components: {
    PageHeader: PageHeader,
    SearchOutlined: SearchOutlined
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
        title: '请求地址',
        dataIndex: 'request_path',
        align: 'center'
      },
      {
        title: '请求方法',
        dataIndex: 'request_method',
        align: 'center'
      },
      {
        title: 'IP地址',
        dataIndex: 'request_ip',
        align: 'center'
      },
      {
        title: '浏览器',
        dataIndex: 'request_browser',
        align: 'center'
      },
      {
        title: '系统',
        dataIndex: 'request_os',
        align: 'center'
      },
      {
        title: '响应码',
        dataIndex: 'response_code',
        align: 'center'
      },
      {
        title: '返回信息',
        dataIndex: 'response_json',
        align: 'center',
        width: 400,
        ellipsis: true
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
      "created_at": "2024-02-07 17:27:50",
      "updated_at": "2024-02-07 17:27:50",
      "id": 368,
      "description": null,
      "creator": {
        "id": 1,
        "name": "森七"
      },
      "request_path": "/api/system/role/list",
      "request_method": "GET",
      "request_payload": "",
      "request_ip": "127.0.0.1",
      "request_os": "Windows 10",
      "request_browser": "Chrome 121.0.0",
      "response_code": 200,
      "response_json": "{\"code\":200,\"total\":4,\"page\":1,\"page_size\":10,\"has_next\":false,\"data\":[{\"created_at\":\"2024-01-11 16:28:05\",\"updated_at\":\"2024-01-11 16:53:05\",\"id\":1,\"description\":null,\"creator\":{\"id\":1,\"name\":\"森七\"},\"name\":\"管理员\",\"order\":1,\"available\":true},{\"created_at\":\"2024-01-18 10:57:48\",\"updated_at\":\"2024-01-18 10:57:50\",\"id\":2,\"description\":null,\"creator\":{\"id\":1,\"name\":\"森七\"},\"name\":\"董事长\",\"order\":2,\"available\":true},{\"created_at\":\"2024-01-18 10:59:01\",\"updated_at\":\"2024-01-18 10:59:03\",\"id\":3,\"description\":null,\"creator\":{\"id\":1,\"name\":\"森七\"},\"name\":\"运营主管\",\"order\":3,\"available\":true},{\"created_at\":\"2024-01-18 10:59:42\",\"updated_at\":\"2024-01-18 10:59:44\",\"id\":4,\"description\":null,\"creator\":{\"id\":1,\"name\":\"森七\"},\"name\":\"运营人员\",\"order\":4,\"available\":true}],\"message\":\"success\"}"
    },
    {
      "created_at": "2024-02-07 17:24:50",
      "updated_at": "2024-02-07 17:24:50",
      "id": 367,
      "description": null,
      "creator": {
        "id": 1,
        "name": "森七"
      },
      "request_path": "/api/system/auth/login",
      "request_method": "POST",
      "request_payload": "{}",
      "request_ip": "127.0.0.1",
      "request_os": "Windows 10",
      "request_browser": "Chrome 121.0.0",
      "response_code": 200,
      "response_json": "{\"access_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZW5xaSIsImlzX3JlZnJlc2giOmZhbHNlLCJleHAiOjE3MDc3Mjk4OTB9.Znp_JOwoz8fnlMQkoWd97EYH3X5yNV40tkftnlZSGtM\",\"refresh_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZW5xaSIsImlzX3JlZnJlc2giOnRydWUsImV4cCI6MTcwNzkwMjY5MH0.GCjlRt5Q3zJdzOVALTuHS0g7Qy7Zd4sDlhzrsr29nbk\",\"token_type\":\"Bearer\",\"expires_in\":432000}"
    },
    {
      "created_at": "2024-02-07 16:42:32",
      "updated_at": "2024-02-07 16:42:32",
      "id": 366,
      "description": null,
      "creator": {
        "id": 1,
        "name": "森七"
      },
      "request_path": "/api/system/auth/login",
      "request_method": "POST",
      "request_payload": "{}",
      "request_ip": "127.0.0.1",
      "request_os": "Windows 10",
      "request_browser": "Chrome 121.0.0",
      "response_code": 200,
      "response_json": "{\"access_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZW5xaSIsImlzX3JlZnJlc2giOmZhbHNlLCJleHAiOjE3MDc3MjczNTJ9.zYIt_b9Htb67P1TLRAI-u8c2rW6a2QjFz-Qp7icLFCY\",\"refresh_token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZW5xaSIsImlzX3JlZnJlc2giOnRydWUsImV4cCI6MTcwNzkwMDE1Mn0.Iiv0c-TtGkL2vdgLuZ3MnJJ7G3JWSGxK3xSR-SN9-7o\",\"token_type\":\"Bearer\",\"expires_in\":432000}"
    }
    ])
    const expand = ref(false);

    interface formData {
      request_path?: string
      creator?: number
      creator_name?: string
      date_range?: [string, string]
      end_time?: string
    }

    const formState: formData = reactive({});

    const showCreatorModal = ref<boolean>(false);

    interface creatorFormData {
      name?: string
      available?: string
    }
    const creatorFormState: creatorFormData = reactive({
      name: "",
      available: "true"
    });

    interface userDataType {
        id: number;
        name: string;
        available: string;
    }

    const userColumns: TableColumnsType = [
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        width: 80
      },
      {
        title: '姓名',
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: '状态',
        dataIndex: 'available',
        align: 'center'
      }
    ]
    const userDataSource: userDataType[] = reactive([
            {
                "created_at": "2024-01-12 09:09:03",
                "updated_at": "2024-01-30 13:13:06",
                "id": 1,
                "description": null,
                "username": "senqi",
                "name": "森七",
                "mobile": "17777777777",
                "email": "superadmin@example.com",
                "gender": 1,
                "is_superuser": true,
                "dept_id": 1,
                "available": true
            },
            {
                "created_at": "2024-01-12 13:27:53",
                "updated_at": "2024-01-17 16:07:59",
                "id": 2,
                "description": null,
                "username": "test",
                "name": "测试",
                "mobile": "17777777777",
                "email": "test@example.com",
                "gender": 2,
                "is_superuser": false,
                "dept_id": 3,
                "available": true
            }
        ]);

    for (var i = 100; i > 2; i--) {
        userDataSource.push({
            "created_at": "2024-01-12 13:27:53",
            "updated_at": "2024-01-17 16:07:59",
            "id": i,
            "description": null,
            "username": "test",
            "name": "测试",
            "mobile": "17777777777",
            "email": "test@example.com",
            "gender": 2,
            "is_superuser": false,
            "dept_id": 3,
            "available": true
        })
    }

    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
      console.log('formState: ', formState);
    };

    const creatorFormOnFinish = (values: any) => {
      console.log('Received values of form: ', values);
      console.log('creatorFormState: ', creatorFormState);
    }

    const resetCreatorForm = () => {
      Object.keys(creatorFormState).forEach((key: string) => {
          delete creatorFormState[key];
      });
      creatorFormState.available = "true"
      console.log(formState)
    }

    const resetFields = () => {
      Object.keys(formState).forEach((key: string) => {
        delete formState[key];
      });
      console.log(formState)
      selectedUserKeys.value = [];
      selectedUserRow = undefined;
    }

    const clearCreator = () => {
      delete formState.creator;
      delete formState.creator_name;
      selectedUserKeys.value = [];
      selectedUserRow = undefined;
      showCreatorModal.value = false;
    }

    const pagination = reactive({
      defaultPageSize: 10,
      total: dataSource.length,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 总共 ${total} 条`
    })
    
    const userPagination = reactive({
      defaultPageSize: 10,
      total: userDataSource.length,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 总共 ${total} 条`
    })

    const handleTableChange = (item: any) => {
      console.log(item);
    }

    const creatorHandle = () => {
      if (!selectedUserKeys.value.length || !selectedUserRow) {
        return 
      }
      formState.creator = selectedUserKeys.value[0]
      formState.creator_name = selectedUserRow.name
      showCreatorModal.value = false;
    }

    const selectedUserKeys = ref<userDataType['id'][]>([]);
    let selectedUserRow: userDataType | undefined = undefined;

    const onSelectChange = (selectingUserKeys: userDataType['id'][], selectingUsers: userDataType[]) => {
      console.log(`selectingRowKeys: ${selectingUserKeys}`, 'selectingRows: ', selectingUsers);
      selectedUserKeys.value = selectingUserKeys;
      selectedUserRow = selectingUsers[0]
    }

    const rowSelection = computed(() => {
      return {
          selectedRowKeys: unref(selectedUserKeys),
          onChange: onSelectChange,
          hideDefaultSelections: true,
          type: 'radio'
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
      showCreatorModal,
      creatorHandle,
      clearCreator,
      creatorFormState,
      resetCreatorForm,
      userDataSource,
      userColumns,
      userPagination,
      creatorFormOnFinish,
      rowSelection
    };
  },
};
</script>

<style lang="scss" scoped>
.table-search-wrapper {
  margin-block-end: 16px;
}
</style>