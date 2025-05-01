# <center>attendancesystem</center>
There are three processes that need to run in order to use the application: the database, the php server, and the React frontend. The instructions for starting each of them are described below in order.
## Database (MYSQL Database)
The MYSQL database is contained in a Docker Image. In order to run the image, you will need to have Docker installed on your machine. Once that is done, you will need to open a terminal window and navigate to the dbserver folder. When within it, you must execute the following command to run the image:

docker-compose up

Once that is done, the database should be running and should be accessible to the server.
## PHP Server
You can run the server in the terminal using the following command:

php -S localhost:port -t phpserver/ (php server file must be named index.php for this to work)

Make sure that you navigate to the phpserver folder first before running it.

## React application
To run this, navigate to the attendancesystem folder and simply run the following command:

npm start

You may need to run npm i first in order to get the application running without errors.