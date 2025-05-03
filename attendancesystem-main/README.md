# <center>attendancesystem</center>
There are three processes that need to run in order to use the application: the database, the php server, and the React frontend. The instructions for starting each of them are described below in order.
## Database (MYSQL Database using XAMPP)
You will need to use a Database server, such as XAMPP or MYSQL Workbench, in order to run the server.
## PHP Server
You can run the server in the terminal using the following command:

php -S localhost:port -t phpserver/ (php server file must be named index.php for this to work)

Make sure that you navigate to the phpserver folder first before running it.

## React application
To run this, navigate to the attendancesystem folder and simply run the following command:

npm start

You may need to run npm i first in order to get the application running without errors.