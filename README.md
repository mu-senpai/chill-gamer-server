# Chill Gamer: A Game Review Application

Chill Gamer is a user-friendly platform for gamers to explore and share reviews. Built with simplicity and functionality in mind, it offers an engaging experience with features like authentication, protected routes, and animations.

## Features

- **Game Reviews**: View, add, update, and delete game reviews.
- **Authentication**: Secure login and registration with Firebase.
- **Protected Routes**: Access to features like My Reviews and Watchlist for authenticated users only.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Interactive UI**: Enhanced with React Awesome Reveal, AOS, and React Tooltip.
- **Sorting and Filtering**: Easily sort and filter reviews based on ratings, genres, and release year.

## Technologies Used

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Authentication**: Firebase
- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Animations**: AOS, React Awesome Reveal
- **Tooltips**: React Tooltip
- **Deployment**: Firebase (Client) and Vercel (Server)

## Installation and Usage

1. Clone the repositories:
   ```bash
   git clone [client-repo-url]
   git clone [server-repo-url]
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Add environment variables:
   - Configure `.env` files with Firebase credentials and MongoDB connection details.

4. Run the development servers:
   ```bash
   cd client
   npm start
   cd ../server
   npm run start
   ```

5. Open your browser at `http://localhost:3000`.

## Live Demo

Explore the live version of Chill Gamer: [Live Demo](https://chill-gamer-646e9.web.app/)

## Challenges Implemented

- **Dark/Light Theme**: Switch between themes for a customized experience.
- **Engaging UI**: Used animations and tooltips to improve interactivity.

---

Enjoy exploring and sharing your favorite games with **Chill Gamer**!
