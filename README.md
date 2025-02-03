# Google Cloud x MLB(TM) Hackathon – Building with Gemini Models

For this project, React Native with Expo is used to build a mobile app focused on displaying MLB data, news, and games. Users can select favorite teams and manage preferences. The main file is `App.js`, entry point is `index.js`, and overall configuration is defined in `app.json`. Routing is handled in `src/controller/routes.js`.

## Main Technologies

- React Native + Expo
- Axios for HTTP requests
- React Navigation for navigation
- Context API (`AuthContext`) for session management
- Moment for date handling
- AsyncStorage for local storage

## File Structure

- `src/`: Main modules (Login, Home, Teams, Live, etc.), global components, and services
- `package.json`: Defines dependencies and scripts

## Run Scripts

- `npm run start`: Starts Expo
- `npm run android`: Starts Expo for Android
- `npm run ios`: Starts Expo for iOS
- `npm run web`: Starts Expo in a web environment

## Usage Steps

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the app: `npm run start`

## Key Features

- Authentication (sign up/sign in)
- Favorite teams selection (`SelectTeamsScreen`)
- Views for matches, news, and notifications

## Environment Variables and Credentials

Environment variables are managed in `src/services/config/env.js`. You should copy and rename the `.env.example` file to `.env`, then fill in the required credentials. Make sure to load these variables accordingly in your code.

## API Endpoints

Endpoints for authentication (login, sign up) and other actions are defined in `src/services/config/auth.js`. The app consumes these endpoints for user-related features and data fetching.

For more details, review the mentioned files and the `src/` folder.
