# GroupTogether - IT5007 Final Project
github link: https://github.com/tyz98/grouptogether_IT5007proj.git

## Run in development mode

### STEP1: Specify your google api 
   
   1. Apply your oAuth2.0 Client ID [here](https://console.cloud.google.com/apis/credentials/oauthclient). 
   
      Note that you should set **Authorized JavaScript Source** to *http://localhost:3000* and set **Authorized redirect URI** to *http://localhost:3000/api/auth/callback/google*

   3. Create a file named **.env.local** (which will be ignored by Git) in this repo and add the contents below:
        ```
        GOOGLE_ID=YOUR_GOOGLE_ID(the client id you just applied)
        GOOGLE_SECRET=YOUR_GOOGLE_SECRET(the secret you just applied)

        DEV_API_URL=http://localhost:3000
        ```

      or use the following command first and then change GOOGLE_ID and GOOGLE_SECRET in **.env.local** to yours.

      ```
      cp .env.local.example .env.local
      ```
   
### STEP2: Change node version to **14.15.0** which is needed by next/auth
   ```
   nvm install 14.15.0
   nvm use 14.15.0
   ```

### STEP3: Install the dependencies
   ```
   npm install
   ```

### STEP4: Start the application
   ```
   npm run dev
   ```
