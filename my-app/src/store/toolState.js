import {makeAutoObservable} from 'mobx';

class ToolState { 

	tool = null 
	constructor( ){
		makeAutoObservable(this)

	}
	setLineWidth(width ) {
		console.log("changed line width")
		this.tool.lineWidth = width
	}
	setStrokeColor(color ) {
		this.tool.strokeColor =color
	}
	setFillColor(color ) {
		this.tool.fillColor = color
	}
	setTool(tool ) {
		console.log(tool)
		this.tool = tool
	}
}
export default new ToolState()