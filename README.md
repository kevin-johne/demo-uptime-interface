# Assessment Exercise: API-based React Frontend for Uptime.com

Objective: Using Uptime.com’s public API, create a minimal frontend application using React and TypeScript. To complete this task, please create a free trial account at Uptime.com.

Requirements:

- Login Functionality: Implement a user login feature. Use the following API call for logging in with a username and password: Uptime.com API Auth Login. This endpoint takes an email and login, returning an auth token.

- Display a List of Checks: The application should display a list of checks associated with the user account.

- Edit Check Interface: Implement a simple interface or form that allows users to edit check details (e.g., check name). The functionality doesn’t need to cover all real features but should include basic edit capabilities.

- CORS Handling: Address any CORS issues that arise as part of the solution.

- Component Framework and Styling: Use a component framework of your choice as a base and style the application to resemble the look and feel of Uptime.com.

- Build Pipeline: Use any bundler and build pipeline you prefer, and be prepared to discuss your technology choices.

## Getting Started

```sh
docker compose up
```

When this is finished, [localhost:3001](http://localhost:3001) should be available for testing. You should be greeted with a login page similar to Uptime.com.

### Troubleshooting

In the case of an error and the docker setup is not working for you. Please try to get it running locally.
You are required to have node 18.x or 20.x installed.

```sh
cd app
npm install
npm run dev
```

## Throw away

Thank you for testing my application, and I hope you enjoyed it.
Now it is time to throw away the docker container.

```sh
docker compose down
docker rmi demo-uptime-interface-app
```
