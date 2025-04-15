# NoteApplication
An Application that helps in taking personal notes

Database Setup
-Firstly, in the database folder there consist of a backup of a db restore it in a Microsoft SQL server

Backend Setup
-In the backend portion of the code consist of API written in dot net language so Visual Studio is recommended to run this.
-Change the appsettings.json from the project according to where the database has been hosted

Frontend Setup
- Frontend is in react so firstly npm install is to be run after which setup the .env file with the IP and port of Backend application.
- The project can then be run with npm run dev

Project:
-The project consist of a CRUD operation regarding the Note taking
-Initially one has to sign in and create an account
-After which one can login using email and password
-IN the dashboard one can perform the CRUD operation to their notes.

Engineering Decisions
-.NET over Node: Chosen to demonstrate familiarity with scalable backend technologies and enterprise APIs.
-SQL Server over MySQL: Integration ease with Entity Framework and structured normalization.
-Tailwind CSS: Used for quick, responsive UI development.
-Vite + React: Chosen for optimal performance and developer experience.

Optional/Preferred Features (Partially Included)
-Reusable components (buttons, table, modal, alerts)
-Error messages & validations (frontend + backend)
- Logging (partially done in database side)
-Swagger API documentation 


Assumptions Made
-User emails are unique for authentication
-Notes are only visible to the authenticated user who created them
-Categories are comma-separated strings in notes

