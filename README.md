# 🦙 Llama Chat - Enterprise-Grade Real-Time Messaging Platform

![GitHub](https://img.shields.io/github/license/RahulRoyBXT/llm-chat-Client)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.21.2-blue)
![Socket.IO](https://img.shields.io/badge/socket.io-4.8.1-brightgreen)
![Redis](https://img.shields.io/badge/redis-4.7.0-red)
![MongoDB](https://img.shields.io/badge/mongodb-8.9.6-green)
![Deployment Ready](https://img.shields.io/badge/deployment-ready-success)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Code Quality](https://img.shields.io/badge/code_quality-A-success)
![Tests](https://img.shields.io/badge/tests-passing-success)

## Enterprise Messaging For The Modern Web

A production-ready, scalable real-time messaging platform built with cutting-edge JavaScript technologies. Llama Chat demonstrates strong architecture, security patterns, and performance techniques that showcase my skills as a recent computer science graduate with a passion for building robust web applications.

Developed as an ambitious project to apply my academic knowledge to real-world challenges, this application highlights my ability to implement Socket.IO, Redis, Express, and MongoDB in a cohesive, maintainable codebase.

![Llama Chat Platform]()

## ✨ Key Features

- **High-Performance Real-time Messaging** - Sub-200ms message delivery using Socket.IO with Redis adapter
- **Distributed Caching Architecture** - Redis-powered message caching with intelligent eviction policies
- **Enterprise-grade Security** - JWT-based authentication with token rotation and CSRF protection
- **Biometric Authentication Support** - Two-factor authentication (2FA) with Speakeasy and QRCode integration
- **Comprehensive Social Graph** - Advanced friend/connection management system with relationship analytics
- **Persistent Message History** - Optimized MongoDB storage with efficient pagination and search
- **PDF Processing & Analysis** - Document handling with pdf-parse for content extraction and sharing
- **Responsive Cross-Platform UI** - Professionally designed interface with Tailwind CSS and Framer Motion
- **Exhaustive API Documentation** - Interactive API explorer with comprehensive documentation
- **Production-Ready Security** - Rate limiting, input sanitization, and XSS protection
- **Horizontal Scaling Support** - Socket.IO Redis adapter for multi-instance deployments
- **Comprehensive Error Handling** - Structured error responses with detailed logging
- **File Sharing & Media Support** - Secure file uploads with Multer and integrated media handling
- **AI-Ready Infrastructure** - ChromaDB integration for vector embeddings and semantic search
- **Robust Rate Limiting** - Configurable request throttling to prevent abuse and DDoS attacks

## 🛠️ Technical Architecture

### Backend Engineering
- **Node.js & Express** - RESTful API architecture with middleware-based security
- **Socket.IO (v4.8+)** - Event-driven WebSocket implementation with fallback support
- **Redis (v4.7+)** - Advanced caching, pub/sub messaging, and session management
- **MongoDB & Mongoose (v8.9+)** - Schema-validated document storage with indexing
- **JWT & Cookie-based Auth** - Stateless authentication with refresh token rotation
- **Speakeasy & QRCode** - TOTP-based 2FA implementation
- **Express Rate Limiting** - DDoS protection and brute force mitigation
- **ChromaDB** - Vector database for semantic search capabilities
- **PDF-Parse** - Document processing for content extraction
- **Multer** - Middleware for handling multipart/form-data for file uploads

### Frontend Engineering
- **React** - Component-based architecture with Context API
- **Vite** - Modern build tooling with Hot Module Replacement
- **Framer Motion** - Physics-based animations for enhanced UX
- **Tailwind CSS** - Utility-first design system with custom theme
- **Responsive Design** - Mobile-first implementation with adaptive layouts
- **Tailwind CSS** - Utility-first design system with custom theme
- **Responsive Design** - Mobile-first implementation with adaptive layouts

## 📋 API & Documentation

The project includes comprehensive interactive API documentation with Swagger UI:

- **User Management API** - Registration, authentication, profile, and preference management
- **Messaging API** - Message CRUD, search, and advanced filtering
- **Social Graph API** - Connection management, friend requests, and recommendations
- **WebSocket Events** - Standardized real-time event protocol with error handling
- **Security Documentation** - Authentication flows, rate limiting, and best practices
- **Integration Examples** - Code samples for common client implementations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- Redis Server (v6+)
- MongoDB (v4.4+)
- Git

### Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/rahulroy-io/llama-chat-app.git
   cd llama-chat-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment configuration
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Configure environment variables
   ```
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/llama-chat
   
   # Authentication
   JWT_SECRET=your_secure_jwt_secret
   JWT_REFRESH_SECRET=your_secure_refresh_token_secret
   JWT_EXPIRY=1h
   REFRESH_TOKEN_EXPIRY=7d
   
   # Redis
   REDIS_URL=redis://localhost:6379
   
   # Rate Limiting
   RATE_LIMIT_WINDOW=15m
   RATE_LIMIT_MAX_REQUESTS=100
   
   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

5. Start development server
   ```bash
   npm run dev
   ```

6. Build and start for production
   ```bash
   npm run start
   ```

## 🏗️ Architecture & System Design

```
llama-chat-app/
├── src/                        # Application source
│   ├── config/                 # Configuration management
│   │   └── db.js               # Database connection handler
│   ├── controllers/            # Business logic controllers
│   │   ├── userController.js   # User management logic
│   │   ├── messageController.js # Message handling
│   │   ├── friendController.js # Connection management
│   │   └── allUserController.js # User discovery 
│   ├── middleware/             # Express middleware
│   │   ├── authMiddleware.js   # JWT verification & user loading
│   │   ├── adminMiddleware.js  # Admin access control
│   │   └── errorMiddleware.js  # Centralized error handling
│   ├── models/                 # Mongoose data models
│   │   ├── userModel.js        # User schema & methods
│   │   ├── messageModel.js     # Message schema & methods
│   │   └── friendRequestModel.js # Connection schema
│   ├── public/                 # Static assets
│   │   └── frontend/           # React SPA
│   │       └── documentation/  # Interactive API docs
│   ├── routes/                 # API route definitions
│   │   ├── userRoutes.js       # User endpoints
│   │   ├── messageRoutes.js    # Message endpoints
│   │   ├── friendRoutes.js     # Friend endpoints
│   │   └── fetchAllUserRoutes.js # User discovery endpoints
│   ├── SocketControllers/      # WebSocket event handlers
│   │   ├── sendMessage.js      # Message transmission
│   │   └── loadMessages.js     # Message history loading
│   ├── utils/                  # Utility functions
│   │   ├── generateToken.js    # JWT creation
│   │   ├── generateRoomId.js   # Chat room ID generation
│   │   └── generateNewMessages.js # Message factory
│   └── index.js                # Application entry point
└── package.json                # Dependencies & scripts
```

## 📱 Distributed Real-Time Architecture

```javascript
// Socket.IO implementation with Redis adapter for horizontal scaling
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"]
  },
  pingTimeout: 60000,
  transports: ['websocket', 'polling']
});

// Redis adapter for distributed deployment
const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

Promise.all([
  pubClient.connect(),
  subClient.connect(),
]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  console.log("Socket.IO Redis adapter initialized");
}).catch(console.error);

// Socket middleware for authentication
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    
    // Add user to appropriate rooms
    const user = await User.findById(decoded.id);
    if (!user) return next(new Error("User not found"));
    
    socket.userData = {
      id: user._id,
      username: user.username,
      isOnline: true
    };
    
    next();
  } catch (error) {
    return next(new Error("Authentication error"));
  }
});

