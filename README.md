## Website name: Blog Zone
## live link: https://blog-zone-8a6a4.web.app
### Features:
*   This is a blog website you can post blogs
*   This website have firebase login and registration auth
*   This website have a featured blog page where you can see most featured blogs
*   You can add blogs to wishlist
*   You can remove blogs form wishlist
*   This website contain privete route and secure api

### Technologies used:
React, Tailwind CSS, Firebase, Express JS, MongoDB

## How to Start the project:

### Installation
1. Clone the repository
2. Install dependencies:
    ```sh
   npm install
    ```

### Configuration
1. Set up Firebase:
    - Create a project in [Firebase Console](https://console.firebase.google.com/) and add a web app.
    - Copy the Firebase config.

2. Create a `.env.local` file in the root directory:
    ```plaintext
    VITE_apiKey=your-api-key
    VITE_authDomain=your-auth-domain
    VITE_projectId=your-project-id
    VITE_storageBucket=your-storage-bucket
    VITE_messagingSenderId=your-messaging-sender-id
    VITE_appId=your-app-id
    ```

## Usage

1. Run the development server:
    ```sh
    npm start
    ```
2. Build for production:
    ```sh
    npm run build
    ```
