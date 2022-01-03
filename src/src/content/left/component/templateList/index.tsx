import { defineComponent, onMounted, ref } from 'vue-demi';

export default defineComponent({
  setup() {
    const plugleList = ref([])
    onMounted(() => {
      // 获取组件市场数据
    })
    return () => (
      <div>
        {
          plugleList.value.map(e => (
            <div class>

            </div>
          ))
        }

      </div>
    )
  }
})