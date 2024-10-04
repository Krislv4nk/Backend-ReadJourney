

#  Backend ReadJourney


Backend ReadJourney is the server-side part of the ReadJourney web application, which allows users to read and listen to books. This server handles user authentication, favorite book management, reading page tracking, and integration with services like Google Cloud Text-to-Speech and OpenAI.



## Installation

 1. Clone the repository:
     
         git clone https://github.com/your-username/backend-readjourney.git


 2. Navigate to the project directory:
     
         cd backend-readjourney


3. Install dependencies:
    
        npm install


4. Create a .env file with the following variables:

       DB_HOST =
       PORT =
       JWT_SECRET =
       JWT_REFRESH_SECRET =

       UKR_NET_PASSWORD =
       UKR_NET_FROM =
       BASE_URL = 

       OPEN_LIBRARY_URL_POPULAR =
       OPEN_LIBRARY_URL_BOOK =
       USER_AGENT =

       OPENAI_API_KEY = 
       OPEN_API_ORGANIZATION_ID = 
       PROJECT_ID = 
       OPENAI_API_PROJECT_NAME = 



  5. Scripts

 ### Run in development mode:
 
     npm run dev


### Run in production mode:

     npm start

## Dependencies
<a href="https://www.npmjs.com/package/@google-cloud/text-to-speech">
    <img alt="@google-cloud/text-to-speech" src="https://img.shields.io/npm/v/@google-cloud/text-to-speech?color=%23ffffff&label=%40google-cloud%2Ftext-to-speech&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/@huggingface/inference">
    <img alt="@huggingface/inference" src="https://img.shields.io/npm/v/@huggingface/inference?color=%23ffffff&label=%40huggingface%2Finference&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/axios">
    <img alt="axios" src="https://img.shields.io/npm/v/axios?color=%23ffffff&label=axios&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/bcrypt">
    <img alt="bcrypt" src="https://img.shields.io/npm/v/bcrypt?color=%23ffffff&label=bcrypt&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/cors">
    <img alt="cors" src="https://img.shields.io/npm/v/cors?color=%23ffffff&label=cors&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/dotenv">
    <img alt="dotenv" src="https://img.shields.io/npm/v/dotenv?color=%23ffffff&label=dotenv&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/express">
    <img alt="express" src="https://img.shields.io/npm/v/express?color=%23ffffff&label=express&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/gravatar">
    <img alt="gravatar" src="https://img.shields.io/npm/v/gravatar?color=%23ffffff&label=gravatar&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/jimp">
    <img alt="jimp" src="https://img.shields.io/npm/v/jimp?color=%23ffffff&label=jimp&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/joi">
    <img alt="joi" src="https://img.shields.io/npm/v/joi?color=%23ffffff&label=joi&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/jsonwebtoken">
    <img alt="jsonwebtoken" src="https://img.shields.io/npm/v/jsonwebtoken?color=%23ffffff&label=jsonwebtoken&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/mongoose">
    <img alt="mongoose" src="https://img.shields.io/npm/v/mongoose?color=%23ffffff&label=mongoose&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/morgan">
    <img alt="morgan" src="https://img.shields.io/npm/v/morgan?color=%23ffffff&label=morgan&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/multer">
    <img alt="multer" src="https://img.shields.io/npm/v/multer?color=%23ffffff&label=multer&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/nanoid">
    <img alt="nanoid" src="https://img.shields.io/npm/v/nanoid?color=%23ffffff&label=nanoid&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/nodemailer">
    <img alt="nodemailer" src="https://img.shields.io/npm/v/nodemailer?color=%23ffffff&label=nodemailer&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/openai">
    <img alt="openai" src="https://img.shields.io/npm/v/openai?color=%23ffffff&label=openai&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/swagger">
    <img alt="swagger" src="https://img.shields.io/npm/v/swagger?color=%23ffffff&label=swagger&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/swagger-jsdoc">
    <img alt="swagger-jsdoc" src="https://img.shields.io/npm/v/swagger-jsdoc?color=%23ffffff&label=swagger-jsdoc&labelColor=%23ff0000&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/swagger-ui-express">
    <img alt="swagger-ui-express" src="https://img.shields.io/npm/v/swagger-ui-express?color=%23ffffff&label=swagger-ui-express&labelColor=%23ff0000&style=for-the-badge">
</a>

## Dev Dependencies
<a href="https://www.npmjs.com/package/nodemon">
    <img alt="nodemon" src="https://img.shields.io/npm/v/nodemon?color=%23ffffff&label=nodemon&labelColor=%23ff0000&style=for-the-badge">
</a>







API Documentation

The project uses Swagger to document all REST API endpoints. To view the documentation, open the following in your browser after starting the server:


http://localhost:5000/api-docs


