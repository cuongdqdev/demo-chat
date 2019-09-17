var socket = io("http://localhost:3000");

socket.on("SERVER-SEND-DANGKY-THATBAI", function(){
    alert("Dang ki thai bai");
});

socket.on("SERVER-SEND-DANGKI-THANHCONG", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("SERVER-SEND-DANHSACH-USERS", function(data){
    $("#boxContent").html("");
    data.forEach(user => {
        //console.log(user);
        $("#boxContent").append("<div class='userOnline'>" + user +"</div>");
    });
});

socket.on("SERVER-SEND-MESSAGE", function(data){
    $("#listMessages").append("<div class='contentMessage'>" + data.user + " : " + data.message + "</div>");
});

socket.on("SERVER-SEND-DANGCHAT", function(data){
    $("#chatStatus").html(data);
});

socket.on("SERVER-SEND-DUNGCHAT", function(){
    $("#chatStatus").html("");
});


$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();

    // Gửi thông tin đăng kí
    $("#btnRegister").click(function(){
        socket.emit("CLIENT-SEND-USERNAME", $("#txtUsername").val());
    });

    $("#btnLogout").click(function(){
        socket.emit("LOGOUT");
        $("#loginForm").show(2000);
        $("#chatForm").hide(1000);
        
    });

    $("#btnSend").click(function(){
        socket.emit("CLIENT-SEND-MESSAGE", $("#txtMessage").val());
    });

    $("#txtMessage").focusin(function(){
        socket.emit("CLIENT-SEND-DANGCHAT");
    });

    $("#txtMessage").focusout(function(){
        socket.emit("CLIENT-SEND-DUNGCHAT");
    });




});