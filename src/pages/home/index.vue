<template>
  <div class="yd_home">
    <!-- 操作区 -->
    <div class="home_active">
      <el-button @click="addGroup" type="primary">新建组织</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="home_table">
      <el-table :data="tableData" :border="true" :stripe="true">
        <el-table-column prop="organizeName" label="组织名称" />
        <el-table-column prop="routerCode" label="父级路由" />
        <el-table-column prop="date" label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.founderUser.includes(userData.uid)" type="primary" size="small">
              查看页面
            </el-button>
            <el-button v-else type="info" size="small">加入组织</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_pagin">
        <el-pagination background layout="prev, pager, next" :total="pagination.total" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getStorageSync } from '@/modules/storage'
import { onMounted, reactive, Ref, ref } from 'vue'
import { useCloud } from '../../utils/request'

let userData = getStorageSync('userData')
let tableData: Ref<any[]> = ref([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
})

onMounted(async () => {
  // 获取页面长度
  const pageTotal = await useCloud('organize').count()
  pagination.total = pageTotal.total
  // 获取当前页面数据
  const groupData = await useCloud('organize')
    .field({
      founderName: true,
      organizeDisp: true,
      organizeName: true,
      routerCode: true,
      founderUser: true,
      _id: true,
    })
    .skip((pagination.current - 1) * 10)
    .limit(10)
    .get()
  console.log(groupData)
  tableData.value = groupData.data
})

function addGroup() {}
</script>

<style scoped lang="less">
.yd_home {
  .home_active {
    margin: 10px;
    padding: 10px;
    background-color: #fff;
  }
  .home_table {
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    .table_pagin {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
