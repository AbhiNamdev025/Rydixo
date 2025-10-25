# Rydixo

Rydixo is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for ride booking and route management. It enables users to register, log in, find optimal routes between locations, and calculate estimated fares. The app includes secure authentication, data visualization, and map integration for a smooth and interactive experience.

## Features

- User authentication using JWT and Google OAuth
- Secure password hashing with bcrypt
- Interactive map visualization using Leaflet
- Automatic route tracking and fare calculation
- Email service and contact system via Nodemailer
- Session-based authentication using Express Session
- Data visualization using Nivo charts
- Fully responsive UI built with React
- MongoDB integration for persistent data storage

## Tech Stack

**Frontend:**
- React  
- React DOM  
- React Router DOM  
- React Icons  
- Lucide React  
- Leaflet  
- Leaflet Routing Machine  
- React Leaflet  
- Nivo Charts  

**Backend:**
- Node.js  
- Express  
- Mongoose  
- Bcrypt / BcryptJS  
- JSON Web Token  
- Body Parser  
- CORS  
- Dotenv  
- Express Session  
- Passport  
- Passport Google OAuth20  
- Nodemailer  
- Nodemon  

## Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/AbhiNamdev025/Rydixo
   cd Rydixo
   cd client && npm install


### 2. Create a .env file in the root directory and add the required configurations:

PORT=your_port

MongoURL=your_mongodb_connection

JWT_Secret_Key=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session
SESSION_SECRET=your_session_secret

# URLs
FRONTEND_URL=your_frontend_url

BACKEND_URL=tour_backend_url

# For Nodemailer contact mail
EMAIL_USER=your_email

EMAIL_PASS=your_email_app_password

### 3. Start the development server

- cd server
- npm run dev
