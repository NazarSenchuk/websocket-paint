const  express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const WSserver = require("express-ws")(app)
const aWss = WSserver.getWss()
const PORT = process.env.PORT || 5000
fs = require('fs')
path = require("path")
app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }
    })
})
app.post('/image', ( req , res) => {

	try{
		const data = req.body.img.replace ( 'data:image/png;base64,' , '')
		fs.writeFileSync(path.resolve(__dirname,'files' , `${req.query.id}.jpg` ),data , 'base64')
		return res.status()
	}catch{


	}


})
app.get('/image',(req ,res ) => {
	try{ 
		const file = fs.readFileSync(path.resolve(__dirname,'files', `${req.query.id}.jpg`))
		const data = 'data:image/png;base64,'+ file.toString("base64")
		res.json(data)
	}catch{}



})
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler=(ws,msg) =>{
	
	ws.id = msg.id
	broadcastConnection(ws,msg)



}
const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}