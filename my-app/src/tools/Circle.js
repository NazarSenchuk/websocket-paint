import Tool from "./Tool";

export default class Circle extends Tool {
	constructor(canvas,socket , id) {

		super(canvas,socket ,id);
		this.listen()
	}
	listen(){

		this.canvas.onmousemove =this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)

	}
	mouseUpHandler(e){


		this.mouseDown = false
		this.socket.send(JSON.stringify({
				method:"draw",
				id : this.id ,
				figure: {
					type:"circle",
					x: this.startX,
					y: this.startY,
					r: this.r,
					color : this.ctx.fillStyle
				}

			}))}
	
	mouseDownHandler(e){
		this.mouseDown =true
		this.ctx.beginPath()
		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.saved = this.canvas.toDataURL()
		
	}
	mouseMoveHandler(e){

		if (this.mouseDown) { 
			let currentX = e.pageX - e.target.offsetLeft;
			let currentY = e.pageY - e.target.offsetTop;
			let width = currentX-this.startX
            let height = currentY-this.startY
			this.r  = Math.sqrt(width**2 + height**2)
			this.draw(this.startX,this.startY,this.r)}
		
	}
	draw(x,y,r) {
		const img = new Image()
		img.src = this.saved
		img.onload = () => {
			this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
			this.ctx.drawImage(img,0,0,this.canvas.width , this.canvas.height)
			this.ctx.beginPath()
			this.ctx.arc(x, y, r, 0, (3.14159/ 180)*360 );
			this.ctx.fill()
			this.ctx.stroke()

		}
		




	}
	static	 StaticDraw(ctx,x,y,r){
			console.log(ctx)
			
			ctx.arc(x, y, r, 0, (3.14159/ 180)*360 );
			ctx.fill()
			ctx.stroke()




	}
}
