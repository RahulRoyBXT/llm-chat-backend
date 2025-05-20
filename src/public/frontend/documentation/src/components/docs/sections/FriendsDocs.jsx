import React from "react";
import EndpointCard from "../EndpointCard";
import SectionTitle from "../SectionTitle";

const FriendsDocs = () => {
  return (
    <section id="friends" className="mt-16">
      <SectionTitle title="Friends" anchor="friends" />
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        These endpoints allow users to manage friend relationships, including sending, accepting, and rejecting friend requests.
      </p>

      <EndpointCard
        method="POST"
        endpoint="/api/friends/send"
        title="Send Friend Request"
        description="Send a friend request to another user"
        statusCode="200 OK"
        requestBody={`{
  "receiverId": "60d21b4667d0d8992e610c85"
}`}
        responseBody={`{
  "success": true,
  "message": "Friend request sent successfully",
  "request": {
    "id": "60d21b4667d0d8992e610c93",
    "sender": "60d21b4667d0d8992e610c87",
    "receiver": "60d21b4667d0d8992e610c85",
    "status": "pending",
    "createdAt": "2023-06-15T14:00:00Z"
  }
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/friends/accept"
        title="Accept Friend Request"
        description="Accept an incoming friend request"
        statusCode="200 OK"
        requestBody={`{
  "requestId": "60d21b4667d0d8992e610c93"
}`}
        responseBody={`{
  "success": true,
  "message": "Friend request accepted",
  "friendship": {
    "id": "60d21b4667d0d8992e610c94",
    "users": [
      "60d21b4667d0d8992e610c87",
      "60d21b4667d0d8992e610c85"
    ],
    "createdAt": "2023-06-15T14:05:00Z"
  }
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/friends/reject"
        title="Reject Friend Request"
        description="Reject an incoming friend request"
        statusCode="200 OK"
        requestBody={`{
  "requestId": "60d21b4667d0d8992e610c93"
}`}
        responseBody={`{
  "success": true,
  "message": "Friend request rejected"
}`}
      />

      <EndpointCard
        method="GET"
        endpoint="/api/friends/list/:userId"
        title="Get Friend List"
        description="Retrieve a user's friends list"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "friends": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "email": "john@example.com",
      "profilePhoto": "https://example.com/photos/user123.jpg",
      "status": "online"
    },
    {
      "id": "60d21b4667d0d8992e610c95",
      "username": "janedoe",
      "email": "jane@example.com",
      "profilePhoto": "https://example.com/photos/user456.jpg",
      "status": "offline",
      "lastSeen": "2023-06-15T13:00:00Z"
    }
  ]
}`}
      />

      <EndpointCard
        method="DELETE"
        endpoint="/api/friends/remove/friends/:friendId"
        title="Remove Friend"
        description="Remove a user from your friends list"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "message": "Friend removed successfully"
}`}
      />
    </section>
  );
};

export default FriendsDocs;
