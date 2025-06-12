# mit_SS24

## Project Description

### Objective
This project will be about learning NextJS, React, Timescript, MongoDB and other technologies while completing a full-stack web page. <br>

This project is a part of the Modern Internet Technologies lecture by Prof. Dr.-Ing Udo Garmann.<br>

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


## Future work

The addition down below can be regarded as a future work.
A refresh or pushing to new page is required when there a content deleted at the news page.
Navbar can be optimised to refresh when logged in. <br>
A proper collection for events page can be chosen. Or the dataset can be optimized to use exactly same information key for each data. There can be some missing information, like phone number, in the dataset. <br>


## Implementation of the Requests

  - The project is completely written in **Typescript**. The 5% JS is for node-modules in GitLab.<br>
  - **React** components, hooks and other feautres are used for frontend. <br>
  - **NextJS** features are used for server component connections at the backend. <br>
  - For **MongoDB**, Atlas and Compass used together with mongoose, and all the content stored under "integreat" database. <br>
  - No **logger** used. <br>
  - Foldering is neat and easy to reach all the content. helpers and models are used to catch **userfriendly maintanence** at the backend. 
  - **TH Deggendorf corporate identity** is achieved by navbar color and text font configurations. Page designs, text or header placements also considered in order to be parallel with corporate identity
  - Content **language** can be selected from header/navbar world-like symbol for EN and DE. <br>
  - **Tailwind** is used to make styling. So, tailwind.config files are set accordingly. <br>
  - **Responsive design** is achieved by a hidden open-close menu when the page narrowed or opened on smartphones. <br>
  - There is also  responsive navbar to show Events page link only to authenticated users.  <br>

  - **Unregistered** area :Guest <br>
  - **Registered** area:  User / Admin functions as requested. <br>
  - User : events page access <br>
  - Admin : change & delete content at news[id[ page<br> 

  - console.log information for terminal
  
  Pages:
    - (Events)
    - Home
    - News
    - Error
    - Profile
    - Placeholder Pages
