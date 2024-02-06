see# Line | History Message API
----
 Document by @kasidatep **|** Last update: Jan 01, 2024 

## Overview

This project is designed to interact with the LINE Messaging API for LINE followers, collecting their IDs and historical messages. The configuration details, such as the LINE channel access token and cookie information, are stored in `config.ts`. The `uid.ts` file fetches follower IDs through the LINE API, storing them in `uid.json`. The `historyMessage.ts` file retrieves historical messages for each follower and logs them into a CSV file, with functions for creating a new file or appending existing data. The script introduces delays to manage API call frequency and includes logging statements for progress tracking. The overall flow involves initializing configuration, collecting follower IDs, and retrieving and logging historical messages. It is essential to handle sensitive information securely and consider potential rate-limiting issues.

## Project Structure:

### 1. config.ts:
   - Contains configuration details such as the LINE channel access token, cookie information, log filename, and channel ID.
   - Exports this configuration as an object.

### 2. uid.ts:
   - Defines functions to interact with the LINE API to obtain follower IDs.
   - `getFollowersIds(next: string | undefined)`: Makes requests to the LINE API to get follower IDs with pagination.
   - `writeUid()`: Collects all follower IDs and writes them to a JSON file named `uid.json`.

### 3. utils.ts:
   - Exports a utility function `wait(ms: number)` for introducing delays in the code.

### 4. historyMessage.ts:
   - Manages the retrieval and logging of historical messages from the LINE API.
   - `getHistoryMessage(channelId: string, userId: string)`: Makes requests to the LINE API to get historical messages.
   - `createNewFile(channelId: string, userId: string)`: Creates a new CSV file with historical messages for a given user.
   - `appendFileWithNoTitleData(channelId: string, userId: string)`: Appends the CSV file with historical messages, excluding the title information.
   - `writeHistoryMessage()`: Iterates through user IDs, calls the appropriate functions to fetch and log historical messages, and introduces delays.

## Config Setup Documentation

This documentation provides instructions on setting up and obtaining the necessary configuration for the LINE Messaging API integration. Follow the steps below to properly configure the `config` object in your project.

### 1. Channel Access Token:
   - Go to the [LINE Developer Console](https://developers.line.biz/console).
   - Log in with your LINE account.
   - Select the channel for which you want to obtain the access token.
   - Navigate to the "Channel settings" > "Channel access token" section.
   - Copy the generated access token and replace `<chanel_access_token>` with it in the `config` object.

### 2. Cookie Information:
   - Open the [LINE Chat Console](https://chat.line.biz/setting/channel) in your web browser.
   - Log in with your LINE account.
   - Access the developer tools in your browser (F12 or right-click and select "Inspect").
   - Go to the "Application" tab and find the "Cookies" section.
   - Locate and copy the value associated with your LINE channel.
   - Replace `<cookie>` in the `config` object with the copied cookie information.

### 3. Log Filename:
   - Optionally, if you want to change the default log filename, modify the `log_filename` property in the `config` object. By default, it is set to 'historyMessage.csv'.

### 4. Channel ID:
   - Go to the [LINE Chat Console](https://chat.line.biz/setting/channel).
   - Log in with your LINE account.
   - Copy the Channel ID from the URL or find it in the page source.
   - Replace `<channel_id>` in the `config` object with the copied Channel ID.

### Saving Configuration:
   - Save the updated `config.ts` file after making the changes.

Now, your `config` object is configured with the necessary information to interact with the LINE Messaging API. Ensure that sensitive information, such as access tokens and cookies, is handled securely and kept confidential.

## Execution Flow:

### 1. UID Generation:
   - Running `writeUid` generates a JSON file (`uid.json`) containing follower IDs obtained from the LINE API.

### 2. Historical Message Retrieval:
   - `writeHistoryMessage` iterates through each user ID in `uid.json`.
   - For each user, it fetches historical messages from the LINE API and appends the data to a CSV file (`historyMessage.csv`).
   - Delays are introduced every 10 iterations to avoid overwhelming the API.

## Usage:

- The project is designed to be run from a Node.js environment.
- The execution flow is primarily controlled by running the `writeUid` and `writeHistoryMessage` functions.

## Recommendations:

- Ensure that the necessary dependencies (`axios`, `fs`) are installed using npm.
- Handle sensitive information (tokens, cookies) securely.
- Consider error handling and logging improvements for better reliability.
- Regularly check for updates or changes in the LINE API to ensure compatibility.

Remember to tailor the project based on your specific requirements and consider potential improvements or modifications based on your use case.

-----

### Potential Improvements:
- Error handling could be enhanced to provide more detailed error messages and better resilience.
- Unit tests could be added to ensure the reliability of the functions.
- Security measures, especially regarding the handling of sensitive information, should be carefully reviewed and implemented.
- Code documentation could be improved for better readability and understanding.