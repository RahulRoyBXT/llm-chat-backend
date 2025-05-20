import React from "react";
import EndpointCard from "../EndpointCard";
import SectionTitle from "../SectionTitle";

const AuthDocs = () => {
  return (
    <section id="authentication" className="mt-16">
      <SectionTitle title="Authentication" anchor="authentication" />
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Authentication endpoints allow users to register, login, and manage their account. The API uses JWT tokens for authentication.
      </p>

      <EndpointCard
        method="POST"
        endpoint="/api/users/auth/createuser"
        title="Register"
        description="Create a new user account with profile photo"
        statusCode="201 Created"
        requestBody={`// multipart/form-data
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "userPhoto": [binary file data]
}`}
        responseBody={`{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/users/auth/loginuser"
        title="Login"
        description="Authenticate a user and receive a JWT token"
        statusCode="200 OK"
        requestBody={`{
  "email": "john@example.com",
  "password": "securepassword"
}`}
        responseBody={`{
  "success": true,
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/users/auth/logoutuser"
        title="Logout"
        description="End the user's session and invalidate JWT token"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "message": "Logged out successfully"
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/users/auth/checkauth"
        title="Check Authentication"
        description="Verify if user is authenticated with current token"
        statusCode="200 OK"
        responseBody={`{
  "isAuthenticated": true,
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "john@example.com"
  }
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/users/auth/profile"
        title="Get User Profile"
        description="Retrieve authenticated user's profile information"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "john@example.com",
    "profilePhoto": "https://example.com/photos/user123.jpg",
    "createdAt": "2023-06-15T10:00:00Z"
  }
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/users/enable2fa"
        title="Enable Two-Factor Authentication"
        description="Enable 2FA for the authenticated user"
        statusCode="200 OK"
        responseBody={`{
  "success": true,
  "message": "2FA enabled successfully",
  "secret": "JBSWY3DPEHPK3PXP",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/users/verify2fa"
        title="Verify Two-Factor Authentication"
        description="Verify a 2FA token for authentication"
        statusCode="200 OK"
        requestBody={`{
  "token": "123456"
}`}
        responseBody={`{
  "success": true,
  "message": "2FA verification successful"
}`}
      />
    </section>
  );
};

export default AuthDocs;
