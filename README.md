# About Sam-Mart
![image](https://user-images.githubusercontent.com/43709736/229159361-776029a1-ed99-4c5d-b452-437746076d2f.png)
- Sam-Mart is an online e-commerce marketplace for your average day that only focuses on prehistoric products and animals that you can have as a pet. My platform offers a variety of different types of prehistoric animals or even fossils to have as a collection. In this website, you can have the ability to sign up, log in or leave a review on a dinosaur you like. Additionally, users can add there pet into the their shopping cart and checkout to buy it.

To check out the live version of this website, simple follow this link: https://sammart.onrender.com. Thank you for considering Sam-Mart for your pet needs!

# Technologies Used:
      - Javascript
      - Python
      - React
      - Redux
      - Flask
      - NodeJS
      - CSS
      - Database: PostgreSQL
      - Hosting: Render

# Pages
## Home Page
- Access the login and sign up modal from the top right corner.
![image](https://user-images.githubusercontent.com/43709736/229164360-02acace8-4fbb-4128-8bfd-a01a968cad47.png)




## Sign up Modal
- You can fill in the required information such as email, username and password to sign up.
![image](https://user-images.githubusercontent.com/43709736/229159527-b19ab74c-3862-4077-96fb-0116196636cc.png)

## Login Modal
- Log in as an existing user or as demo user
![image](https://user-images.githubusercontent.com/43709736/229164242-749d12aa-4472-43b1-b79b-11749bfe716b.png)

## Read details of prehistoric products / Animals
![image](https://user-images.githubusercontent.com/43709736/229164579-f06fd15b-71ac-4457-a11d-62466f409aa2.png)

## Post/Edit/Delete a review
![image](https://user-images.githubusercontent.com/43709736/229164649-264fbbbc-5d75-4aa0-b6be-cb8f35f7d07e.png)

## Read/Edit/Delete Shopping Cart
(add picture here)

## Extra page (404 error page):
![image](https://user-images.githubusercontent.com/43709736/229164782-f1375039-7e6e-4bda-9c18-8238954acf01.png)


- Bonus features (coming soon)

# Flask React Project Setup

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/# SamMart
