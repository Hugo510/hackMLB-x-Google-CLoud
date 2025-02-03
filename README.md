# Google Cloud x MLB(TM) Hackathon – Building with Gemini Models

## Description

hackMLB-x-Google-Cloud is an application designed to [describe the purpose of the project].

## Installation

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Configure the environment variables according to the `.env.example` file.
4. Run the application with `npm start`.

## Usage

Provide examples of how to use the application:

```bash
npm run dev
```

## Deployment with Docker

Follow the steps below to build and run the application using Docker:

1. **Build the Docker Image**:

   ```bash
   docker build -t hackmlb-backend:latest .
   ```

2. **Set Up Environment Variables and Mount the Credentials File**:

   You can provide environment variables in two ways:

   ### Option 1: Pass Variables Individually

   **For Bash/Mac/Linux**:

   ```bash
   docker run -d \
     -p 8080:8080 \
     --name hackmlb-backend \
     -e JWT_SECRET=your_jwt_secret \
     -e GCLOUD_PROJECT_ID=your_project_id \
     -e GCLOUD_KEYFILE_PATH=/app/secrets/hackathonmlb-keyfile.json \
     -e SPANNER_INSTANCE_ID=your_instance_id \
     -e SPANNER_DATABASE_ID=your_database_id \
     -e REDIS_HOST=your_redis_host \
     -e REDIS_PORT=your_redis_port \
     -e REDIS_PASSWORD=your_redis_password \
     -e REDIS_DEFAULT_EXPIRATION=your_expiration \
     -e PORT=8080 \
     -e NODE_ENV=production \
     -v /path/to/secure/hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json \
     hackmlb-backend:latest
   ```

   **For PowerShell**:

   ```powershell
   docker run -d `
     -p 8080:8080 `
     --name hackmlb-backend `
     -e JWT_SECRET=your_jwt_secret `
     -e GCLOUD_PROJECT_ID=your_project_id `
     -e GCLOUD_KEYFILE_PATH=/app/secrets/hackathonmlb-keyfile.json `
     -e SPANNER_INSTANCE_ID=your_instance_id `
     -e SPANNER_DATABASE_ID=your_database_id `
     -e REDIS_HOST=your_redis_host `
     -e REDIS_PORT=your_redis_port `
     -e REDIS_PASSWORD=your_redis_password `
     -e REDIS_DEFAULT_EXPIRATION=your_expiration `
     -e PORT=8080 `
     -e NODE_ENV=production `
     -v C:\path\to\secure\hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json `
     hackmlb-backend:latest
   ```

   ### Option 2: Use an Environment File

   1. Create a file called `.env` in your system with the following content:

      ```plaintext
      JWT_SECRET=your_jwt_secret
      GCLOUD_PROJECT_ID=your_project_id
      GCLOUD_KEYFILE_PATH=/app/secrets/hackathonmlb-keyfile.json
      SPANNER_INSTANCE_ID=your_instance_id
      SPANNER_DATABASE_ID=your_database_id
      REDIS_HOST=your_redis_host
      REDIS_PORT=your_redis_port
      REDIS_PASSWORD=your_redis_password
      REDIS_DEFAULT_EXPIRATION=your_expiration
      PORT=8080
      NODE_ENV=production
      ```

   2. Run the container using the environment file and mount the credentials file:

      **For Bash/Mac/Linux**:

      ```bash
      docker run -d \
        -p 8080:8080 \
        --name hackmlb-backend \
        --env-file .env \
        -v /path/to/secure/hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json \
        hackmlb-backend:latest
      ```

      **For PowerShell**:

      ```powershell
      docker run -d `
        -p 8080:8080 `
        --name hackmlb-backend `
        --env-file .env `
        -v C:\path\to\secure\hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json `
        hackmlb-backend:latest
      ```

## Environment Variables for Pub/Sub

These variables are configured in the environment and used to integrate Google Cloud Pub/Sub:

- **PUBSUB_TOPIC_NAME**: Pub/Sub topic name.
- **PUBSUB_SUBSCRIPTION_NAME**: Name of the associated subscription.
- **ENABLE_PUBSUB_PROCESSOR**: Enables or disables the message processor.

Make sure to enable the Pub/Sub API in Google Cloud and securely mount the appropriate credentials in the Docker container so the application can use these services.

3. **Run the Container**:

   Use one of the above options to run the container with the configured environment variables and the securely mounted credentials file.

4. **Verify Execution**:

   Open your browser and navigate to `http://localhost:8080` to ensure the application is running correctly.

## Contributions

Contributions are welcome. Please open an issue or submit a pull request.
