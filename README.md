# 📊 AssetWise - Portfolio Rebalancer

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

## 🎯 About The Project

**AssetWise** is a full-stack web application designed to help investors rebalance their portfolios. It allows users to register their financial assets and then calculate the optimal allocation for a new contribution, prioritizing assets that are below their target percentage.

This approach helps in rebalancing without the need to sell assets, which can avoid taxes and fees.

## ✨ Features

- **Asset Registration**: A dedicated "Wallet" page to add, and persist financial assets (description, amount, target %, currency) in a database.
- **Rebalancing Calculator**: A calculator that takes a new contribution amount and suggests the best allocation to rebalance the portfolio.
- **Client-Side Logic**: The calculation is performed instantly in the browser.
- **REST API**: A backend service built with Node.js and Express to manage asset data.
- **Database**: Uses Prisma ORM with an SQLite database to store portfolio information.

## 🚀 Tech Stack

- **Frontend**:
  - HTML5
  - CSS3
  - Vanilla JavaScript (ES6+)
- **Backend**:
  - Node.js
  - Express.js
  - Prisma (ORM)
  - SQLite
  - Cors

## ⚙️ Getting Started

To run this project locally, you will need [Node.js](https://nodejs.org/) installed. Follow the steps below.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/portfolio-rebalancer-js.git
cd portfolio-rebalancer-js
```

### 2. Configure the Backend

Navigate to the backend directory, install dependencies, and set up the database.

```bash
# Go to the backend folder
cd Backend

# Install dependencies
npm install

# Create and apply the database schema
npx prisma migrate dev --name init
```

### 3. Run the Backend Server

From the `Backend` directory, start the server:

```bash
# The server will run on http://localhost:3000
npm start
```

### 4. Use the Application

Open the frontend files directly in your web browser:

- **Open `Frontend/wallet.html`**: To add your assets to the portfolio. The form on this page communicates with the backend.
- **Open `Frontend/index.html`**: To use the rebalancing calculator. Enter a contribution amount and see the suggested allocation.

> **Note**: The current version of the calculator in `index.html` uses a hardcoded portfolio for demonstration purposes and is not yet connected to the database. The asset registration in `wallet.html` works as expected.

## 📜 License

Distributed under the MIT License. See the `LICENSE` file for more information.
