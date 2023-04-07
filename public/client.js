const socket = io();

// DOM Elements
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#input-message');
const messagesDiv = document.querySelector('#messages');

// Get username from user
let username = '';
while (!username) {
  username = prompt('Enter your username:');
}

// Send message to server
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  const time = new Date().getTime();
  socket.emit('chatMessage', { message, time, username });
  messageInput.value = '';
});

// Receive message from server
socket.on('chatMessage', message => {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<span class="username">${message.username}: </span>${message.message}<span class="time">${new Date(message.time).toLocaleTimeString()}</span>`;
  messagesDiv.appendChild(messageElement);
});
