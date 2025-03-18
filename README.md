### Required softwares to run backend server
* Install NodeJs , please download from url: `https://nodejs.org/download/release/v12.14.0/`(Download .msi file). Please use this version of node js only.
* Install Postgresql server and pgadmin:
### Database setup for first time
* Open pgadmin and create postgres user with `Password@12`
* Enter your DB credentials in a .env file(create in /server/) following the same format as .env.sample

## Database Migration.
Open terminal and open `/server/` folder.
Install dependencies using `npm install`

Open `/server/src/` folder.
Run `sequelize db:migrate` to migrate the db.

## Database Seeding.
open `/server/src` folder.
Run `sequelize db:seed:all` to seed the initial data in the db.

## Starting the backend server.
1. open `/server` folder.
2. Start the server using `npm run dev` for development mode 
3. This will run the backend server on port 5000.


