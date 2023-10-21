import React from "react";
import toolState from "../store/toolState.js"
const SettingBar = ( ) => { 

	return(
		<div className = "setting-bar" style = {{ top:40 }}>
			<lable htmlFor = "line-width">Товщина ліній </lable>
			<input onChange = { e => toolState.setLineWidth(e.target.value) } defaultValue = {1} style = {{marginLeft: 10}} id = "line-width" type="number" min= {1} max = {50}/>
			<lable htmlFor = "color-stroke">Обводка ліній </lable>
			<input onChange = {e => toolState.setStrokeColor(e.target.value) } id = "color-stroke"style = {{marginLeft: 10}} type="color"/> 
		</div>
		)

}
export default SettingBar;