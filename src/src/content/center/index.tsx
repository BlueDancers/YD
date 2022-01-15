
import { useBoardStore } from 'src/store/board';
import { useCoreStore } from 'src/store/core';
import { defineComponent, ref } from 'vue'
import c from './index.module.scss';
import useListen from './useListen';

import { contResetCss, animationFun } from '@/utils/index'

import auxiliaryPoint from '../components/auxiliaryPoint.vue';
import lineX from '../components/lineX.vue';
import lineY from '../components/lineY.vue';
import Ydiv from './component/Dom/Ydiv'
import Ybutton from './component/Dom/Ybutton';
import Yimg from './component/Dom/Yimg';
import Yp from './component/Dom/Yp';
import Yinput from './component/Dom/Yinput';
import pluginModal from './component/pluginModal/index';
import { useLineStore } from 'src/store/line';
import { useOtherStore } from 'src/store/other';

export default defineComponent({
	components: {
		auxiliaryPoint,
		Ydiv,
		Ybutton,
		Yimg,
		Yp,
		Yinput,
		lineX,
		lineY,
		pluginModal
	},
	setup() {
		// 全局数据
		const board = useBoardStore()
		const core = useCoreStore()
		const line = useLineStore()
		const other = useOtherStore()
		// dom
		const boardCore = ref()
		const heightCore = ref()
		const mainCore = ref()

		// 变量
		const pluginVisible = ref(false)

		// 鼠标监控
		useListen({
			boardTarget: boardCore,
			mainTarget: mainCore,
			heightTarget: heightCore,
		})


		function coreDrop(evt) {
			let name = evt.dataTransfer.getData('compIndex')
			if (name) {
				core.addComp(name, {
					top: evt.offsetY,
					left: evt.offsetX,
				})
			}
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

		function handleLeft(data) {
			console.log(data.key);
			rightHandleFun(data.key, { core, other, pluginVisible })


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
							core.pageData.length ? core.pageData[core.acPageIndex].dom.map((e, i) => (
								e.show &&
								<a-dropdown
									trigger={"['contextmenu']"}
									overlay={rightHandle(handleLeft)}
								>
									<auxiliaryPoint
										style={{ ...contResetCss(e.cssModule), ...animationFun(e.animation) }}
										index={i}
										id={e.id}
										activeCompIndex={core.activeCompIndex}
										hoverCompIndex={core.hoverCompIndex}
										onMousedown={(evt) => mouseDown(evt, i)}
										onMouseover={evt => mouseOver(evt, i)}
										onMouseout={evt => mouseOut(evt)}
									>
										{e.name == 'y-div' && <Ydiv class={`comp_${e.id}`} compData={e} />}
										{e.name == 'y-button' && <Ybutton class={`comp_${e.id}`} compData={e} />}
										{e.name == 'y-img' && <Yimg class={`comp_${e.id}`} compData={e} />}
										{e.name == 'y-p' && <Yp class={`comp_${e.id}`} compData={e} />}
										{e.name == 'y-input' && <Yinput class={`comp_${e.id}`} compData={e} />}
									</auxiliaryPoint>
								</a-dropdown>
							)) : <span></span>
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
					<div class={[c.assist, c.assist_1]}>全面屏</div>
					<div class={[c.assist, c.assist_2]}>iphone8屏</div>
				</div>
				{/* 保存组件到组件市场 */}
				<plugin-modal pluginVisible={pluginVisible.value} onChangeVisible={(params) => pluginVisible.value = params}></plugin-modal>
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

/**
 * 右击菜单
 * @param callback 
 * @returns 
 */
function rightHandle(callback) {
	return (
		<a-menu onClick={callback}>
			<a-menu-item key={1}>
				复制
			</a-menu-item>
			<a-menu-item key={2}>
				粘贴
			</a-menu-item>
			<a-menu-item key={3}>
				锁定
			</a-menu-item>
			<a-menu-item key={4}>
				删除
			</a-menu-item>
			<a-menu-item key={5}>
				上传到组件市场
			</a-menu-item>
			<a-menu-item key={6}>
				样式
			</a-menu-item>
			<a-menu-item key={7}>
				事件
			</a-menu-item>
			<a-menu-item key={8}>
				动画
			</a-menu-item>
		</a-menu>
	)
}

/**
 * 右击事件
 * @param key 
 * @param param1 
 */
function rightHandleFun(key, { core, other, pluginVisible }) {
	switch (key) {
		case 1:
			other.pushData()
			break;
		case 2:
			console.log('粘贴');
			other.pasteComp()
			break;
		case 3:
			console.log('锁定');
			core.lockComp(core.carryPageComp.dom[core.activeCompIndex].id, true)
			break;
		case 4:
			console.log('删除');
			core.deleteComp(core.activeCompIndex)
			break;
		case 5:
			console.log('上传到组件市场');
			pluginVisible.value = true
			break;
		case 6:
			console.log('样式');
			other.rightKey = 1
			break;
		case 7:
			console.log('事件');
			other.rightKey = 2
			break;
		case 8:
			console.log('动画');
			other.rightKey = 3
			break;
		default:
			break;
	}
}