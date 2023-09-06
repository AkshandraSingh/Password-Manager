# 🚀 Node.js Password Manager

![Password Manager](https://icon-library.com/images/password-manager-icon/password-manager-icon-12.jpg)

A secure password manager application built with Node.js that allows users to store, retrieve, and manage their passwords. This application uses encryption for password storage, provides various features for password management, and includes a logger for tracking activities.

## Features

🔐 Add new passwords securely.

📋 List stored passwords in encrypted form.

✏️ Edit existing passwords.

❌ Remove passwords from the manager.

👁️ View passwords in decrypted form.

🔑 Generating a secure password for user .

📋 Automatically copy passwords to the clipboard for easy use.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. **Clone this repository** to your local machine:

   ```bash
   git clone https://github.com/ishansingh1010/Password-Manager
   ```

2. **Navigate** to the project directory:

   ```bash
   cd PasswordManager
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Configuration

1. **Configure your database settings** by modifying the `.env` file. Provide the necessary connection details for your chosen database system (e.g., MongoDB, MySQL).

2. Set up **environment variables** for any secret keys, API keys, or database connection strings as needed.

## Running the Application

To run the password manager application, execute the following command:

```bash
npm start
```

## Logging

This application uses the Winston logger for tracking activities. You can find log files in the `logs/` directory.

📂 **Log Directory Structure:**

- `logs/`
  - `error.log` - Records error logs.
  - `info.log` - Records general information logs.
  - `debug.log` - Records detailed debugging logs.

Feel free to contribute to this project and make it even better! 🚀🔒
