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

.env file:<br>
MONGO_URI=mongodb+srv://atamerkara:mit-ss24@cluster0.or1s6.mongodb.net/<dbname>
TOKEN_SECRET=mit_ss24
DOMAIN=http://localhost:3000
NODE_OPTIONS=--max_old_space_size=4096

Because of the webpack error for events[id] page internalisation or middleware configuration, the app cannot be built. Still, It is **working** very well with **npm run dev**. If does not work it is suggested that run "npm run dev" via package.json file debug section.

### ** Bugs & Errors ** <br>

<br>
**Events link on NavBar** does not directly appear when logged in. The reason is it is at the header section and it should be receive the userActive informaiton form cookiess. It would take additional time. It would be corrected in the future updates.<br>
Again for the **events/[id] sub pages**, there is an error with loading the content properly due to internalisation. It is possible there is a content or id missmatch
 between the route.js and mongodb events database colleciton. findById or findOne funcitons are used with both values of id from page, and ObjectId from the specific id of the content. There is a misplacement or error due to the custom hard-coded content in the mongodb integret/events databse collection. And, when the _id becomess undefined when tried to fetched. **Still** the News page is almost identical to Events page and can be considered as a simialra implementation.<br>
**Image error**: There is a recent error appeared after a webpack error in **build**. Therefore, next.config.js is tried to be configured. However, the most possible reason is middleware configuration. Or, in short, images are stored locally so there is (en|de) mismatch.<br>

## Usage

Because of the webpack error for events[id] page internalisation or middleware configuration, the app cannot be built. Still, It is **working** very well with **npm run dev**. If does not work it is suggested that run "npm run dev" via package.json file debug section.<br>
The application design is responsive. All the content can shrink or widen to fit to the window. The Navbar itself is also responsive. When a user is logged in, there appears Events link at navigation menu. Also all the pages are responding to the selected language via [locale]. <br> When the page shrinks to mobile window size, there appears a sliding navigation menu. The menu becomes visible when clicked to Open Menu icon. The new sliding page will sort all the navigation. The page requires a refresh when logged in to see events link to appear at the list. <br>

 There is a responsive language menu that indicates English, German, and French languages. French can be added in the future. The menu is triggered via the world shaped icon at the top right corner of the header. Following that, the user icon directs to login page if there is no authentication yet. There is also a link to register at the bottom of the login page. Both register and login pages have sentstive submit buttons for not filled text areas. The buttons are activated only if all the spaces are filled. If there is a user logged in, this user icon lets directs the authenticated user to Profile Page. There is the Get The Username button to see the user name and a button for logout. When logged out, the userActive cookies and token cookies generated by user name and isAdmin are deleted just after a refresh.  <br>
 There are 2 users are currently defined in the database:<br>
 **admin@mongo.db (password: admin)**<br> 
( ! **Important** admin is different from the user with the informtaion of **isAdmin** = **true**, so can **change** and **delete** news content in the specific news id. )<br>
 **user@mongo.db (password: user)**<br>


<br>

**Navbar Navigation: (Events) Home News Error Legal-Service Page-Not-Found Emergency Karte**<br>
Home Page, it is designed to look similar to TH Deggendorf homepage. Logo at the navbar is directing to Home Page. The buttons below the page will be styled in the future.  There is an image and logo, however a bug is preventing them to be visible.<br>
Therea are events and news pages sorted at the navbar. Each page have different content, can be clicked and read through nested pages. <br>
Events page is available for only users. User actions are defined above.<br>
Nested pages are the pages assigned for each content with specific id at the database. Content of news page can be changed or deleted by the Admin, which is indicated secretly in token at cookies. The specific news content can be deleted or updated via the update and delete links at the right corner of the news. <br>
Error page is representing the error page when a possible error occurs. There are also loading and not-found pages are defined at the root. <br>
The rest of the links are just for placeholder. Currently, they can be used as Not Found page navigation. <br>
