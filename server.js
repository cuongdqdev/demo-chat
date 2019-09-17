const express = require('express');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

const server = require('http').Server(app);
const io = require('socket.io')(server);

var arrUsers=['ADMIN'];

io.on('connection', function(socket){
    console.log(`Có người kết nối ${socket.id}`);

    socket.on('CLIENT-SEND-USERNAME', function(data){
        //console.log(data);
        if(arrUsers.indexOf(data) >= 0){
            socket.emit('SERVER-SEND-DANGKY-THATBAI');
        } else {
            arrUsers.push(data);
            //console.log({arrUsers});
            socket.username = data;
            socket.emit('SERVER-SEND-DANGKI-THANHCONG', data);
            io.sockets.emit('SERVER-SEND-DANHSACH-USERS', arrUsers);
        }
    });

    socket.on('LOGOUT', function(){
        arrUsers.splice(
            arrUsers.indexOf(socket.username),1
        );
        console.log(`${socket.username} vừa ngắt kết nối`);
        socket.broadcast.emit('SERVER-SEND-DANHSACH-USERS', arrUsers);
    });

    socket.on('CLIENT-SEND-MESSAGE', function(data){
        //console.log(data)
        io.sockets.emit('SERVER-SEND-MESSAGE', { user: socket.username, message: data });
    });

    socket.on('CLIENT-SEND-DANGCHAT', function(){
        console.log(`${socket.username} đang gõ chữ`);
        let data = socket.username + 'đang gõ chữ';
        io.sockets.emit('SERVER-SEND-DANGCHAT', data);
    });

    socket.on('CLIENT-SEND-DUNGCHAT', function(){
        console.log(`${socket.username} dừng gõ chữ`);
        io.sockets.emit('SERVER-SEND-DUNGCHAT');
    })

});


server.listen(3000);

app.get('/home', (req,res) => res.render('home'));

app.get('/', (req,res) => res.json( { message: 'Hello, World!' } ));

