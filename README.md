# GroupTogether - IT5007 Final Project
github link: https://github.com/tyz98/grouptogether_IT5007proj.git

## Run in development mode

### STEP1: Specify your google api 
   
   1. Apply your oAuth2.0 Client ID [here](https://console.cloud.google.com/apis/credentials/oauthclient). 
   
      Note that you should set **Authorized JavaScript Source** to *http://localhost:3000* and set **Authorized redirect URI** to *http://localhost:3000/api/auth/callback/google*

   2. Create a file named **.env.local** (which will be ignored by Git) in this repo and add the contents below:
        ```
        GOOGLE_ID=YOUR_GOOGLE_ID(the client id you just applied)
        GOOGLE_SECRET=YOUR_GOOGLE_SECRET(the secret you just applied)

        DEV_API_URL=http://localhost:3000

        MONGODB_URI=YOUR_MONGODB_URI
        MONGODB_DB=YOUR_MONGODB_DATABASE_NAME
        ```

      or use the following command first and then change GOOGLE_ID and GOOGLE_SECRET, MONGODB_URI, MONGODB_DB in **.env.local** to yours.

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

## Run on public url (production mode)
### STEP1: Specify your google api 

   1. Apply your oAuth2.0 Client ID [here](https://console.cloud.google.com/apis/credentials/oauthclient). 
   
      Note that you should set **Authorized JavaScript Source** to *http://[YOUR_HOST]:[PORT]* and set **Authorized redirect URI** to *http://[YOUR_HOST]:[PORT]/api/auth/callback/google*

   2. Generate a secret string here: https://generate-secret.vercel.app/32

   3. Create a file named **.env.local** (which will be ignored by Git) in this repo and add the contents below:
        ```
        GOOGLE_ID=YOUR_GOOGLE_ID(the client id you just applied)
        GOOGLE_SECRET=YOUR_GOOGLE_SECRET(the secret you just applied)

        NEXT_PUBLIC_SECRET=[The secret string you generated last step]
        
        NEXTAUTH_URL=http://[YOUR_HOST]:[PORT]

        PROD_API_URL=http://[YOUR_HOST]:[PORT]

        MONGODB_URI=YOUR_MONGODB_URI
        MONGODB_DB=YOUR_MONGODB_DATABASE_NAME
        ```

      or use the following command first and then change GOOGLE_ID, GOOGLE_SECRET, NEXT_PUBLIC_SECRET, NEXTAUTH_URL, PROD_API_URL, MONGODB_URI, MONGODB_DB in **.env.local** to yours.

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

### STEP4: Start the application in prodection mode
   ```
   npm run build
   npm start
   ```