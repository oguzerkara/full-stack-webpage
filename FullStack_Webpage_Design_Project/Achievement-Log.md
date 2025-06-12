
22.04 - MyGit project is created. VS Code and environment are raedy to use.<br/>
26.04 - Project initiated with NextJS and Tailwind. Versions:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;          "dependencies": {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            "next": "14.2.3",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            "react": "^18",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            "react-dom": "^18"<br/>
  },  <br/>
&nbsp;&nbsp;&nbsp;&nbsp;          "devDependencies": {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            "tailwindcss": "^3.4.3",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;            "typescript": "^5"<br/>
          }<br/>
29.04 - MongoDB is connected, utils folder is added to making database usage much easier and safer. <br/>
        3 different personas with use cases are added<br/>
03.05 - Use case diagram is ready ([diagrams.net](https://app.diagrams.net/)). Lo-Fi design for the welcome page is ready ([balsamiq.cloud](https://balsamiq.cloud/skdsdr7/pdw6xmb/r1D80)).<br>
07.05 - Navbar component is ready. Page-not-found feature is ready. Downloaded extentions:<br>
JavaScript and TypeScript Nightly<br>
VS Code ES7+ React/Redux/React-Native/JS snippets<br>
Tailwind CSS IntelliSense<br>
 <br>
10.05 - favicon.ico altered to integreat's favicon.ico<br>
13.05 - **mistake**: css is used instead of tailwind. **Fixin Process**<br>
20.05 - Mistake recovered, Props are used in NavLinks to refain from too much data package to sent to client side. Header part is completed. There is an option menu pops up when header shrinks to mobile size now. Bars3Icon and XMarkIcon from heroicons are downloaded and used. Login, Map and cities part will be completed in back end part. page.tsx is started to build.<br>
22.05 - General error handling page is ready. Language bar is ready. Language, search, and location buttons are turned to responding links from heroicons. <br>
02.06 - Register and Login pages are completed. The password is secured by using bcryptjs and JWT. Now, the password is sent to cookies and encrypted and protected with SECRET_TOKEN. Logout and Profile page are added. <br> middleware.ts is added to set the secure routing between the pages. /login, /profile pages are restricted. For example, a logged in user cannot enter register and login pages, and a non-user cannot access profile page.<br>
getDataFromToken method is created in helpers folder. This getDataFromToken is used to ensure the security of the SECRET_TOKEN (located in .env.local) while extracting the required information of the User. A profile page is created and this extracting _id from the user is applied on Profile page "Get User Data" button.<br>
14.06 - Some details are re-shaped acording to TH Deggendorf corporate identity. The City is chosen as Landeshauptstadt München, so home page redesigned. next-intl is downloaded to make internalisation. Profile/Login pages can be visited through the icon on header. <br>
15.06 - The app restructured over [locale] to use i18n. And, middleware is revised to access language specific routes.  Header and mini menu has the navigation menu in also German now.<br>
22.06 - A long json dataset as a test retrieved to mongodatabase via compass. and authentication and events are merged to limit the access of the events for users. Events link appears on navbar thanks ot api/navbar and small modifications on Navbar.tsx. Now the project is fully developed. <br>
TOKENS upto now: userActive is a cookie handle to check the user is active by getting info from navbar api, and token is basically tokenisation of user id username and email with pre-defined TOKEN_SECRET for security. <br>
26.06 - News page is transformed to nested pages. It takes a custom information to show it GET data from a database and combines it with internalisation locale. As a result, it can prompt the results. The firts page is set gibberish intentionally. <br> 
02.07 - All the content are now stored in a single databse called "integreat". News page, and sub pages are properly working. Uses only GET. Events page is also working. Wrappers are used. But, Images are gone due to the webpack and next.config.js issues. There might be incompatibility between node and nextJS. Node version is 20.10. 
<br> react-icons and heroicons are used in the project.<br>
03.07 - Adding a DELETE and PUT for findByIdAndUpdate in News [newsId] route.ts are used. Completing the news/[newsId] and user register let all CRUD operations become available. <br> 
04.07 - README - Usage, Packages and installation Bugs & Errors and Future works are added. All database collections are inside integreat now. All pages handle internalisation.<br>
05.07 - tokenised isAdmin as well as username information from user model is received by getIsAdminFromToken, deconesied adn used int the isAdmin server component. This tokenisation *securely* let the __news[id]__ page to allow to *make* *changes* and *delete* when there is an *admin* instead of user. The __Profile__ page is also has new button to display *isAdmin*. 
<br>
