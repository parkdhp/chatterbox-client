let app = {
    friends: {},
    server: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
    init: function () {
        this.handleUsernameClick();


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
        var messages = [];
        $.ajax({
            url: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
            type: 'GET',
            contentType: 'application/json',
            data: {
                'order': '-createdAt',
                'limit': 30
            },
            success: function (data) {
                console.log(data);
                // this.messageObj = JSON.stringify(data);

                // console.log('data', data);
                data.results.forEach(message => {
                    messages.push(message);
                });
                console.log('chatterbox: Message received');
            },
            error: function (data) {
                // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to receive message', data);
            },
        });
        // console.log('msgs',messages);
        return messages;
    },
    clearMessages: function () {
        $('#chats').empty();


        $('#clear').on("click", function () {
            console.alert('click works');

        })



    },
    renderMessage: function (message) {
        $('.username').append(`<span class="username">${message.username}</span>`);
        $('#chats').append(`<span id="messageText">${message.text}</span>`)

    },
    renderRoom: function (roomName) {
        $('#roomSelect').append(`<a>${roomName}</a>`)
    },
    handleUsernameClick: function () {
        $('.username').on('click', function () {
            this.friends[$(".username")] = $(".username");
        })
        //click on the username
    },
    handleSubmit: function (message) {

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
// app.init();