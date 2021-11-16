<template>
  <div>
    <page-header></page-header>
    <div class="padd">
      <a-button @click="newGroup">新建组织</a-button>
    </div>
    <a-table row-key="_id" :columns="columns" :data-source="listData" bordered class="marg">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #action="{ record }">
        <a-button
          type="primary"
          v-if="record.founderUser.includes(userId)"
          @click="gotoRoom(record)"
        >进入</a-button>
        <a-button v-else @click="joinRoom(record)">加入组织</a-button>
      </template>
    </a-table>
    <!-- 创建组织 -->
    <a-modal :visible="visible" title="创建组织" @cancel="handleCancel" @ok="handleOk">
      <a-form>
        <a-form-item label="组织名称">
          <a-input v-model:value="formState.name" placeholder="请输入组织名称" />
        </a-form-item>
        <a-form-item label="路由前缀">
          <a-input addon-before="/" v-model:value="formState.routerCode" placeholder="请输入路由前缀" />
        </a-form-item>
        <a-form-item label="组织描述">
          <a-input v-model:value="formState.disp" placeholder="请输入组织描述" />
        </a-form-item>
        <a-form-item label="组织密码">
          <a-input v-model:value="formState.password" placeholder="请输入组织密码" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal :visible="joinVisible" title="创建组织" @cancel="handleJoinCancel" @ok="handleJoinOk">
      <a-form>
        <a-form-item label="加入密码">
          <a-input v-model:value="joinData.password" placeholder="请输入密码" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { cloud } from '@/modules/request'
import PageHeader from '@/components/header.vue'
export default defineComponent({
  components: {
    PageHeader,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const db = cloud.database()
    const userData = computed(() => store.state.app.userData)
    const formState = ref({
      name: '',
      disp: '',
      password: '',
      routerCode: '',
    })
    const columns = [
      {
        title: '组织名称',
        dataIndex: 'organizeName',
      },
      {
        title: '组织管理员',
        dataIndex: 'founderName',
      },
      {
        title: '路由前缀',
        dataIndex: 'routerCode',
      },
      {
        title: '群组描述',
        dataIndex: 'organizeDisp',
      },
      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
        slots: { customRender: 'action' },
      },
    ]
    const listData: Ref<any> = ref([])
    const visible: Ref<Boolean> = ref(false) // 新建组织
    const userId = computed(() => store.state.app.userData.uid) // 当前用户id

    onMounted(async () => {
      initTable()
    })

    async function initTable() {
      const groupData = await db.collection('organize').get()
      console.log(groupData.data)
      listData.value = groupData.data
    }
    // 进入房间
    function gotoRoom(data) {
      console.log(data)
      router.push({
        name: 'pageList',
        query: {
          id: data._id,
        },
      })
    }

    const joinVisible: Ref<Boolean> = ref(false) // 新建组织
    const joinData: any = ref({
      password: '',
    })
    // 加入房间
    async function joinRoom(data) {
      // 输入群组密码
      joinVisible.value = true
      joinData.value = { ...data, password: '' }
    }

    function handleJoinCancel() {
      joinVisible.value = false
    }
    async function handleJoinOk() {
      console.log(joinData.value)
      // 改变数据
      let currentData = await db
        .collection('organize')
        .where({
          _id: joinData.value._id,
          password: joinData.value.password,
        })
        .get()
      console.log(currentData)
      if (currentData.data.length == 1) {
        let { founderUser } = currentData.data[0]
        founderUser.push(userId.value)
        await db
          .collection('organize')
          .where({
            _id: joinData.value._id,
          })
          .update({
            founderUser: founderUser,
          })
          .then((res) => {
            console.log(res)
            handleJoinCancel()
            initTable()
            message.success('加入成功~')
          })
      } else {
        message.error('密码错误')
      }
    }

    function newGroup() {
      // 打开弹窗
      visible.value = true
    }
    async function handleOk() {
      let { name, disp, password, routerCode } = formState.value
      let { uid, email } = store.state.app.userData
      await db
        .collection('organize')
        .add({
          founderName: email,
          founderUser: [uid],
          organizeName: name,
          organizeDisp: disp,
          routerCode: routerCode,
          password,
        })
        .then((res) => {
          console.log(res)
          visible.value = false
          initTable()
        })
      console.log('表单提交')
    }
    function handleCancel() {
      visible.value = false
    }
    return {
      userData,
      formState,
      columns,
      listData,
      visible,
      userId,
      gotoRoom,
      joinVisible,
      joinData,
      joinRoom,
      handleJoinCancel,
      handleJoinOk,
      newGroup,
      handleOk,
      handleCancel,
    }
  },
})
</script>

<style lang="scss" scoped></style>
