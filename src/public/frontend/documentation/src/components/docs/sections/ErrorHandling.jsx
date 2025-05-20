import React from "react";
import SectionTitle from "../SectionTitle";

const ErrorHandling = () => {
  return (
    <section id="error-handling" className="mt-16">
      <SectionTitle title="Error Handling" anchor="error-handling" />
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The API uses conventional HTTP response codes to indicate the success or failure of requests. In general, 
        codes in the 2xx range indicate success, codes in the 4xx range indicate an error that resulted from the 
        provided information (e.g., missing required parameters, invalid authentication), and codes in the 
        5xx range indicate an error with the server.
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">HTTP Status Codes</h3>
        
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">200 OK</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">The request was successful.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">201 Created</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">The request has been fulfilled, resulting in the creation of a new resource.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">400 Bad Request</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">The request was invalid or cannot be served. The exact error is explained in the response body.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">401 Unauthorized</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">The request requires user authentication or the authentication has failed.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">403 Forbidden</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">The server understood the request but refuses to authorize it.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">404 Not Found</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">The requested resource could not be found.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">429 Too Many Requests</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">You've hit the rate limit for a specific endpoint.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">500 Internal Server Error</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Something went wrong on the server.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Error Response Format</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Error responses include a consistent JSON structure with information about the error.
        </p>
        <pre className="mt-4 bg-gray-800 dark:bg-black text-white p-4 rounded-md text-sm overflow-x-auto">
{`{
  "success": false,
  "status": 400,
  "message": "Invalid request parameters",
  "error": "Missing required field: email"
}`}
        </pre>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Common Error Messages</h3>
        
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Authentication Errors</h4>
            <ul className="mt-2 list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
              <li>"Invalid credentials"</li>
              <li>"Token is required for authentication"</li>
              <li>"Invalid token"</li>
              <li>"Token has expired"</li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">User Errors</h4>
            <ul className="mt-2 list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
              <li>"User already exists"</li>
              <li>"User not found"</li>
              <li>"Email is already in use"</li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Friend Request Errors</h4>
            <ul className="mt-2 list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
              <li>"Friend request already sent"</li>
              <li>"Cannot send friend request to yourself"</li>
              <li>"Users are already friends"</li>
              <li>"Friend request not found"</li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Messaging Errors</h4>
            <ul className="mt-2 list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
              <li>"Receiver not found"</li>
              <li>"Cannot send message to yourself"</li>
              <li>"Message content is required"</li>
              <li>"Chat not found"</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Rate Limiting</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          To protect our API from abuse, we implement rate limiting on certain endpoints. When you exceed the 
          rate limit, you'll receive a 429 status code with a response indicating when you can try again.
        </p>
        <pre className="mt-4 bg-gray-800 dark:bg-black text-white p-4 rounded-md text-sm overflow-x-auto">
{`{
  "success": false,
  "status": 429,
  "message": "Too many login attempts, please try again later",
  "retryAfter": 900 // seconds until you can retry
}`}
        </pre>
      </div>
    </section>
  );
};

export default ErrorHandling;
