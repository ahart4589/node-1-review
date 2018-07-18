const express = require('express')
const bodyParser = require('body-parser')
//here we import our object from our controller file that has all the methods we will call to work with our dogs array
const dc = require('./controllers/dogController')

const app = express()
//app.use() allows us to pass functions or imports to our app and it will use it. This is called middleware
app.use(bodyParser.json())

//Routes 
//We define a route, or endpoint by saying app.get, app.post e.t.c .get .post .put .delete are all options 
app.get('/api/dogs', dc.getDogs)
app.put('/api/dogs/:id', dc.updateDog)
app.post('/api/dogs', dc.createDog)
app.delete('/api/dogs/:id', dc.deleteDog)

app.listen(3005, () => {
    console.log('Listening on port 3005')
})