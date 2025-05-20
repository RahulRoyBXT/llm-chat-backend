const Message = require("../models/messageModel.js");
const { generateRoomId } = require("../utils/generateRoomId.js");

module.exports = (socket, io, redis) => {
    socket.on('send-message', async (messages) => {
        const {uniqueId, sender, receiver, content, timestamp, date} = messages
        const chatId = generateRoomId(sender, receiver)
        console.log('all info:','uniqueId', uniqueId, 'sender', sender,'receiver', receiver, 'content', content,'timestamp', timestamp,'date', date)
        const newMessage = new Message({
            uniqueId: uniqueId,
            chatId,
            sender,
            receiver,
            content,
            status: "sent",
            sentAt: timestamp,
            date: date
          })
        //Save to Redis
        const redisKey = `chat:${chatId}`;
        await redis.lPush(redisKey, JSON.stringify(newMessage));
        await redis.lTrim(redisKey, 0, 49);

        // Send to receiver
        io.emit('receive-message', newMessage)
    })
}