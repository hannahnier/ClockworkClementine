# Clockwork Clementine

Clockwork Clementine is an event management system developed as part of a full-stack training program. While combining both backend and frontend technologies, its focus is clearly on the backend.

The main goal was to create a seamless user experience for managing events and calendars. In addition to basic features such as setting up a server, managing database connections and integrating a frontend interface, the project also includes several advanced features, such as user authentication, error handling, and data validation.

## Technologies Used

- **Backend:** Node.js, Express, Mongoose, JWT
- **Frontend:** React with Vite, React Big Calendar
- **Styling:** Native CSS

## Features

- **CRUD Operations:** Full implementation of Create, Read, Update, and Delete operations for events and calendars.
- **Multi-Calendar Management:** Ability to manage multiple calendars simultaneously in one integrated display.
- **User Authentication with cookies:** Secure user authentication using Jason Web Token (JWT) and cookies.
- **Data Validation:** Strong data validation to ensure integrity.
- **Error Handling:** Error handling middleware, with important error messages being transferred to the frontend.

<img src="./src/assets/screenshot2.png" width="600">

## Database Relations

Three mongoose collections are in use (users, calendars and events). This made it necessary to populate data and manage all collections effectively:

<img src="./src/assets/screenshot.png">

## Installation and Local Usage

To run the app locally on your device, follow these steps:

1. **Clone the Repository and navigate to the project directory:**

   ```bash
   git clone git@github.com:username/repository.git
   cd repository
   ```

2. **Set Server URL to Localhost:**
   In `frontend/src/utils/ContextProvider.jsx`, make sure to set:

   ```javascript
   const baseUrl = "http://localhost:3000";
   ```

3. **Install Dependencies:**
   Install npm (node package manager) if necessary. Then, run the following commands to install the required packages:

   ```javascript
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    cd ..

   ```

4. **Start the Server and Client:**

   ```javascript
    cd backend && nodemon server.js
    cd ../frontend && npm run dev
   ```

5. **Access the application:**
   Follow the link provided in your terminal to access the application.

## Deployed Website

Take a look at the deployed website here: [ClockworkClementine.onrender.com](https://ClockworkClementine.onrender.com/)

### Important Notice

**Registration and login will only work if you enable third-party cookies for this site.** If your browser usually blocks these, please make sure to add "clockworkclementine.onrender.com" to the Allow List.

For instance, in Google Chrome:

1. Go to `Settings`
2. Navigate to `Privacy and security`
3. Click on `Third party cookies`
4. Go to `Sites allowed to use third-party cookies`
5. Add "clockworkclementine.onrender.com" to the list

### Preconfigured login data

If you do not want to register, consider using the following login data:

<img src="./src/assets/testLogin.png" alt="image of login" width="300">
