
import { useBoardStore } from '@/stores/board';
import { defineComponent, ref, reactive, watch, onMounted } from 'vue'
import c from './index.module.scss';
import useListen from './useListen';

export default defineComponent({
	setup() {
		// 全局数据
		const board = useBoardStore()
		const centerCore = ref(null)
		const heightCore = ref(null)
		useListen({
			mainTarget: centerCore,
			heightTarget: heightCore
		})


		return () => (
			<div id={c.center_core} ref={centerCore}>
				<div class={c.core} style={{
					left: `${board.left}%`,
					top: `${board.top}px`,
					height: `${board.height}px`,
					transform: `translate(-50%, 0%) scale(${board.scale})`,
				}}>
					<div>
						{/* 正式数据 */}
					</div>
					<div ref={heightCore} class={c.add_height} style={{
						top: `100%`,
						left: `0`,
					}}>
					</div>
				</div>

			</div >
		)
	},
})