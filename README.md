# Cafe POS
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/kurtsanor/cafe-pos)

A full-stack Point of Sale (POS) system designed for a cafe. It features a robust backend API for managing products, orders, and analytics, coupled with a responsive React-based frontend for cashiers and administrators.

## Features

-   **Dashboard & Analytics**: Get a quick overview of key metrics, including daily sales, total products, average order value, and top-selling items. Visualize sales data with interactive charts.
-   **Menu & Ordering**: An intuitive interface for browsing products by category and adding them to a customer's order.
-   **Product Management**: Full CRUD (Create, Read, Update, Delete) functionality for menu items. Supports image uploads to Cloudinary for product visuals.
-   **Order History**: View a paginated history of all transactions. Select an order to see a detailed summary of the items included.
-   **Secure Authentication**: JWT-based authentication system with access and refresh tokens to secure endpoints and manage user sessions.

## Tech Stack

### Frontend
-   **Framework**: React
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **UI Library**: Mantine UI
-   **Data Fetching**: TanStack Query
-   **API Client**: Axios

### Backend
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT)
-   **Image Handling**: Cloudinary for cloud-based image storage, Multer for file uploads

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or newer)
-   npm or a compatible package manager
-   A MongoDB instance (local or cloud-based)
-   A Cloudinary account

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kurtsanor/cafe-pos.git
    cd cafe-pos
    ```

2.  **Configure the Backend:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create the environment file from the template
    cp .env.template .env
    ```
    - Open the newly created `/backend/.env` file and fill in the required environment variables.
    - Start the backend development server:
    ```bash
    npm run dev
    ```
    The backend will be running on the port specified in your `.env` file (defaults to `3000`).

3.  **Configure the Frontend:**
    ```bash
    # Navigate to the frontend directory from the root
    cd frontend

    # Install dependencies
    npm install

    # Create the environment file from the template
    cp .env.template .env
    ```
    - Open the `/frontend/.env` file and set `VITE_BACKEND_URL` to your backend server's address (e.g., `http://localhost:3000`).
    - Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.

## Environment Variables

You need to configure the following environment variables for the application to work correctly.

### Backend (`/backend/.env`)

| Variable                  | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `MONGODB_URI`             | Your MongoDB connection string.                        |
| `FRONTEND_URL`            | The URL of the frontend application for CORS.          |
| `PORT`                    | The port on which the backend server will run.         |
| `CLOUDINARY_CLOUD_NAME`   | Your Cloudinary cloud name.                            |
| `CLOUDINARY_API_KEY`      | Your Cloudinary API key.                               |
| `CLOUDINARY_API_SECRET`   | Your Cloudinary API secret.                            |
| `JWT_ACCESS_SECRET`       | Secret key for signing JWT access tokens.              |
| `JWT_ACCESS_EXPIRATION`   | Expiration time for access tokens (e.g., `15m`).       |
| `JWT_REFRESH_SECRET`      | Secret key for signing JWT refresh tokens.             |
| `JWT_REFRESH_EXPIRATION`  | Expiration time for refresh tokens (e.g., `7d`).       |
| `REFRESH_TOKEN_EXPIRY_DAYS`| Number of days for the refresh token cookie expiry. |
| `NODE_ENV`                | Set to `development` or `production`.                  |

### Frontend (`/frontend/.env`)

| Variable            | Description                                  |
| ------------------- | -------------------------------------------- |
| `VITE_BACKEND_URL`  | The base URL of the backend API service.     |
