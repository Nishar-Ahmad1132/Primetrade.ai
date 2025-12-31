export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Backend Assignment API",
    description: "Auth & Task Management APIs",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    "/api/v1/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User registered" },
          400: { description: "User already exists" },
        },
      },
    },

    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Invalid credentials" },
        },
      },
    },

    "/api/v1/tasks": {
      post: {
        tags: ["Tasks"],
        summary: "Create a task",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Task created" },
          401: { description: "Unauthorized" },
        },
      },

      get: {
        tags: ["Tasks"],
        summary: "Get all tasks",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "Tasks fetched" },
        },
      },
    },

    "/api/v1/tasks/{id}": {
      delete: {
        tags: ["Tasks"],
        summary: "Delete task",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Task deleted" },
          403: { description: "Forbidden" },
        },
      },
    },
  },
};
