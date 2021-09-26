const express = require('express')

const Router = express()
Router.use(express.json())

Router.get('/', (req, res) => {
	res.json({confirmation: 'success'})
})


const port = 9000
Router.listen(port, _=> {console.log("Listening on port " + port.toString())})