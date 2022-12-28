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



MAIN branch hosted on [cyclic.sh](https://repair-reports.cyclic.app/)

DEV branch hosted on [render.com](https://repair-reports-dev.onrender.com/)






## How It's Made:


**Tech used:** HTML, CSS, JavaScript, nodeJs, express, MongoDb, cloudinary




## Lessons Learned:
uploading can be delegated to client side with only having signature from server


## Things needed to run
- cloudinary account
- mongodb account


## /config/.env  file
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
