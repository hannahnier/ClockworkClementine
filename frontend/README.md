# Clockwork Clementine

Clockwork Clementine is an event management system developed as part of a full-stack training program. While combining both backend and frontend technologies, its focus is clearly on the backend.

The main goal was to create a seamless user experience for managing events and calendars. In addition to basic features such as setting up a server, managing database connections and integrating a frontend interface, the project also includes several advanced features, such as user authentication, error handling, and data validation.

Take a look at the deployed website here: [ClockworkClementine.onrender.com](https://ClockworkClementine.onrender.com/)

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

<img src="./src/assets/screenshot2.png">

## Database Relations

Three mongoose collections are in use (users, calendars and events). This made it necessary to populate data and manage all collections effectively:

<img src="./src/assets/screenshot.png">
