import { useStore } from 'vuex'
import { resetCss } from '@/utils/index'
/**
 * 组件逻辑的公有数据与方法
 * @param props 
 * @returns 
 */
export default function useCommonFun(props) {
  const store = useStore()
  const activeCompId = () => {
    store.commit('core/set_activechild', props.componentId)
  }
  return {
    resetCss,
    activeCompId,
    props,
  }
}
