<template>
  <page-header />
  <div class="tree-wrapper">
    <a-card title="部门列表" :bordered="false" :headStyle="{ borderBottom: 'none', padding: '20px 24px' }"
      :bodyStyle="{ padding: '0 24px 20px', minHeight: 'calc(100vh - 240px)' }">
      <a-tree
      v-if="deptTreeData && deptTreeData.length"
      :rowKey="record => record.id"
    :tree-data="deptTreeData"
    :show-line="true"
    :defaultExpandAll="true"
    :field-names="fieldNames"
    @check="handleTreeCheck"
    @select="handleTreeSelect"
    checkable
  >
  <template #title="{ name, available }">
    <span v-if="!available" style="color: rgb(255, 77, 79)">{{ name }}</span>
    <template v-else ><span style="color: rgba(0,0,0,.88)">{{ name }}</span></template>
  </template>
  </a-tree>
  </a-card>
  </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import PageHeader from '../../../components/PageHeader.vue'
import { list_convert_tree } from '../../../utils/util.js';

export default {
  name: "Dept",
  components: {
    PageHeader: PageHeader,
  },

  setup() {
    const fieldNames = {
      children: 'children',
      title: 'name',
      key: 'id'
    };
    const dataSource = [
    {
      "name": "开发一组",
      "order": 1,
      "parent_id": 2,
      "description": null,
      "id": 6,
      "available": true
    },
    {
      "name": "开发部",
      "order": 1,
      "parent_id": 1,
      "description": null,
      "id": 2,
      "available": true
    },
    {
      "name": "fastapi-react-admin团队",
      "order": 1,
      "parent_id": null,
      "description": null,
      "id": 1,
      "available": true
    },
    {
      "name": "运营部",
      "order": 2,
      "parent_id": 1,
      "description": null,
      "id": 3,
      "available": true
    },
    {
      "name": "开发二组",
      "order": 2,
      "parent_id": 2,
      "description": null,
      "id": 7,
      "available": true
    },
    {
      "name": "人事部",
      "order": 3,
      "parent_id": 1,
      "description": null,
      "id": 4,
      "available": true
    },
    {
      "name": "销售部",
      "order": 4,
      "parent_id": 1,
      "description": null,
      "id": 5,
      "available": false
    }
  ]

  interface DataType {
    id: number;
    name: string;
    children?: DataType[];
  }

  const deptTreeData = ref<DataType[]>([])
  deptTreeData.value = list_convert_tree(dataSource)

  const handleTreeCheck = (checkedKeys) => {
    console.log(checkedKeys)
  }

  const handleTreeSelect = (selectedKeys) => {
    console.log(selectedKeys)
  }
    return {
      deptTreeData,
      handleTreeCheck,
      handleTreeSelect,
      fieldNames
    };
  },
};
</script>
  
<style lang="scss" scoped></style>