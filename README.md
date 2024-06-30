# Repair-Reports

Database for circuit board repairs that can be searched so problems that have already been resolved are not reworked

will primarily be used on mobile to take advantage of on board camera to upload images, and such mobile design will be focused on first followed by a desktop design

<div>
  <img src='https://github.com/jesusdoza/diagrams/blob/main/repair-reports/repair%20reports%20splash.png?raw=true' >
</div>
  <details>
  <summary><h2>Backend overview</h2> </summary>
    <img src="https://raw.githubusercontent.com/jesusdoza/diagrams/932dd42c34978e4b55f0334809721430822bcae2/repair-reports/repair-reports-diagram.drawio.svg">
   
  </details>

DEV branch hosted on [render.com](https://repair-reports-dev.onrender.com/)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, nodeJs, express, MongoDb, cloudinary

# Dependencies

```
"dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.0",
    "cloudinary": "^1.30.0",
    "connect-mongo": "^4.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-fileupload": "^1.4.0",
    "express-flash": "^0.0.2",
    "express-session": "^1.17.3",
    "mongodb": "^4.7.0",
    "mongoose": "^6.5.3",
    "morgan": "^1.10.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "validator": "^13.7.0"}
```

## Lessons Learned:

uploading can be delegated to client side with only having signature from server

## Things needed to run

- cloudinary account
- mongodb account

## /config/.env file

#### cloudinary settings

- cloud_name = //provided by cloudinary
- cloud_key = //provided by cloudinary
- cloud_secret = //provided by cloudinary
- cloud_folder = //for organizing your cloudinary image into a folder

#### mongoDb connection string

- connect_string = //provided by mongo

#### //port to use locally

- PORT =

#### node enviroment for local run

- NODE_ENV = development

# inside the file /config/.env should look like this

```
 cloud_name = afds355ha
 cloud_key = 125554658
 cloud_secret = ckdskfalkfjai123
 cloud_folder = IMAGES
 connect_string = mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin
 PORT = 8000
 NODE_ENV = development
 client_origin="http://localhost:5173"
```

### Then clone repository from terminal node and git required

```
git clone https://github.com/jesusdoza/repair-reports.git
```

### move into project folder

```
 cd repair-reports/
```

### Open terminal prompt and run following commands

```
    npm install
    npm run dev
```

### for hosted following scripts must run

- npm run install
- npm run build
- npm run start
