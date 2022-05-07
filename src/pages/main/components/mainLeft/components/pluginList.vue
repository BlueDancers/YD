<template>
  <div class="plugin_list">
    <el-form class="list_search">
      <el-form-item label="名称：">
        <el-input v-model="searchForm.compName" class="default_input" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="搜索范围：">
        <el-radio-group v-model="searchForm.isOpen">
          <el-radio :label="true">全部</el-radio>
          <el-radio :label="false">本群组</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="searchData">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="plugin_cont">
      <div class="plugin_item" v-for="item in compList" :key="item._id">
        <div class="plugin_comp flex_center">
          <comp-dom :item="item.content"></comp-dom>
          <div class="comp_use">
            <el-button class="comp_use_btn" @click="useTemp(item.content, item.compName)">使用</el-button>
          </div>
        </div>
        <div class="comp_info">
          <p>名称：{{ item.compName }}</p>
          <p>创建时间：{{ parseTime(item.createTime, {}) }}</p>
        </div>
        <div class="comp_active">
          <el-button @click="deletePlugin(item._id)" type="warning" v-if="item._openid == userData.uid">
            删除
          </el-button>
        </div>
      </div>
      <el-empty v-if="compList.length == 0" description="这里空空如也" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getStorageSync } from '@/modules/storage'
import { useMain } from '@/store/main'
import { deepClone, guid, parseTime } from '@/utils'
import { useCloud } from '@/utils/request'
import { log } from 'console'
import { Action, ElMessageBox } from 'element-plus'
import { onMounted, reactive, Ref, ref } from 'vue'
import CompDom from '../../mainCore/components/compDom.vue'

const main = useMain()

const searchForm = reactive({
  compName: '',
  isOpen: true,
})

const compList: Ref<any[]> = ref([])

let userData = getStorageSync('userData')

onMounted(() => {
  init()
})

function init() {
  let data: any = {}
  if (searchForm.compName) {
    data.compName = searchForm.compName
  }
  if (!searchForm.isOpen) {
    data.organizeId = main.organizeId
  }

  useCloud('pluginList')
    .where(data)
    .get()
    .then((res) => {
      console.log(res)
      compList.value = res.data
    })
}

function searchData() {
  init()
}

// 删除插件
function deletePlugin(_id) {
  ElMessageBox.alert('确定删除吗？', '温馨提示', {
    confirmButtonText: '确定',
    callback: (action: Action) => {
      if (action == 'confirm') {
        useCloud('pluginList')
          .doc(_id)
          .remove()
          .then((res) => {
            console.log('删除成功', res)

            init()
          })
      }
    },
  })
}

// 使用组件
function useTemp(content, title) {
  content.id = guid()
  content.showTitle = title
  main.template.push(deepClone(content))
}
</script>

<style lang="less" scoped>
.plugin_list {
  .list_search {
    padding: 10px;
    padding-bottom: 0px;
    border-bottom: 1px solid #eee;
  }
  .plugin_cont {
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100vh - 220px);
    .plugin_item {
      position: relative;
      margin: 0 10px;
      margin-top: 10px;
      padding: 0px;
      border: 1px solid #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      .plugin_comp {
        box-sizing: border-box;
        min-height: 100px;
        padding: 20px 10px;
        position: relative;
        width: 100%;
        &:hover {
          .comp_use {
            display: block;
            background: rgba(0, 0, 0, 0.8);
          }
        }
        .comp_use {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: none;
          .comp_use_btn {
            width: 210px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .comp_info {
        box-sizing: border-box;
        width: 100%;
        margin-top: 10px;
        padding: 10px;

        border-top: 1px solid #eee;
        p {
          font-size: 14px;
          line-height: 20px;
        }
      }
      .comp_active {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
