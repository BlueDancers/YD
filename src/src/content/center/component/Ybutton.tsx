import { compResetCss } from '@/utils';
import { defineComponent, onMounted, ref } from 'vue';
import css from './comp.module.scss';

export default defineComponent({
  props: ['compData'],
  setup(props) {
    onMounted(() => {
      console.log(props.compData);
    })
    return (props) => (
      <button style={compResetCss(props.compData.cssModule)}>{props.compData.staticData.value}</button>
    )
  }
})