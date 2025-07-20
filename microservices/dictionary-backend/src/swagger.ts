export const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Dictionary API",
    version: "1.0.0",
    description: "CRUD API for a dictionary app",
  },
  servers: [{ url: "http://localhost:3000/api" }], // so /words maps correctly
  paths: {
    "/words": {
      get: {
        summary: "Get all words",
        responses: {
          200: {
            description: "List of words",
            content: {
              "application/json": {
                example: [
                  { word: "apple", meanings: ["a fruit", "a tech company"] },
                  { word: "java", meanings: ["a programming language", "an island in Indonesia"] }
                ],
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new word",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  word: { type: "string", example: "apple" },
                  meanings: {
                    type: "array",
                    items: { type: "string" },
                    example: ["a fruit", "a tech company"],
                  },
                },
                required: ["word", "meanings"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Word created",
            content: {
              "application/json": {
                example: { message: "Word created" },
              },
            },
          },
          400: {
            description: "Invalid input / Word already exists",
          },
        },
      },
    },
    "/words/{word}": {
      get: {
        summary: "Get a specific word",
        parameters: [
          {
            name: "word",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "apple",
          },
        ],
        responses: {
          200: {
            description: "Word found",
            content: {
              "application/json": {
                example: {
                  word: "apple",
                  meanings: ["a fruit", "a tech company"],
                },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
      put: {
        summary: "Update meanings of a word",
        parameters: [
          {
            name: "word",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "apple",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  meanings: {
                    type: "array",
                    items: { type: "string" },
                    example: ["a delicious fruit", "Apple Inc."],
                  },
                },
                required: ["meanings"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Word updated",
            content: {
              "application/json": {
                example: {
                  message: "Word updated",
                  word: {
                    word: "apple",
                    meanings: ["a delicious fruit", "Apple Inc."],
                  },
                },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
      delete: {
        summary: "Delete a word",
        parameters: [
          {
            name: "word",
            in: "path",
            required: true,
            schema: { type: "string" },
            example: "apple",
          },
        ],
        responses: {
          200: {
            description: "Word deleted",
            content: {
              "application/json": {
                example: { message: "Word deleted" },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
    },
  },
};
