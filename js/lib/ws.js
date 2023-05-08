//webSocke

let socket = new WebSocket(
  "wss://explorer.ecredits.com/socket/websocket?locale=en&vsn=2.0.0"
);

socket.onopen = function (e) {
  socket.send('["1", "1", "blocks:new_block", "phx_join", {}]');
  socket.send('["1", "1", "addresses:new_address", "phx_join", {}]');

  const interval = setInterval(() => {
    socket.send('[null,"93","phoenix","heartbeat",{}]');
  }, 30000);
};

socket.onmessage = function (event) {
  let message = JSON.parse(event.data);

  if (message[4].count) {
    document.querySelector(".total-addresses").innerHTML = message[4].count;
  }
  if (message[4].average_block_time) {
    document.querySelector(".block-time").innerHTML =
      message[4].average_block_time;
    document
      .querySelector(".total-blocks")
      .removeAttribute("data-digits-counter");
    document.querySelector(".total-blocks").innerHTML = new Intl.NumberFormat(
      "en"
    ).format(message[4].block_number);
  }
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(event);

    alert();
    // `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
  } else {
    // alert("[close] Соединение прервано");
  }
};

socket.onerror = function (error) {
  alert(`[error]`);
};

window.onload = function () {
  clearInterval(interval);
};
