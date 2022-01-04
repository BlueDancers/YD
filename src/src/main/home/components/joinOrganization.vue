<template>
  <div>
    <a-modal :visible="joinVisible" title="创建组织" @cancel="handleJoinCancel" @ok="handleJoinOk">
      <a-form>
        <a-form-item label="加入密码">
          <a-input v-model:value="joinPassword" placeholder="请输入密码" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    joinVisible: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const joinPassword = ref()

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
}
</script>

<style lang="scss" scoped>
</style>