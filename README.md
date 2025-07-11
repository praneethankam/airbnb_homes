# Airbnb Clone 

A full-stack Airbnb-like application built with Node.js, Express, MongoDB, EJS, TailwindCSS, and Multer for file uploads.


## 🔗 Live Demo

[View Live](https://airbnb-homes.onrender.com)


## Features

- User authentication (signup/login/logout) with session management
- Two user roles: Guest and Host
- Hosts can create, edit, and delete home listings with image and PDF uploads
- Guests can view homes, add/remove favourites, and (future) book homes
- Home rules PDF download
- Responsive UI styled with TailwindCSS
- Data validation with express-validator
- File uploads handled by Multer

## Project Structure

```
.
├── controller/         # Route controllers (auth, host, store, error)
├── models/             # Mongoose models (User, Home, Favid)
├── public/             # Static assets (CSS)
├── Routes/             # Express routers
├── rules/              # Uploaded PDF rules
├── src/                # Source CSS for Tailwind
├── uploads/            # Uploaded images
├── utils/              # Utility modules
├── views/              # EJS templates
├── .env.example        # Example environment variables
├── index.js            # Main server file
├── package.json        # Project metadata and scripts
├── tailwind.config.js  # TailwindCSS config
├── postcss.config.js   # PostCSS config
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/praneethankam/airbnb_homes.git

   cd chapter15
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your MongoDB connection string and session secret:
     ```
     MONGODB_URL=your_mongodb_connection_string
     SESSION_SECRET=your_session_secret
     PORT=3000
     ```

4. **Build CSS:**
   ```sh
   npm run build
   ```

5. **Start the server:**
   ```sh
   npm start
   ```
   Or for development with auto-reload:
   ```sh
   npm run dev
   ```

6. **Open in browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run build` - Build Tailwind CSS
- `npm run dev` - Start server and watch CSS in development
- `npm start` - Start server

## Technologies Used

- Node.js, Express
- MongoDB, Mongoose
- EJS (templating)
- TailwindCSS, PostCSS, Autoprefixer
- Multer (file uploads)
- express-session, connect-mongodb-session
- express-validator
- bcryptjs (password hashing)

## License

ISC

---

**Note:** This project is for educational purposes and may require further enhancements for production
