import { React, useEffect,useRef,useState} from "react";
import {observer} from "mobx-react-lite";
import Brush from "../tools/Brush.js";
import Rect from "../tools/Rect.js"
import canvasState from "../store/canvasState";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toolState from "../store/toolState";
import { useParams } from "react-router-dom";
import Circle from "../tools/Circle"
import Line from "../tools/Line"
import axios from "axios";
const Canvas = observer( ()  => { 
	const canvasRef = useRef()

	const usernameRef = useRef()
	const [modal,SetModal] = useState(true)
	const params  = useParams()

	useEffect (( ) => {

		canvasState.setCanvas(canvasRef.current)
		let ctx = canvasRef.current.getContext('2d')
		axios.get(`http://localhost:5000/image?id=${params.id}`)		
			.then(response => {

			const img = new Image()
			img.src = response.data
			img.onload = () => {
			ctx.clearRect(0,0,canvasRef.current.width , canvasRef.current.height)
			ctx.drawImage(img,0,0,canvasRef.current.width , canvasRef.current.height)
		
			
		}

			})
	}, [])
	useEffect (( ) => {

		if (canvasState.username){
		const socket = new WebSocket("ws://localhost:5000/")
		canvasState.setSocket( socket)
		canvasState.setSession(params.id)

		toolState.setTool(new Brush(canvasRef.current , socket ,params.id))
		socket.onopen = ( ) => {

			socket.send(JSON.stringify({
				id:params.id,
				username : canvasState.username,
				method: "connection"

			}))
		}
		socket.onmessage = ( event) => {
			console.log(typeof(event.data))
		
			
			let msg  =  JSON.parse(event.data)
			console.log(typeof(msg))
			switch(msg.method){
			case "connection":
				console.log( `користувач ${msg.username} приєднався`)
				break
			case "draw":
				console.log("DRAW")
				drawHandler(msg)
				break

			}

		}


	}}, [canvasState.username])
	const drawHandler = ( msg) => {

		const figure = msg.figure
		const ctx = canvasRef.current.getContext("2d")
		switch(figure.type){
		case "brush":
			Brush.draw(ctx , figure.x , figure.y)
			break
		case "line":
			console.log(`startx:${figure.startx}`)
			Line.StaticDraw(ctx,figure.startx,figure.starty , figure.endx,figure.endy)
			break
		case "circle":
			Circle.StaticDraw(ctx , figure.x , figure.y , figure.r)
			break
		case "rect":
			Rect.StaticDraw(ctx,figure.x , figure.y , figure.width,figure.height, figure.color)
			break
		case "finish":
			ctx.beginPath()
			break
		}
	}
	const mouseDownHandler = ( ) => {

		canvasState.pushToUndo(canvasRef.current.toDataURL())
		axios.post(`http://localhost:5000/image?id=${params.id}` ,{img:canvasRef.current.toDataURL()} )
			.then(response => console.log(response.data) )
	}
	const connectHandler = ( )=> {
		canvasState.username =  usernameRef.current.value
		SetModal(false)
	}
	return(
		<div className = "canvas" > 
			<canvas onMouseDown={() => mouseDownHandler()} ref = {canvasRef} width={600} height = {400} />
			 <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Введіть Ім'я</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<input ref = {usernameRef }type ="text" />

        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={() => connectHandler()}>
           	Ввійти
          </Button>
        </Modal.Footer>
      </Modal>
		</div>
		)

})
export default Canvas;