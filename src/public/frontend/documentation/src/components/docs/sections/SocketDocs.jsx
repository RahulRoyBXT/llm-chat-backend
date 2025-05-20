import React from "react";
import SectionTitle from "../SectionTitle";

const SocketDocs = () => {
  return (
    <section id="socket" className="mt-16">
      <SectionTitle title="Real-time API (Socket.io)" anchor="socket" />
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The Llama Chat App supports real-time features using Socket.io. This allows for immediate message delivery, 
        online status updates, and typing indicators.
      </p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Connection</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          To connect to the Socket.io server, use the following code example:
        </p>
        <pre className="mt-2 bg-gray-800 dark:bg-black text-white p-4 rounded-md text-sm overflow-x-auto">
{`// Client-side JavaScript with Socket.io client
const socket = io('https://your-api-domain.com', {
  withCredentials: true
});

// Connect and identify the user
socket.on('connect', () => {
  // Authenticate user after connection
  socket.emit('user_connected', userId);
});`}
        </pre>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Events</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The following events are available in the Socket.io API:
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Direction</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payload</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">user_connected</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Client → Server</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Notify the server that a user is online</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">userId (string)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">send_message</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Client → Server</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Send a message to another user</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <pre className="text-xs">{`{
  uniqueId: string,
  sender: string,
  receiver: string,
  content: string,
  timestamp: string,
  date: string,
  status: string
}`}</pre>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">receive_message</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Server → Client</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Receive a message from another user</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <pre className="text-xs">{`{
  uniqueId: string,
  sender: string,
  receiver: string,
  content: string,
  timestamp: string,
  status: string
}`}</pre>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">user_online</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Client → Server</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Sync messages when user comes online</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">userId (string)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">disconnect</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Client → Server</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Notify server when user disconnects</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">None (automatic)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example: Sending a Message</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here's how to send a message using Socket.io:
        </p>
        <pre className="mt-2 bg-gray-800 dark:bg-black text-white p-4 rounded-md text-sm overflow-x-auto">
{`// Client-side code
socket.emit('send_message', {
  uniqueId: 'msg_' + Date.now(),
  sender: currentUserId,
  receiver: recipientId,
  content: 'Hello there!',
  timestamp: new Date().toISOString(),
  date: new Date().toLocaleDateString(),
  status: 'sent'
});

// Listen for incoming messages
socket.on('receive_message', (message) => {
  console.log('New message received:', message);
  // Update UI with new message
});`}
        </pre>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Redis Integration</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The Socket.io implementation uses Redis for message caching and user session management. This allows for:
        </p>
        <ul className="mt-2 list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
          <li>Storing user online status</li>
          <li>Caching recent messages</li>
          <li>Tracking message delivery status</li>
          <li>Handling multiple server instances with the Redis adapter</li>
        </ul>
      </div>
    </section>
  );
};

export default SocketDocs;