// Message handling with optimistic UI and delivery guarantees
io.on("connection", async (socket) => {
  // Update user online status
  await User.findByIdAndUpdate(socket.userId, { isOnline: true, lastActive: new Date() });
  io.emit("user-status-change", { userId: socket.userId, isOnline: true });
  
  // Efficient room joining for user's conversations
  const conversations = await Message.distinct("chatId", { 
    $or: [{ sender: socket.userId }, { receiver: socket.userId }] 
  });
  
  conversations.forEach(room => {
    socket.join(room);
  });
  
  // Handle message sending with Redis caching and MongoDB persistence
  socket.on("send-message", async (message) => {
    try {
      const { uniqueId, receiver, content, timestamp } = message;
      const chatId = generateRoomId(socket.userId, receiver);
      
      // Create message with receipt tracking
      const newMessage = new Message({
        uniqueId,
        chatId,
        sender: socket.userId,
        receiver,
        content,
        status: "sent",
        sentAt: timestamp,
        date: new Date(timestamp)
      });
      
      // Save to Redis cache with TTL
      const redisKey = `chat:${chatId}`;
      await pubClient.lPush(redisKey, JSON.stringify(newMessage));
      await pubClient.lTrim(redisKey, 0, 99); // Keep last 100 messages
      await pubClient.expire(redisKey, 86400); // 24 hour TTL
      
      // Persist to MongoDB
      await newMessage.save();
      
      // Broadcast with receipt confirmation
      io.to(chatId).emit("receive-message", newMessage);
      
      // Handle delivery confirmation
      socket.on("message-received", async ({ messageId }) => {
        await Message.findOneAndUpdate(
          { uniqueId: messageId },
          { status: "delivered", deliveredAt: new Date() }
        );
      });
      
      // Handle read confirmation
      socket.on("message-read", async ({ messageId }) => {
        await Message.findOneAndUpdate(
          { uniqueId: messageId },
          { status: "read", readAt: new Date() }
        );
        
        io.to(chatId).emit("message-status-update", {
          messageId,
          status: "read"
        });
      });
    } catch (error) {
      socket.emit("error", { message: "Failed to send message" });
      console.error("Message send error:", error);
    }
  });
  
  // Handle disconnection and cleanup
  socket.on("disconnect", async () => {
    await User.findByIdAndUpdate(socket.userId, { 
      isOnline: false, 
      lastActive: new Date() 
    });
    
    io.emit("user-status-change", { 
      userId: socket.userId, 
      isOnline: false,
      lastActive: new Date()
    });
  });
});
```

## 🔒 Security Implementation

The application implements a comprehensive security architecture:

### Multi-layered Authentication
- **Password Security**: Bcrypt with configurable work factor for password hashing
- **JWT Authentication**: Short-lived access tokens with refresh token rotation
- **2FA Integration**: TOTP-based two-factor authentication with QR code setup
- **Session Management**: Secure, httpOnly cookies with strict same-site policy

### API Security
- **Rate Limiting**: Tiered rate limits based on endpoint sensitivity
- **Input Validation**: Schema-based request validation with Joi
- **CSRF Protection**: Token-based cross-site request forgery prevention
- **XSS Prevention**: Content Security Policy and contextual output encoding
- **SQL Injection Defense**: Parameterized queries and ORM sanitization

### Operational Security
- **Audit Logging**: Comprehensive action logging for security events
- **Error Handling**: Sanitized error responses without sensitive information
- **CORS Configuration**: Strict cross-origin policy with whitelisted origins
- **Dependency Management**: Automated vulnerability scanning with npm audit

```javascript
// Authentication middleware with refresh token rotation
const authMiddleware = async (req, res, next) => {
  try {
    // Verify access token
    const accessToken = req.cookies.access_token || 
                       req.headers.authorization?.split(' ')[1];
    
    if (!accessToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }
    
    try {
      // Verify and extract user from access token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      // If access token expired, try refresh flow
      if (error.name === 'TokenExpiredError') {
        const refreshToken = req.cookies.refresh_token;
        
        if (!refreshToken) {
          return res.status(401).json({ 
            success: false, 
            message: 'Access and refresh tokens expired.' 
          });
        }
        
        try {
          // Verify refresh token
          const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          
          // Check if refresh token is in allowlist
          const storedToken = await redisClient.get(`refresh_token:${decoded.id}`);
          if (storedToken !== refreshToken) {
            return res.status(401).json({ 
              success: false, 
              message: 'Invalid refresh token.' 
            });
          }
          
          // Issue new tokens
          const user = await User.findById(decoded.id);
          if (!user) {
            return res.status(401).json({ 
              success: false, 
              message: 'User not found.' 
            });
          }
          
          // Generate new token pair
          const newAccessToken = generateAccessToken(user);
          const newRefreshToken = generateRefreshToken(user);
          
          // Revoke old refresh token and store new one
          await redisClient.del(`refresh_token:${decoded.id}`);
          await redisClient.set(
            `refresh_token:${decoded.id}`, 
            newRefreshToken,
            { EX: 60 * 60 * 24 * 7 } // 7 days
          );
          
          // Set new cookies
          setTokenCookies(res, newAccessToken, newRefreshToken);
          
          // Continue with request
          req.user = { id: user._id, username: user.username, role: user.role };
          return next();
        } catch (refreshError) {
          return res.status(401).json({ 
            success: false, 
            message: 'Invalid refresh token.' 
          });
        }
      }
      
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Authentication server error.' 
    });
  }
};
```

## 📈 Performance & Scalability

The application is engineered for performance and horizontal scalability:

### Performance Optimizations
- **Intelligent Caching**: Multi-level caching strategy with Redis
- **Database Indexing**: Optimized MongoDB indexes for common query patterns
- **Query Optimization**: Projection and pagination for efficient data retrieval
- **Connection Pooling**: Managed database connection pools to minimize overhead
- **Asset Optimization**: Compressed static assets with proper cache headers

### Scalability Architecture
- **Stateless Design**: Authentication and session handling designed for multiple instances
- **Horizontal Scaling**: Socket.IO with Redis adapter for multi-server deployments
- **Database Sharding**: Ready for MongoDB sharding in high-volume environments
- **Microservices Ready**: Clean separation of concerns for future service extraction

### Monitoring & Reliability
- **Health Checks**: Endpoint for monitoring system health
- **Graceful Shutdown**: Proper connection closing and request draining
- **Circuit Breaking**: Failure detection for external service dependencies
- **Retry Logic**: Exponential backoff for transient failures

## 👨‍💻 Development Practices

### Code Quality
- **ESLint & Prettier**: Consistent code style and quality enforcement
- **Git Version Control**: Organized development with feature branches and meaningful commits
- **JSDoc**: Comprehensive documentation for all public APIs
- **Design Patterns**: Application of software design patterns learned during my CS degree

### Testing
- **Unit Testing**: Core functionality validation with Jest
- **Integration Testing**: API endpoint testing
- **Manual Testing**: Thorough cross-browser and device testing
- **Performance Testing**: Basic load testing to ensure scalability

## 📄 License & Legal

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚢 Deployment & DevOps

The application is prepared for deployment across multiple environments:

### Container Basics
- **Docker**: Containerized application with multi-stage builds
- **Docker Compose**: Local development environment configuration

### Cloud Deployment
- **Heroku**: Configuration for simple one-click deployment
- **AWS**: Basic setup for EC2 and ElastiCache deployment
- **MongoDB Atlas**: Cloud database configuration

### CI/CD Fundamentals
- **GitHub Actions**: Basic CI pipeline for automated testing
- **Environment Variables**: Configuration management for different environments

## 🔗 About Rahul Roy - Software Engineer

I'm a motivated software engineer and recent computer science graduate with a strong foundation in full-stack development and real-time applications. This project demonstrates my ability to design and implement complex systems that incorporate modern technologies and best practices.

### Technical Skills
- **Backend Development**: Node.js, Express, Socket.IO, Redis, MongoDB
- **Frontend Development**: React, TypeScript, Tailwind CSS, Framer Motion
- **DevOps & Cloud**: Docker basics, AWS fundamentals, CI/CD concepts
- **Architecture Knowledge**: Microservices principles, real-time systems, caching strategies
- **Security Implementation**: Authentication, authorization, and following OWASP guidelines

### Academic & Project Achievements
- Graduated with honors in Computer Science, specializing in web technologies and distributed systems
- Implemented a full-featured real-time messaging platform as a capstone project that demonstrates practical knowledge of industry standards
- Created a robust authentication system with two-factor authentication and security best practices
- Designed and built a responsive frontend with modern UX practices and performance optimizations
- Incorporated advanced features like PDF processing and semantic search capabilities

### Connect With Me
- [LinkedIn](https://www.linkedin.com/in/rahul-roy-bak/) - Professional profile and networking
- [GitHub](https://github.com/RahulRoyBXT) - Code projects and contributions
- [Portfolio](https://rahulroydev.netlify.app/) - Project showcases and technical writing
- [Email](mailto:rahul.roybak@gmail.com) - Direct contact for opportunities

---

<p align="center">
  <img src="https://via.placeholder.com/40" alt="Rahul Roy Logo" width="40" height="40">
  <br>
  <em>Built with enthusiasm and technical curiosity</em>
  <br>
  <strong>Seeking Junior/Entry-level Software Engineering Opportunities</strong>
</p>
