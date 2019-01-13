/*
(c) 2018 Louis. D. Nel

NOTE: You need to intall the npm modules by executing >npm install
before running this server

Simple express server re-serving data from food2fork.com
To test:
http://localhost:3000

*/
const express = require('express') //express framework
const requestModule = require('request') //npm module for easy http requests
const PORT = process.env.PORT || 3000
const LINK = require('url')

//const RECIPE_API_KEY = 'd1a12f2b7173959f24534a4c87fcf40c' //jordans
const RECIPE_API_KEY = '5613fa447c794b1100eadee58e74a842' //ryans

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

//Routes
app.get('/recipes.html', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})
app.get('/index.html', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/recipes', (request, response) => {
  console.log('\nIN THE RECIPES ROUTE\n')
  
  // let requestURL = request.url
  // let link = LINK.parse(requestURL) //GET method query parameters if any
  // console.log(link)
  // console.log(link.search)

  let ingredient = request.query.ingredient
  if(!ingredient) {
    //return response.json({message: 'Please enter an ingredient'})
    return response.sendFile(__dirname + '/views/index.html')
  }
  const url = `https://www.food2fork.com/api/search?key=${RECIPE_API_KEY}&q=${ingredient}`
  requestModule.get(url, (err, res, data) => {
    //console.log(data)
    //response.sendFile(__dirname + '/views/index.html')//////////////////JUST ADDED THIS LINE
    return response.contentType('application/json').json(JSON.parse(data))
  })
})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: 3000`)
    console.log(`Stop server with "Ctrl-C"`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/recipes.html`)
    console.log(`http://localhost:3000/recipes`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000`)

  }
})