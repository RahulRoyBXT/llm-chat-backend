import React from "react";

const Introduction = () => {
  return (
    <section id="introduction">
      <h1 className="text-gray-900 dark:text-white">Llama Chat App API Documentation</h1>
      <p className="lead text-gray-600 dark:text-gray-400">
        Welcome to the Llama Chat App API reference. This documentation provides information about all available endpoints and how to use them to build applications that interact with the Llama Chat platform.
      </p>
      
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Getting Started</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The Llama Chat API is organized around REST principles. It uses standard HTTP response codes, authentication with JWT tokens, and returns responses in JSON format.
        </p>
        
        <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Base URL</h3>
        <pre className="mt-2 bg-gray-800 dark:bg-black text-white p-4 rounded-md text-sm overflow-x-auto">
          <code>https://your-api-domain.com/api</code>
        </pre>
        
        <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Authentication</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Most API endpoints require authentication using JWT (JSON Web Tokens). After logging in, you'll receive a token that should be included in the Authorization header of your requests.
        </p>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400">Example Authorization Header</h4>
          <pre className="mt-2 bg-gray-800 dark:bg-black text-white p-3 rounded-md text-xs overflow-x-auto">
            <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
