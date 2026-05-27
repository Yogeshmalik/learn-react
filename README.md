# 🍜 Namaste Food - A React-Powered Food Ordering App

Welcome to Parcel Food, a modern, feature-rich food ordering web application built with React. This project is inspired by major food delivery platforms like Swiggy and demonstrates a wide range of modern frontend development practices. It fetches live restaurant data and provides a seamless, responsive user experience.

**[➡️ Live Demo Link](https://parcel-food.vercel.app/)**

---

## ✨ Key Features

- **Live Restaurant Data**: Fetches and displays a list of nearby restaurants using Swiggy's live public API.
- **Dynamic Restaurant Menus**: Click on a restaurant to view its detailed menu, complete with item prices and descriptions.
- **Search & Filter**: Easily search for restaurants or filter them based on ratings.
- **Fully Functional Cart**:
  - Add items to the cart.
  - Increment or decrement item quantity.
  - Remove items from the cart.
  - Clear the entire cart.
- **Excellent UI/UX**:
  - **Shimmer UI**: A beautiful loading skeleton that mimics the page layout, providing a better user experience than a traditional spinner.
  - **Responsive Design**: A mobile-first approach ensures the app looks and works great on all devices, from small phones to large desktops.
  - **Online/Offline Status**: The app detects the user's network status and provides feedback.
- **Mock Authentication**: A simple login/logout flow to demonstrate user context management. Use the placeholder's name/password as credentials.

---

## 🛠️ Tech Stack & Tools

| Category             | Technology                                                      |
| -------------------- | --------------------------------------------------------------- |
| **Core Framework**   | `React.js`                                                      |
| **State Management** | `Redux Toolkit` (for Cart), `React Context API` (for User Info) |
| **Styling**          | `Tailwind CSS`                                                  |
| **Bundler**          | `Parcel`                                                        |
| **Routing**          | `React Router DOM`                                              |
| **Linting**          | `ESLint`                                                        |
| **Formatting**       | `Prettier`                                                      |
| **Deployment**       | Hosted on `Vercel`                                              |

---

## 🏗️ Architecture & Design Choices

This project was built with scalability, reusability, and separation of concerns in mind.

### Folder Structure

The `src` directory is organized logically to keep the codebase clean and maintainable:

- `/components`: Contains reusable UI components (`Button`, `ItemList`, `Header`, etc.).
- `/pages`: Contains top-level page components (`Home`, `Cart`, `RestaurantMenu`, etc.).
- `/hooks`: Houses custom hooks (`useRestaurantMenu`, `useOnlineStatus`) to encapsulate and reuse stateful logic.
- `/providers`: For React Context providers (`UserContext`).
- `/store`: Contains all Redux Toolkit logic, including slices and the store configuration.
- `/utils`: For utility functions, constants, and mock data.

### Component Reusability

A key principle of this app is DRY (Don't Repeat Yourself).

- **`ItemList.jsx`**: This single component is versatile enough to render items on both the **Restaurant Menu** page and the **Cart** page. It conditionally renders "Add" or "+/-" buttons based on the `isCart` prop, showcasing how to build flexible components.
- **`Button.jsx`**: A generic, styled button component used across the application, ensuring a consistent look and feel.

### State Management Strategy

The application uses a hybrid approach to state management, choosing the right tool for the job:

- **Redux Toolkit (RTK)**: Used for managing the **shopping cart**. The cart's state is complex (items, quantities, totals) and involves frequent, multi-faceted updates. RTK provides a centralized, predictable, and robust way to handle this complexity, with excellent debugging capabilities via Redux DevTools. The `cartSlice.js` file demonstrates how to handle actions like adding, removing, and clearing items with quantity logic.

- **React Context API**: Used for managing **user information** (e.g., logged-in user's name). This data is simpler, global, and doesn't change as frequently as the cart. The Context API is a lighter-weight solution perfect for this use case, avoiding the need for the boilerplate that Redux might introduce for simple state. The user's name from `UserContext` is seamlessly displayed in the Header and on the Cart page.

### How CORS is Managed

Web browsers enforce a security measure called the **Same-Origin Policy**, which blocks frontend JavaScript code from making requests to a different domain than the one it's served from. Swiggy's API is on a different domain, so direct API calls from the browser would fail.

**Solution**: To get around this, we need a proxy.

- **For Local Development**: A browser extension like "Allow CORS" can be used to bypass this restriction.
- **For Production**: The most robust solution is to set up a proxy server. On platforms like **Netlify**, this can be easily achieved by creating a **serverless function** that forwards the request to the Swiggy API. This way, the browser makes a request to our own domain, which then securely fetches the data from the external API on the server-side, completely bypassing the browser's CORS restrictions.

---

## 🎯 Project Level & Developer Takeaways

This is an **intermediate-level** React application. It's an excellent project for developers who are comfortable with React fundamentals and want to:

- Build a real-world, data-driven application.
- Understand and implement different state management strategies (RTK vs. Context API).
- Create a clean, scalable, and reusable component architecture.
- Work with live APIs and handle challenges like CORS.
- Implement modern UI/UX patterns like Shimmer UI.
- Configure a professional-grade development environment with a bundler, linter, and formatter.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <https://github.com/Yogeshmalik/learn-react.git>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd learn-react
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Start the development server:**

    ```bash
    npm start
    ```

    The application will be running at `http://localhost:1234`.

### Available Scripts

- `npm start`: Runs the app in development mode using Parcel.
- `npm run build`: Bundles the app for production.
- `npm test`: Runs the test suite.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License.
