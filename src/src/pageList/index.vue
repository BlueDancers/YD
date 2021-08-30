<template>
  <div class="padd">
    <a-button type="primary" @click="newPage">新建页面</a-button>
  </div>
  <a-table row-key="_id" :columns="columns" :data-source="listData" bordered class="marg">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #action="{ record }">
      <a-button type="primary" @click="gotoUpdate(record)">编辑</a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloud } from '@/modules/request'

export default defineComponent({
  setup() {
    onMounted(() => {
      init()
    })

    // 统一依赖
    const db = cloud.database()
    const route = useRoute()
    const router = useRouter()
    /**
     * 新建页面
     */
    async function newPage() {
      await db
        .collection('pageList')
        .add({
          organizeId: route.query.id, // 群组id
          router: '', // 自定义路由名称
          routerName: '', // 自定义网页名称
          disp: '', // 描述阻断
          content: [], // 页面数据
        })
        .then((res: any) => {
          console.log(res)
          router.push({
            name: 'content',
            query: {
              id: res.id,
            },
          })
        })
    }
    // 表格部分逻辑
    const columns = [
      {
        title: '页面id',
        dataIndex: '_id',
      },
      {
        title: '页面描述',
        dataIndex: 'disp',
      },
      {
        title: '页面路由',
        dataIndex: 'router',
      },
      {
        title: '页面描述',
        dataIndex: 'disp',
      },
      {
        title: '页面名称',
        dataIndex: 'routerName',
      },
      {
        title: '操作',
        slots: { customRender: 'action' },
      },
    ]
    // 表格数据
    const listData: Ref<any> = ref([])
    // 请求数据
    async function init() {
      await db
        .collection('pageList')
        .where({
          organizeId: route.query.id,
        })
        .get()
        .then((res) => {
          console.log(res)
          listData.value = res.data
        })
    }
    function gotoUpdate(data) {
      router.push({
        name: 'content',
        query: {
          id: data._id,
        },
      })
    }
    return {
      columns,
      newPage,
      listData,
      gotoUpdate,
    }
  },
})
</script>

<style scoped></style>
