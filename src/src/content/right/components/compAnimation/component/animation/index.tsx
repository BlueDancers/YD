import { defineComponent, ref } from 'vue-demi';
import animation from './animation';
import css from './index.module.scss';

export default defineComponent({
  props: ['showAnima'],
  setup(props, { emit }) {
    const carrentClass = ref('')
    const setTime = ref()
    function changShowClass(item) {
      console.log(item);
      carrentClass.value = `animate__${item.value}`
      clearTimeout(setTime.value)
      setTime.value = setTimeout(() => {
        carrentClass.value = ''
      }, 1500);
    }
    function activeClass(item) {
      console.log(item);
      emit('setClassName',item.value)
    }
    return () => (
      <a-drawer
        v-model={[props.showAnima.value, 'visible']}
        title={'选择动画'}
        placement={'right'}
        width={600}
      // onAfterVisibleChange={afterVisibleChange}
      >
        <img class={['animate__animated', carrentClass.value, css.ac_img]} src="https://images.591wsh.com/2021/12/01/thumb_45996812339376128.png" alt="" />
        <div class={css.an_cont}>
          {
            animation.map(p => (
              <>
                <div class={css.ac_title}>{p.label}</div>
                {
                  p.children.map(c => (
                    <a-button onMouseover={() => changShowClass(c)} class={[css.ac_item]} onClick={() => activeClass(c)}>{c.label}</a-button>
                  ))
                }
              </>
            ))
          }
        </div>

      </a-drawer>
    )
  }
})