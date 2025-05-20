import React from "react";
import EndpointCard from "../EndpointCard";
import SectionTitle from "../SectionTitle";

const MessagingDocs = () => {
  return (
    <section id="messaging" className="mt-16">
      <SectionTitle title="Messaging" anchor="messaging" />
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The messaging endpoints allow you to send and retrieve messages between users. For real-time messaging, you can also use the Socket.io interface described in the Real-time section.
      </p>

      <EndpointCard
        method="POST"
        endpoint="/api/message/send"
        title="Send Message"
        description="Send a message to another user"
        statusCode="200 OK"
        requestBody={`{
  "receiverId": "60d21b4667d0d8992e610c85",
  "content": "Hello, how are you?",
  "uniqueId": "msg_123456789" // Optional, for client-side tracking
}`}
        responseBody={`{
  "success": true,
  "message": {
    "id": "60d21b4667d0d8992e610c86",
    "sender": "60d21b4667d0d8992e610c87",
    "receiver": "60d21b4667d0d8992e610c85",
    "content": "Hello, how are you?",
    "timestamp": "2023-06-15T10:05:00Z",
    "status": "sent"
  }
}`}
      />

      <EndpointCard
        method="GET"
        endpoint="/api/message/:chatId"
        title="Get Messages"
        description="Retrieve messages for a specific chat"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "messages": [
    {
      "id": "60d21b4667d0d8992e610c86",
      "sender": "60d21b4667d0d8992e610c87",
      "receiver": "60d21b4667d0d8992e610c85",
      "content": "Hello, how are you?",
      "timestamp": "2023-06-15T10:05:00Z",
      "status": "delivered"
    },
    {
      "id": "60d21b4667d0d8992e610c88",
      "sender": "60d21b4667d0d8992e610c85",
      "receiver": "60d21b4667d0d8992e610c87",
      "content": "I'm doing well, thanks!",
      "timestamp": "2023-06-15T10:06:00Z",
      "status": "delivered"
    }
  ]
}`}
      />

      <EndpointCard
        method="GET"
        endpoint="/api/message/getmissedmessages"
        title="Get Missed Messages"
        description="Retrieve messages received while user was offline"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "missedMessages": [
    {
      "id": "60d21b4667d0d8992e610c89",
      "sender": "60d21b4667d0d8992e610c90",
      "receiver": "60d21b4667d0d8992e610c85",
      "content": "Did you see the news?",
      "timestamp": "2023-06-15T11:00:00Z",
      "status": "sent"
    },
    {
      "id": "60d21b4667d0d8992e610c91",
      "sender": "60d21b4667d0d8992e610c92",
      "receiver": "60d21b4667d0d8992e610c85",
      "content": "Meeting at 3pm tomorrow",
      "timestamp": "2023-06-15T12:30:00Z",
      "status": "sent"
    }
  ]
}`}
      />
    </section>
  );
};

export default MessagingDocs;
