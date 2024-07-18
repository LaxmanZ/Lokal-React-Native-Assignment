# Lokal React Native Assignment

This project is a React Native application that presents users with a job listing interface. The application features bottom navigation with "Jobs" and "Bookmarks" sections, infinite scroll for job listings, detailed job views, and the ability to bookmark jobs for offline viewing.

## Features

1. **Bottom Navigation**
    - The app opens with a bottom navigation UI with “Jobs” and “Bookmarks” as sections.

2. **Jobs Screen**
    - Fetches data from the API in an infinite scroll manner.
    - Displays title, location, salary, and phone data in each job card.
    - Appropriate states for loading, error, and empty states are maintained.

3. **Job Details Screen**
    - Clicking on a job card shows more details about the job on another screen.

4. **Bookmarking Jobs**
    - Users can bookmark a job, and the bookmarked jobs appear in the “Bookmarks” tab.
    - Bookmarked jobs are stored using AsyncStorage for offline viewing.

## Technologies Used

- **React Native**: For building the mobile application.
- **React Navigation**: For handling navigation within the app.
- **Axios**: For making API calls.
- **AsyncStorage**: For offline storage of bookmarked jobs.
- **react-native-vector-icons**: For using icons in the application.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- React Native CLI

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/LaxmanZ/Lokal-React-Native-Assignment.git
    cd Lokal-React-Native-Assignment
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the Metro bundler:
    ```bash
    npm start
    # or
    yarn start
    ```

4. Run the application on your device/emulator:
    ```bash
    npx react-native run android
    # or
    yarn android
    ```

### API

- The Jobs screen fetches data from the following API:
    ```
    GET https://testapi.getlokalapp.com/common/jobs?page=1
    ```

### AsyncStorage

- AsyncStorage is used to store bookmarked jobs for offline viewing. Functions for storing, retrieving, and removing bookmarks are defined.`.

### Usage

1. **Jobs Screen**: 
    - On opening the app, users are presented with the Jobs screen.
    - Infinite scroll is implemented to fetch and display job data.
    - Each job card shows the job title, location, salary, and phone data.
    - Users can click on a job card to view more details.

2. **Job Details Screen**: 
    - Displays detailed information about the selected job.

3. **Bookmarking Jobs**: 
    - Users can bookmark jobs from the job details screen.
    - Bookmarked jobs appear in the Bookmarks tab.
    - Bookmarked jobs are stored in AsyncStorage for offline access.

4. **Bookmarks Screen**: 
    - Displays a list of all bookmarked jobs.
    - Users can view job details from the bookmarks list.

## Video
I have recorded a video from my laptop demonstrating the features and functionality of the application. You can watch the video [here](https://drive.google.com/file/d/11AyIhHPvPwuoQjriF7_pd-8U3HMJULsH/view?usp=sharing))


## Conclusion

This project demonstrates a React Native application with features such as infinite scroll, state management, and offline storage using AsyncStorage. The application is easy to navigate, user-friendly, and ensures a smooth experience for users looking for job listings and bookmarking them for future reference.

