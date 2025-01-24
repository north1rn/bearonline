const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Раздача статических файлов
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Новый пользователь подключился');

    // Обработка события "addTime"
    socket.on('addTime', (data) => {
        console.log('Получены данные от клиента:', data);
        // Отправляем данные всем подключенным клиентам
        io.emit('updateTime', data);
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
