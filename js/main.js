var socket = io();
    var user = getUser();
    
    if (!user) {
      var person = prompt("Please enter your name");
      localStorage.setItem('user', JSON.stringify(person));
      var user = getUser();
    }
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message',{ "user": user, "message": input.value});
        // console.log(input.value)
        input.value = '';
      }
    });

    socket.on('chat message', function (msg) {
      // console.log('fron front end ' + msg)
      var item = document.createElement('li');
      item.textContent = `${msg.user}: ${msg.message}`;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
    function getUser(){
      return JSON.parse(localStorage.getItem('user'));
    }