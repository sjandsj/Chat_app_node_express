var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose')


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//mongoose.Promise = Promise;
var dbUrl = 'mongodb+srv://shubhanshu:shubhanshu@shubhanshu-1.051ni.mongodb.net/?retryWrites=true&w=majority'

var MessageModel = mongoose.model('MessageModel', {
  name: String,
  message: String,
})

// var messages =[]

app.get('/messages', (request, response)=>{
  MessageModel.find({},(error, messages)=>{
    response.send(messages);
  })
})

app.get('/messages/:user', (request, response) => {
  var user = request.params.user;
  console.log('Fetching user', user)
  MessageModel.find({name: user}, (error, message)=>{
    
    console.log('Error:', error)
    response.send(message);
  })
})

app.post('/messages', async (request, response)=>{

  try {
    //throw 'Static Error'
    var messageModel = new MessageModel(request.body)
    var savedMessage = await messageModel.save();
 
    console.log('Saved to MonogoDb')
    var censored = await MessageModel.findOne({message: 'fuck'})
 
  
    if(censored){
      console.log('Censored word :', censored);
      await MessageModel.remove({_id: censored.id})
    } else{
      io.emit('message', request.body)
    }

    console.log('post request body', request.body)
    //messages.push(request.body)
    
    response.sendStatus(200)
  } catch (error) {
    response.sendStatus(500)
    return console.log('Error:', error)
  } finally{
    console.log('Finally running')
  }
})








io.on('connection', (socket)=>{
  console.log('User connected to socket')
})

mongoose.connect(dbUrl, (error)=>{ 
  console.log('Mongoose connect error', error)
})

var server = http.listen(3000, ()=>{
  console.log(server.address())
})