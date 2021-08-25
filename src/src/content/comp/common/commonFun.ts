import { useStore } from 'vuex'
import { resetCss } from '@/utils/index'
import { computed, ref, toRefs } from 'vue'
import { compProps, compPropsInter } from './config'
import auxiliaryPoint from '@/components/auxiliaryPoint.vue'
/**
 * 组件逻辑的公有数据与方法
 * @param props
 * @returns
 */
export default function useCommonFun(props) {
  let parent: compPropsInter = props as any
  const store = useStore()

  let activechild = computed(() => store.state.core.activechild)
  return {
    resetCss,
    props: parent,
    activechild,
  }
}
