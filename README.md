

Backend ReadJourney

Version: 1.0.0

Description

Backend ReadJourney is the server-side part of the ReadJourney web application, which allows users to read and listen to books. This server handles user authentication, favorite book management, reading page tracking, and integration with services like Google Cloud Text-to-Speech and OpenAI.

Requirements

Node.js v18+

MongoDB


Installation

1. Clone the repository:

git clone https://github.com/your-username/backend-readjourney.git


2. Navigate to the project directory:

cd backend-readjourney


3. Install dependencies:

npm install


4. Create a .env file with the following variables:




Scripts

Run in development mode:

npm run dev

Run in production mode:

npm start


Dependencies

@google-cloud/text-to-speech: Used for converting text to audio.

@huggingface/inference: For integration with Hugging Face AI models.

axios: For HTTP requests.

bcrypt: For password hashing.

cors: For configuring CORS.

dotenv: For environment variables.

express: The main framework for the server.

gravatar: For user avatar handling.

jimp: For image processing.

joi: For data validation.

jsonwebtoken: For generating and validating JWT tokens.

mongoose: For MongoDB connection.

morgan: HTTP request logging.

multer: For file uploads (e.g., book covers).

nanoid: For generating unique identifiers.

nodemailer: For sending emails.

openai: For OpenAI API integration.

swagger, swagger-jsdoc, swagger-ui-express: For API documentation using Swagger.


API Documentation

The project uses Swagger to document all REST API endpoints. To view the documentation, open the following in your browser after starting the server:

https://backend-readjourney.onrender.com/api-docs/

http://localhost:5000/api-docs

License

This project is licensed under the ISC License.
