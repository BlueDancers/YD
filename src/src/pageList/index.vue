<template>
  <div class="page_list">
    <page-header></page-header>
    <div class="padd marg">
      <a-button type="primary" @click="newPage">新建页面</a-button>
    </div>
    <a-table row-key="_id" :columns="columns" :data-source="listData" bordered class="padd marg">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #thmb="{ record }">
        <img class="thmb_img" :src="record.tumbUrl" />
      </template>
      <template #action="{ record }">
        <a-button :style="{ margin: '0 10px' }" type="primary" @click="gotoUpdate(record)">编辑</a-button>
        <a-popconfirm
          title="数据删除后将无法恢复"
          ok-text="删除"
          cancel-text="取消"
          @confirm="gotoDelete(record)"
        >
          <a-button :style="{ margin: '0 10px' }" type="primary" danger>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/header.vue'
import { useCloud } from '@/utils/Hook/useRequest'
export default defineComponent({
  components: {
    PageHeader,
  },
  setup() {
    onMounted(() => {
      init()
    })

    // 统一依赖
    const route = useRoute()
    const router = useRouter()
    const store = useAppStore()
    // 表格数据
    const listData: Ref<any[]> = ref([])
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

    // 请求数据
    async function init() {
      await useCloud('pageList')
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
      await useCloud('pageList')
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
      if (store.userData.uid == data._openid) {
        await useCloud('pageList')
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
