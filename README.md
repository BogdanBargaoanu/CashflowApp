## CashflowApp: Track Your Finances with Vue.js, Node.js and MySQL

This project is a full-stack cashflow management application built with Vue.js on the frontend and Node.js with a MySQL database on the backend.

**Key Features:**

- **Intuitive Interface:** The Vue.js client app provides a user-friendly experience for managing transactions.
- **Secure Login:** User authentication is ensured through JWT (JSON Web Token) for a robust login process. //to be added - password crypting
- **Local MySQL Database:** Stores your financial data securely on your local machine using MySQL.
- **Transaction Logging:** Keeps track of all your income and expenses, allowing for comprehensive financial analysis.
- **Time-Based Tracking:** Visualize your cashflow trends over time by integrating with Google Graphs.
- **Swagger API Documentation:** The server-side application offers a well-defined API using Swagger, making it easy for developers to interact with the backend.

## Prerequisites

* **Node.js and npm (Node Package Manager):** These are required to run the application. You can download them from the official Node.js website: https://nodejs.org/en

## Installation

1. **Clone the Repository:**

   Open your terminal and use the `git clone` command followed by the URL of the repository.

   ```bash
   git clone https://github.com/BogdanBargaoanu/CashflowApp.git
   
2. **Navigate to the project directory:**

   Use the `cd` command to navigate to the directory containing your cloned repository. For example:

   ```bash
   cd repo-location

3. **Install dependencies:**

   The project has dependencies (additional packages it needs to run). Use the `npm` command to install them by running:

    ```bash
    npm install
    ```
    <i> Note - dependencies should also be installed for the cashflow-client app. </i>

4. **Start the server app:**

   Run the following command in your terminal to start the server app:

   ```bash
   npm start

5. **Access the API:**

   Open your web browser and navigate to `http://localhost:3000/api`.

6. **Start the app:**

   Navigate to the `cashflow-client` directory and use the following command in the terminal:

   ```bash
   npm run serve

7. **Access the App:**

   Open your web browser and navigate to `http://localhost:8081`.
    
   
