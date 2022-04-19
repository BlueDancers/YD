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
            <el-popover v-else placement="top" :width="300" trigger="click">
              <template #reference>
                <el-button type="info" size="small">加入组织</el-button>
              </template>
              <div class="flex_center">
                <el-input placeholder="请输入密码" v-model="groupPass"></el-input>
                <el-button
                  :style="{
                    'margin-left': '10px',
                  }"
                  :disabled="groupPass == ''"
                  @click="joinGroup(scope.row._id)"
                >
                  确定
                </el-button>
              </div>
            </el-popover>
            <el-popover placement="top" :width="300" trigger="click">
              <template #reference>
                <el-button type="info" size="small">删除组织</el-button>
              </template>
              <div class="flex_center">
                <el-input placeholder="请输入密码" v-model="delPass"></el-input>
                <el-button
                  :style="{
                    'margin-left': '10px',
                  }"
                  :disabled="delPass == ''"
                  v-if="scope.row.founderUser.includes(userData.uid)"
                  type="danger"
                  @click="del(scope.row._id)"
                >
                  删除
                </el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_pagin">
        <el-pagination background layout="prev, pager, next" :total="pagination.total" />
      </div>
    </div>
    <!-- 创建组织 -->
    <create-team ref="createOrg" @createInit="init"></create-team>
  </div>
</template>

<script setup lang="ts">
import { getStorageSync } from '@/modules/storage'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, Ref, ref } from 'vue'
import { useCloud } from '@/utils/request'
import createTeam from './components/createTeam.vue'

let userData = getStorageSync('userData')
let tableData: Ref<any[]> = ref([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
})
const groupPass = ref('') // 加入组织密码
const delPass = ref('') //删除组织密码
const createOrg = ref()

onMounted(() => {
  init()
})

async function init() {
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
}

//新建组织
function addGroup() {
  createOrg.value.open()
}

/**
 * 加入群组
 */
async function joinGroup(id) {
  // 查询密码是否正确
  let currentData = await useCloud('organize')
    .where({
      _id: id,
      password: groupPass.value,
    })
    .get()
  if (currentData.data.length == 1) {
    // 密码正确 加入组织
    let { founderUser } = currentData.data[0]
    founderUser.push(userData.uid)
    await useCloud('organize')
      .where({
        _id: id,
      })
      .update({
        founderUser: founderUser,
      })
      .then((res) => {
        console.log(res)
        ElMessage.success('加入成功~')
      })
  } else {
    ElMessage.error('密码错误')
  }
}

//删除
async function del(id) {
  // 查询密码是否正确
  let currentData = await useCloud('organize')
    .where({
      _id: id,
      password: delPass.value,
    })
    .get()
  console.log(currentData)
  if (currentData.data.length == 1) {
    // 密码正确 加入组织
    await useCloud('organize')
      .doc(id)
      .remove()
      .then((res) => {
        ElMessage.success('删除成功~')
        console.log(res)
        init()
      })
  } else {
    ElMessage.error('密码错误')
  }
}
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
