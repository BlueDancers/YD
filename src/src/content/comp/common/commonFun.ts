import { useStore } from 'vuex'
import { resetCss } from '@/utils/index'
import { computed, toRefs } from 'vue'
import { compProps, compPropsInter } from './config'
/**
 * 组件逻辑的公有数据与方法
 * @param props
 * @returns
 */
export default function useCommonFun(props) {
  let parent: compPropsInter = props as any
  const store = useStore()
  const activeCompId = () => {
    console.log(props.componentId)
    store.commit('core/set_activechild', props.componentId)
  }
  let activechild = computed(() => store.state.core.activechild)
  return {
    resetCss,
    activeCompId,
    props: parent,
    activechild,
  }
}
