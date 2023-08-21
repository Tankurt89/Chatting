# Chatting

A mobile chatting app, created using react native, that allows users to chat with each other, send images, take pictures, and send their location.

<img src="https://github.com/Tankurt89/Chatting/blob/master/assets/Home.png" width="250" height="500" /><img src="https://github.com/Tankurt89/Chatting/blob/master/assets/Chat.png" width="250" height="500" /> <img src="https://github.com/Tankurt89/Chatting/blob/master/assets/Action.png" width="250" height="500" />

# Requirements

- Node.js
- Firebase Account
- Expo
- Mobile OS Emulator (Android Studio)

# Set Up and Installation

### Instructions up to date as of 8/21/2023, for most up to date instructions please visit the appropriate sites.

## General

1. Clone Repository
2. Navigate to project directory in the terminal.
3. Run 'npm install 16.19.0' to install the base dependencies
4. Run 'npm use 16.19.0'
5. Run 'npm i firebase'
6. Run 'npm i expo'
7. Run 'npm i whatwg-fetch@3.6.2' (current whatwg version causes issues with images being able to be sent. This version still functions as intended.)
8. Sign up for and set up Firebase (steps below)
9. Download and install Android Studio (steps below)
10. Sign up for Expo and install Expo Go on your mobile devices (steps below)
11. Back in the terminal run expo login and go through the login process.
12. In the terminal use 'npx expo start' for future uses

## Firebase setup

1. Navigate to 'https://firebase.google.com/'
2. Navigate to the console ('Go To Console' in the top right)
3. Add project
4. Once in the project use 'Build->Firesstore Database' on the left sid eof the screen under product categories
5. Create Database, Start in production mode, hit next and then enable.
6. Once in Firestore Database navigate to rules and change 'allow read, write: if false;' to 'allow read, write: if true;' and publish.
7. Navigate to 'Project Settings->General'
8. Under 'Your apps' select webapp (</>)
9. Select a nickname (you don't have to setup Firebase Hosting) and follow the prompts.
10. Copy the section of code starting with 'const firebaseConfig =' and paste it into App.js replacing what is in there already.
11. Set up Android Studio

## Android Studio

1. Navigate to 'https://developer.android.com/studio'
2. Download Android Studio Giraffe
3. Follow the installation process
4. Once you get to the main screen navigate to More Actions-->Virtual Device Manager
5. Set up and install the device you prefer to use (for this project I used Pixel 7 Pro)

## Expo

1. Navigate to 'https://expo.dev/'
1. Create your account
1. Open the device you installed with Android Studio
1. Navigate to the Google Play Store and install Expo Go and log in
1. Repeat steps for your mobile device to test there as well
