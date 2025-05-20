const Message = require("../models/messageModel.js");

exports.generateNewMessage= ({
  uniqueId,
  senderId,
  receiverId,
  content,
  chatId,
})=> {
  const newMessage = new Message({
    uniqueId: uniqueId,
    chatId,
    sender: senderId,
    receiver: receiverId,
    content,
    status: "sent",
  });

  return newMessage;
}
