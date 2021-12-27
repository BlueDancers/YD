
import { useBoardStore } from '@/stores/board';
import { useCoreStore } from '@/stores/core';
import { defineComponent, ref } from 'vue'
import c from './index.module.scss';
import useListen from './useListen';

import { resetCss, contResetCss, compResetCss, animationFun } from '@/utils/index'

import auxiliaryPoint from '../components/auxiliaryPoint.vue';
import lineX from '../components/lineX.vue';
import lineY from '../components/lineY.vue';
import Ydiv from './component/Ydiv'
import Ybutton from './component/Ybutton';
import Yimg from './component/Yimg';
import Yp from './component/Yp';
import Yinput from './component/Yinput';
import { useLineStore } from '@/stores/line';


export default defineComponent({
	components: {
		auxiliaryPoint,
		Ydiv,
		Ybutton,
		Yimg,
		Yp,
		Yinput,
		lineX,
		lineY
	},
	setup() {
		// 全局数据
		const board = useBoardStore()
		const core = useCoreStore()
		const line = useLineStore()
		const boardCore = ref()
		const heightCore = ref()

		const mainCore = ref()
		useListen({
			boardTarget: boardCore,
			mainTarget: mainCore,
			heightTarget: heightCore,
		})
		function coreDrop(evt) {
			console.log(evt);
			let name = evt.dataTransfer.getData('compIndex')
			core.addComp(name, {
				top: evt.offsetY,
				left: evt.offsetX,
			})
			evt.preventDefault()
		}
		/**
		 * 点击组件
		 * @param evt 
		 * @param index 
		 */
		function mouseDown(evt, index) {
			core.toggleComp(index)
			line.getLineList({
				left: mainCore.value.offsetLeft - mainCore.value.offsetWidth / 2,
				top: mainCore.value.offsetTop
			}) // 全局按键松开初初始化辅助线信息
			evt.preventDefault()
		}
		/**
		 * 松开组件
		 * @param evt 
		 * @param index 
		 */
		function mouseOver(evt, index) {
			core.hoverCompIndex = index
			evt.preventDefault()
		}

		function mouseOut(evt) {
			core.hoverCompIndex = -1
			evt.preventDefault()
		}
		return () => (
			<div id={c.center_core} ref={boardCore} class="board_center">
				<lineX></lineX>
				<lineY></lineY>
				<div
					class={[c.core, 'board_center_core']}
					ref={mainCore}
					style={{
						left: `${board.left}%`,
						top: `${board.top}px`,
						height: `${board.pageDetail.height}px`,
						transform: `translate(-50%, 0%) scale(${board.scale})`,
						backgroundColor: board.pageDetail.backColor
					}}
					onDrop={(evt) => coreDrop(evt)}
					onDragover={(evt) => evt.preventDefault()}
					onDragend={(evt) => evt.preventDefault()}
					onDragleave={(evt) => evt.preventDefault()}
				>
					{/* 正式数据 */}
					<>
						{
							core.pageData.length && core.pageData[core.acPageIndex].dom.map((e, i) => (
								e.show && <auxiliaryPoint
									style={{ ...contResetCss(e.cssModule), ...animationFun(e.animation) }}
									index={i}
									id={e.id}
									activeCompIndex={core.activeCompIndex}
									hoverCompIndex={core.hoverCompIndex}
									onMousedown={(evt) => mouseDown(evt, i)}
									onMouseover={evt => mouseOver(evt, i)}
									onMouseout={evt => mouseOut(evt)}
								>
									{e.name == 'y-div' && <Ydiv compData={e} />}
									{e.name == 'y-button' && <Ybutton compData={e} />}
									{e.name == 'y-img' && <Yimg compData={e} />}
									{e.name == 'y-p' && <Yp compData={e} />}
									{e.name == 'y-input' && <Yinput compData={e} />}
								</auxiliaryPoint>
							))
						}
					</>
					{/* 底部拖动 */}
					{
						board.pageDetail.pageType == 1 && <div ref={heightCore} class={c.add_height} style={{
							top: `100%`,
							left: `0`,
						}}>
							<svg-icon style={{ width: '20px', height: '12px' }} name="tuozhuaicaidandaohang"></svg-icon>
						</div>
					}
					{/* 滚动页面 高度提示 */}
					<div class={c.assist_1}>全面屏</div>
				</div>
			</div >
		)
	},
	// mousedown：鼠标的键钮被按下。
	// mouseup：鼠标的键钮被释放弹起。
	// click：单击鼠标的键钮。
	// dblclick：鼠标的键钮被按下。
	// contextmenu ：弹出右键菜单。
	// mouseover：鼠标移到目标的上方。
	// mouseout：鼠标移出目标的上方。
	// mousemove：鼠标在目标的上方移动。
})