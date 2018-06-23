let app = {
    friends: {},
    usernames: [],
    rooms: [],
    dataFile: [],

    server: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
    init: function () {
        this.handleUsernameClick();
        this.handleSubmit();
        this.fetch();
    },
    send: function (message) {
        // console.log($.ajax.args);
        $.ajax({
            url: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
            type: 'POST',
            data: JSON.stringify(message),
            contentType: 'application/json',
            success: function (data) {
                // console.log($.ajax.args);
                console.log('chatterbox: Message sent');
            },
            error: function (data) {
                // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to send message', data);
            }
        });
    },
    fetch: function () {
        // var messages = [];
        $.ajax({
            url: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
            type: 'GET',
            contentType: 'application/json',
            data: {
                'order': '-createdAt',
                'limit': 30
            },
            success: function (data) {
                // console.log(app.rooms)
                // console.log(data);
                let result = data.results;
                for(var i = 0; i < result.length; i++) {
                    if(result[i].username !== undefined) {
                        app.usernames.push(result[i].username);
                    }
                    if(result[i].roomname !== undefined || result[i].roomname !== null || !result[i].roomname) {
                        if(result[i].roomname === "" || result[i].roomname === null) {
                            result[i].roomname = 'anonymous';
                        } 
                        if(app.rooms.indexOf(result[i].roomname) === -1) {
                            app.rooms.push(result[i].roomname);
                        }
                    }
                    if(result[i].text !== undefined && result[i].username !== '?username=tatag') {
                        app.renderMessage(result[i]);
                        
                    }
                }
                
                



                
                
                
                for(let i = 0; i < app.rooms.length; i++) {
                    $(".chatroomNames").append(`<option>${app.rooms[i]}</option>`);
                }
             
                
    
                console.log('chatterbox: Message received');
            },
            error: function (data) {
                // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to receive message', data);
            },
        });
        // return messages;
    },
    clearMessages: function () {
        $('#chats').empty();
        $('#clear').on("click", function () {
            console.alert('click works');
        })
    },
    renderMessage: function (message) {
        $('#chats').append(`<p id="messageText">username: ${message.username} \nmessage: ${message.text}</p>`)
        

    },
    renderRoom: function (roomName) {
        $('#roomSelect').append(`<a>${roomName}</a>`)
    },
    handleUsernameClick: function () {
        $('.username').on('click', function () {
            this.friends[$(".username")] = $(".username");
        })
    },
    handleSubmit: function (message) {
        $('#send .submit').on('click', function() {
        })

    },
}

// app.send({
//     username: 'romanG',
//     text: 'I love marty',
//     roomname: 'HappyAndInLove'
// });
// app.fetch();
// app.clearMessages();
// app.renderMessage({username:'bell',text:'never underest',rooname:'lobby'});
// app.fetch(); 
app.init();