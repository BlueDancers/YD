<template>
  <a-modal :visible="joinVisible" title="创建组织" @cancel="handleJoinCancel" @ok="handleJoinOk">
    <a-form>
      <a-form-item label="组织名称">
        <span>{{ joinData.organizeName }}</span>
      </a-form-item>
      <a-form-item label="路由前缀">
        <span>/{{ joinData.routerCode }}</span>
      </a-form-item>
      <a-form-item label="加入密码">
        <a-input :style="{ width: '200px' }" v-model:value="joinPassword" placeholder="请输入密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    joinVisible: {
      default: false,
      type: Boolean,
    },
    joinData: {
      default: () => {},
      type: Object,
    },
  },
  setup(props, { emit }) {
    const joinPassword = ref() // 加入密码

    function handleJoinCancel() {
      emit('handleJoinCancel')
    }
    function handleJoinOk() {
      emit('handleJoinOk', joinPassword.value)
    }
    return {
      handleJoinCancel,
      handleJoinOk,
      joinPassword,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>