
import { useBoardStore } from '@/stores/board';
import { defineComponent, ref, reactive, watch, onMounted } from 'vue'
import c from './index.module.scss';
import useListen from './useListen';

export default defineComponent({
	setup() {
		// 全局数据
		const board = useBoardStore()
		const centerCore = ref(null)
		const listen = useListen(centerCore)


		return () => (
			<div id={c.center_core} ref={centerCore}>
				<div class={c.core} style={{
					left: `${board.left}%`,
					top: `${board.top}%`,
					height: `${board.height}px`,
					transform: `translate(-50%, -50%) scale(${board.scale})`,
				}}>
					<div></div>
					<div class={c.add_height} style={{
						top: `100%`,
						left: `0`,
					}}>点击</div>
				</div>

			</div >
		)
	},
})