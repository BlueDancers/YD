<template>
  <div class="padd page_list">
    <a-button type="primary" @click="newPage">新建页面</a-button>
  </div>
  <a-table row-key="_id" :columns="columns" :data-source="listData" bordered class="marg">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>

    <template #thmb="{ record }">
      <img class="thmb_img" :src="record.tumbUrl" />
    </template>
    <template #action="{ record }">
      <a-button :style="{ margin: '0 10px' }" type="primary" @click="gotoUpdate(record)">编辑</a-button>
      <a-popconfirm title="数据删除后将无法恢复" ok-text="删除" cancel-text="取消" @confirm="gotoDelete(record)">
        <a-button :style="{ margin: '0 10px' }" type="primary" danger>删除</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, Ref, ref, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloud } from '@/modules/request'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      init()
    })

    // 统一依赖
    const db = cloud.database()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 表格部分逻辑
    const columns = [
      {
        title: '页面缩略图',
        align: 'center',
        slots: { customRender: 'thmb' },
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
    const userData = computed(() => store.state.app.userData)
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
    /**
     * 新建页面
     */
    const newPage = async () => {
      await db
        .collection('pageList')
        .add({
          organizeId: route.query.id, // 群组id
          router: '', // 自定义路由名称
          routerName: '', // 自定义网页名称
          disp: '', // 描述阻断
          tumbUrl: '', // 缩略图
          backColor: '#ffffff',
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
    // 前往编辑
    function gotoUpdate(data) {
      router.push({
        name: 'content',
        query: {
          id: data._id,
        },
      })
    }
    // 删除页面
    async function gotoDelete(data) {
      if (userData.value.uid == data._openid) {
        await db
          .collection('pageList')
          .where({ _id: data._id })
          .remove()
          .then(() => {
            message.success('删除成功~')
            init()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        message.error('不可以删除别人创建的哦')
      }
    }
    return {
      columns,
      newPage,
      listData,
      gotoUpdate,
      gotoDelete,
    }
  },
})
</script>

<style lang="scss" scoped>
.page_list {
}
.thmb_img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>
