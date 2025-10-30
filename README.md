# Inventory Management System - Frontend

This is the frontend for a modern, responsive inventory management system built with React. It provides a user-friendly interface for managing products, orders, customers, and analyzing inventory data.

![Dashboard Screenshot](placeholder.png) <!-- TODO: Add a screenshot of the dashboard -->

## ✨ Features

*   **Secure User Authentication**: Robust login and signup flows.
*   **Two-Factor Authentication (2FA)**: Enhanced security during login.
*   **Password Strength Checker**: Real-time feedback on the signup page to encourage strong passwords.
*   **Password Policy Enforcement**: Ensures passwords meet security criteria (alphanumeric, special characters).
*   **Intuitive Dashboard**: A central hub for a quick overview of inventory status.
*   **Comprehensive Modules**:
    *   **Inventory**: Track products, stock levels, and details.
    *   **Orders**: Manage incoming and outgoing orders.
    *   **Customers**: Maintain a database of customer information.
    *   **Analytics**: Visualize data and gain insights into inventory trends.
    *   **Invoices**: Generate and track invoices.
    *   **Alerts**: Get notifications for low stock or other important events.
*   **User Settings**: Manage profile information and security settings like changing passwords.
*   **Responsive Design**: A clean and accessible UI that works on various screen sizes.

## 🛠️ Tech Stack

*   **Framework**: [React](https://reactjs.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Routing**: [React Router](https://reactrouter.com/)
*   **State Management**: React Context API
*   **Styling**: Plain CSS with a modular approach
*   **Password Strength Analysis**: [zxcvbn](https://github.com/dropbox/zxcvbn)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later is recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**
    ```sh
    git clone <your-repository-url>
    cd inventory
    ```

2.  **Navigate to the frontend directory**
    ```sh
    cd frontend
    ```

3.  **Install dependencies**
    ```sh
    npm install
    ```

### Running the Development Server

1.  **Start the Vite dev server**
    ```sh
    npm run dev
    ```

2.  **Open the application**
    Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 📁 Project Structure

The `frontend/src` directory is organized as follows:

```
src/
├── assets/         # Static assets like images and icons
├── components/     # Reusable UI components (Layout, Sidebar, etc.)
├── context/        # React context for global state (e.g., AuthContext)
├── pages/          # Top-level page components for each route
├── App.jsx         # Main application component with routing logic
├── main.jsx        # Application entry point
└── index.css       # Global styles
```