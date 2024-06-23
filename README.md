
# VotingApp

## Overview

VotingApp is a decentralized application (dApp) built with Solidity, React, and Hardhat, leveraging MetaMask as the wallet provider. This application enables the creation and management of voting events, ensuring secure and transparent voting processes. It allows the admin to create multiple votes, each with its own set of candidates and specific timing. Registered users can participate in these votes after their registration is validated by the admin. Both the admin and the voters can view the results of each vote upon the conclusion of the voting period.

## Features

- **Admin Capabilities:**
  - Create multiple voting events.
  - Define specific candidates for each voting event.
  - Set a specific timing for each vote, after which the voting period ends.
  - Validate user registrations.
  - View the results of the votes after the voting period ends.

- **User Capabilities:**
  - Register to participate in the voting events.
  - Await validation from the admin to participate in voting.
  - Vote for preferred candidates once registration is validated.
  - View the results of the votes after the voting period ends.

## Technology Stack

- **Solidity:** Used for writing smart contracts that define the voting logic and processes.

![solidity](/screenshots/solidity.png)

- **React:** Frontend framework used to build the user interface for interacting with the dApp.

![react](/screenshots/react.png)

- **Hardhat:** Ethereum development environment for compiling, testing, and deploying smart contracts.

![hardhat](/screenshots/hardhat.png)

- **MetaMask:** Browser extension that serves as the wallet provider, enabling users to manage their Ethereum accounts and interact with the dApp.

![metamask](/screenshots/metamask.png)

-**IPFS (Pinata):** Used for decentralized and secure file storage.

![metamask](/screenshots/ipfs.png)

## Architecture of the APP
![arch](/screenshots/arch.png)

## Workflow

1. **Admin Creates Voting Events:**
   - The admin logs in and creates new voting events.
   - Defines the candidates for each voting event and sets the timing for the voting periods.

2. **User Registration:**
   - Users register to participate in the voting events.
   - Registration requests are sent to the admin for validation.

3. **Admin Validates Registration:**
   - The admin reviews and validates the registration requests.
   - Once validated, users are eligible to participate in the voting.

4. **Voting Process:**
   - Users vote for their preferred candidates within the defined voting periods.
   - Votes are securely recorded on the blockchain.

5. **Result Viewing:**
   - After the voting period ends, both the admin and the voters can view the results of the voting events.



----
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
