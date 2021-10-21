const express = require('express')
const cors = require('cors')

const Router = express()
Router.use(express.json())
Router.use(cors())

Router.get('/', (req, res) => {
	res.json({confirmation: 'success'})
})

Router.post('/api/fetchData', (req, res) => {
  console.log("post received at server")
  if(!req){
    res.json({
      data: null,
      confirmation: 'fail'
    })
  }
  else{

    res.json({
      // data : validPartners,
      confirmation : 'success'
    })
  }
  
})


const port = 9000
Router.listen(port, _=> {console.log("Listening on port " + port.toString())})