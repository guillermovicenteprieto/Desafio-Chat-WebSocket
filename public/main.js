const socket = io.connect();
// socket.on("messages", (data) => {
//   console.log(data);
// });

//esta función ocupa un map, que itera sobre cada elemento de un array y realñzia una acción: 
// toma data y la pasa a una función: por cada elemento devuelve un string con el mnombre del autor y el textop
//con join los junta separados por un espacio
function render(data) {
    const html = data.map((elem, index) => {
        return(`
            <div class=container>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em> 
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
    // e.preventDefault() lo cambio por return false

    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

