# Installing This Project

This guide will walk you through the steps required to install and run this project on your local machine. This project has been developed on an iMac and works for both iOS and Android.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm or Yarn package manager
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
___
## Step 1: Clone This Project

Clone this project with the following command:

```bash
git clone https://github.com/ripupo88/simple-checkin-sample.git
```

## Step 2: Install Packages

Install all packages at the same version that I used with the following command:

```bash
yarn install --frozen-lockfile
```

## Step 3: Run Any of the Simulators

You can run the app on an iOS simulator with the following command:

```bash
yarn run ios
```

Or on an Android emulator with the following command:

```bash
yarn run android
```
___
## Testing the App

To run tests for the app, use the following command:

```bash
yarn run test
```