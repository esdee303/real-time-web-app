var socket = io();

socket.on('connect', function ()  {
    console.log('Connected to server !');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
    var ul = jQuery('<ul></ul>')
    ul.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(ul);
});

socket.on('newLocationMessage', function (message) {
    var ul = jQuery('<ul></ul>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    ul.text(`${message.from}: `);
    a.attr('href', message.url);
    ul.append(a);
    jQuery('#messages').append(ul);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
        lattitude: position.coords.latitude,
        longitude: position.coords.longitude
       });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});