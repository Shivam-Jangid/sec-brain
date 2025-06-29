# Second Brain

## Overview

**Second Brain** is a web application designed to help users save and manage links to YouTube videos, LinkedIn posts, or important documents for later viewing. With built-in authentication, Second Brain ensures your saved content is private and accessible only to you.

---

## Features

- **Save Links:** Add YouTube video URLs, LinkedIn post links, or document links to your personal dashboard for later access.
- **User Authentication:** Secure sign-in and sign-out using JWT for personalized content management.
- **Easy Access:** Quickly revisit your saved links anytime from any device.
- **Simple UI:** User-friendly interface to add, view, and manage your saved content.
- **Modern Tech Stack:** Built with React, Node.js, MongoDB, TypeScript, Tailwind CSS, and Axios for robust and efficient performance.

---

## Technologies Used

- **Frontend:** [React.js](https://reactjs.org/) (with [TypeScript](https://www.typescriptlang.org/)), [Tailwind CSS](https://tailwindcss.com/), [Axios](https://axios-http.com/)
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Authentication:** [JWT (JSON Web Tokens)](https://jwt.io/)
- **Database:** [MongoDB](https://www.mongodb.com/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud, e.g., MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shivam-Jangid/Second Brain.git
   cd Second Brain
   ```

2. **Install dependencies:**
   - For the frontend:
     ```bash
     cd client
     npm install
     # or
     yarn install
     ```
   - For the backend:
     ```bash
     cd ../server
     npm install
     # or
     yarn install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in both `client` and `server` directories based on provided examples or documentation.
   - Backend `.env` should include:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5173
     ```
   - Frontend `.env` may include API endpoints and other configs.

4. **Run the app:**
   - Start the backend server:
     ```bash
     cd server
     npm run dev
     ```
   - Start the frontend app:
     ```bash
     cd ../client
     npm start
     ```

---

## Usage

1. **Sign up or Sign in:**  
   Access the authentication page and log in with your credentials.

2. **Save a Link:**  
   Use the "Add Link" button to paste a YouTube, LinkedIn, or document URL.

3. **View Saved Content:**  
   Your dashboard will display all saved links with options to open or remove them.

4. **Sign Out:**  
   Use the sign-out option to securely end your session.

---

## Example Workflow

```plaintext
1. Sign in or register for an account.
2. Click "Add Link" and paste your desired URL.
3. See all your saved links listed on your dashboard.
4. Click any link to open it, or remove it if you no longer need it.
```

---

## Project Structure

```
Second Brain/
  ├── client/       # React frontend (TypeScript, Tailwind CSS)
  ├── server/       # Node.js backend (Express, TypeScript)
  ├── README.md
  └── ...
```

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or feedback, please open an issue or contact [Shivam-Jangid](https://github.com/Shivam-Jangid).
