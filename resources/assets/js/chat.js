/**
 * import socket io client
 */
const socket = require('socket.io-client')('http://localhost:9002');

/**
 * Init Component
 */
const $window = $(window);
const $messages = $('.messages');
const $inputMessage = $('.inputMessage');

/**
 * Vars
 */
let username;
let $currentInput;

/**
 * get User
 */
$(function() {
    $.get("/chat/user", function(data, status) {
        console.log(status);
        if (status === 'success') {
            window.userNameChat = data.name;
            chat.handlePressEnter();
        } else {
            if (confirm('Error')) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        }
    });
});

/**
 * Keyboard Events
 */
$window.keydown(function (event) {
    /**
     * When user press enter key
     */
    if (event.which === 13) {
        chat.handlePressEnter();
    }
});

/**
 * Chat Functionalities
 */
const chat = {

    handlePressEnter: () => {
        if (username === undefined) {
            chat.loginUser(window.userNameChat);
        } else {
            if (chat.isValidInputMessage()) {
                chat.sendMessage($inputMessage.val().trim());
            } else {
                alert('Please type message');
                chat.setInputFocus();
            }
        }
    },

    isValidInputMessage: () => $inputMessage.val().length > 0 ? true : false,

    sendMessage: (message) => {
        $currentInput.val('');
        chat.setInputFocus();
        const data = {
            time: (new Date()).getTime(),
            user: username,
            message: message
        };
        socket.emit('chat-message', data);
    },

    loginUser: (user) => {
        username = user;
        chat.setInputFocus();
        socket.emit('user-join', username);
    },

    setInputFocus: () => {
        $currentInput = $inputMessage.focus();
    },

    log: (message, options) => {
        const element = $('<li>').addClass('log').text(message);
        chat.addMessageElement(element, options);
    },

    addChatMessage: (data) => {
        const $usernameElement = $('<span class="username"/>').text(data.user);
        const $messageBodyElement = $('<span class="messageBody">').text(data.message);

        const $messageElement = $('<li class="message"/>')
            .data('username', data.user)
            .append($usernameElement, $messageBodyElement);

        chat.addMessageElement($messageElement);
    },

    addMessageElement: (element, options) => {
        const $element = $(element);

        if (!options) options = {};
        if (typeof options.fade === undefined) options.fade = true;
        if (typeof options.prepend === undefined) options.prepend = false;
        if (options.fade) $element.hide().fadeIn(150);

        if (options.prepend) {
            $messages.prepend($element);
        } else {
            $messages.append($element);
        }

        $messages[0].scrollTop = $messages[0].scrollHeight;
    }
};


/**
 * Events
 */
socket.on('connect', () => {
    console.log('connected');
});
socket.on('chat-message', (data) => {
    chat.addChatMessage(data);
});
socket.on('user-join', (data) => {
    chat.log(data + ' joined at this room');
});
socket.on('user-unjoin', (data) => {
    chat.log(data + ' left this room');
});