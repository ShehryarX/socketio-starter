// make connection
var socket = io.connect('http://localhost:3000'); // access to io because of the script we loaded

// query dom
var message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  button = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

// emit events
button.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  });
  message.value = '';
  handle.value = '';
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// listen for events
socket.on('chat', data => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on('typing', data => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
})