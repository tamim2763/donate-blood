# Donate-Blood Web App

A front-end prototype built with Node.js that connects blood donors with patients through a web-based platform.

### 🚀 Live Demo

[**View the live site here!**](https://donate-blood-one.vercel.app/)

---

### About This Project

This project was built to solve a critical problem: connecting blood donors with those in need. It provides a full-stack platform for users to register as donors and for patients to find donors based on blood type.

---

### 🛠 Tech Stack

* **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcrypt
* **Frontend:** HTML, CSS, Vanilla JavaScript, Bootstrap
* **Deployment:** Vercel

---

### Features

* **Secure User Authentication:** Full register and login system using JWT for protected routes.
* **Donor Dashboard:** A private, authenticated dashboard (`/dashboard`) where users can view and update their profile information (name, last donation date, etc.).
* **Donor Search:** A protected feature (`/find_donor`) that allows logged-in users to search for eligible donors by blood group.
* **Eligibility Logic:** The server automatically calculates if a donor is eligible to donate based on their last donation date.

---

### How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/tamim2763/donate-blood.git](https://github.com/tamim2763/donate-blood.git)
    ```
2.  Navigate to the project folder:
    ```bash
    cd donate-blood
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the server:
    ```bash
    node server.js
    ```
5.  Open your browser and go to `http://localhost:3000`.