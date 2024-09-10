
## Project Description

### Objective
This project will be about learning NextJS, React, Timescript, MongoDB and other technologies while completing a full-stack web page. <br>

This Readme file consists of all the information, including wiki information and many detailed implementation steps and challenges. <br>

### Result
  The project consists of all the features as requested. There is only pino or pino-pretty logger is missing. The reason is there became a webpack error when pino logger is used. Therefore, pino logger will be added as a future work. 
  The project consist of:
    - TH Deggendorf corporate identity
    - Responsive design and responsive navbar
    - Guest / User / Admin functions as requested. 
    - User : events page access
    - Admin : change & delete content at news[id[ page
    - Content for EN and DE
    - React components for front end
    - NextJS App Router for backend
    - console.log information for terminal
  
  Pages:
    - (Events)
    - Home
    - News
    - Error
    - Profile
    - Placeholder Pages

## Prerequisites

Node version: 20.10.0
"dependencies": {<br/>
  "next": "14.2.3",<br/>
  "react": "^18",<br/>
  "react-dom": "^18"<br/>
  },  <br/>
"devDependencies": { <br/>
  "tailwindcss": "^3.4.3",<br/>
  "typescript": "^5"<br/>
},

## Packages & Installation

npm is used as package manages. Except pino-logger or pino-pretty, all the required frameworks and, dependencies , libraries (NextJS 14 (backend and front-end), Typescript, React (front-end), Tailwind, MongoDB Atlas & Compass, mongoose) are used as requested. All versions are up to date as of 07.2024. next-int used for internalisatoin. heroicons and react-icons are downloaded. In addition Orator style is added to public/fonts folder as it could not be found on the web. bcryptjs downloaded and used to make the app more secure. TOKEN_SECRET is used to tokenise user information and transfer username or isAdmin values securely. Cookies are used to store and transfer the tokenised information as "token". In addition, middleware is used for loaclisation and user area separation. Middleware and is used to prevent a non user to see Profile Page. Middleware is leveraged by user cookies to prevent a user to see the login or register page. Images are stored in local storage in public folder. <br>

tailwind.config.ts is used for describing styles. globals.css is used to apply them globally. <br>

i18n.ts together with [locale] is used to apply internalisation properly in root folder. The authentication and internalisation are supported via middleware. <br>
Models are defined under models folder. <br>
helpers folder consists of helper functions for client side rendering. Generally, they prevent the client side file to use server side operations.<br>
dbConfig folder is used for building connection with database via mongoose.<br>
Components for client side rendering are sorted components folder.<br>
api folder consists of the server side connections and data management.<br>
(auth) folder resambles for authentication implementations like login, register. The profile page can be found under (...)(with-auth) folder. This folder aims to access to the same level as root level to increase user experience slightly for the future implementations. There locates events and profile pages to limit the access to these pages. <br>
There are also error, loading and not found pages at the root level for such incidences. 
