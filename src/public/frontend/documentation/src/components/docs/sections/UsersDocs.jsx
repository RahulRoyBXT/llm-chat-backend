import React from "react";
import EndpointCard from "../EndpointCard";
import SectionTitle from "../SectionTitle";

const UsersDocs = () => {
  return (
    <section id="users" className="mt-16">
      <SectionTitle title="Users" anchor="users" />
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        These endpoints allow you to retrieve information about users on the platform.
      </p>

      <EndpointCard
        method="GET"
        endpoint="/api/getalluser"
        title="Get All Users"
        description="Retrieve all users except the currently logged-in user"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "users": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "email": "john@example.com",
      "profilePhoto": "https://example.com/photos/user123.jpg"
    },
    {
      "id": "60d21b4667d0d8992e610c95",
      "username": "janedoe",
      "email": "jane@example.com",
      "profilePhoto": "https://example.com/photos/user456.jpg"
    }
  ]
}`}
      />

      <EndpointCard
        method="GET"
        endpoint="/api/users/auth/getusers"
        title="Admin: Get All Users"
        description="Administrator endpoint to retrieve all users"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "users": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-06-15T10:00:00Z"
    },
    {
      "id": "60d21b4667d0d8992e610c95",
      "username": "janedoe",
      "email": "jane@example.com",
      "role": "admin",
      "createdAt": "2023-06-14T09:00:00Z"
    }
  ]
}`}
      />

      <EndpointCard
        method="GET"
        endpoint="/api/users/profile"
        title="Get Current User Profile"
        description="Retrieve the current authenticated user's profile"
        statusCode="200 OK"
        responseBody={`{
  "id": "60d21b4667d0d8992e610c87",
  "username": "currentuser",
  "email": "current@example.com",
  "profilePhoto": "https://example.com/photos/user789.jpg",
  "role": "user",
  "createdAt": "2023-05-20T14:00:00Z"
}`}
      />
    </section>
  );
};

export default UsersDocs;
