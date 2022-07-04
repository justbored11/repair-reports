// const { resolveInclude } = require("ejs");



// TEST
let test = document.querySelector('.procedure')
let signDatat 
// TEST


document.addEventListener('DOMContentLoaded', async () => {
    console.log(`doc loaded repair form`)
/// testing
    const signResponse = await fetch('/signform'); //fetch signature from server
    const signData = await signResponse.json();
    signDatat=signData


    //upload url
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    
    const form = document.querySelector("form");
    const instructions =form.querySelector('#instructions')


    // =========================================================
    //event listeners
    // =========================================================

    instructions.addEventListener('click',(event)=>{
        

        
        const action = event.target.dataset.action

        //parent of target
        const procedure = event.target.closest('.procedure')

        console.log(action)

        switch (action) {
           
            case 'add-image':
                addImageProcedure(event)
                break;
            
            case 'remove-image':
                removeImage(event)

                break;
            default:
                break;
        }

    })


    //submit form event
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        //all steps needed for repair
        const allProcedures = document.querySelectorAll('.procedure')

        //for each procedure upload its images 
        allProcedures.forEach(async (proc)=>{
            //get images in these procedure
            // const imagesToUpload=getImages(proc)
            const imageLinks = await uploadImages(proc, signData)
            console.log(`links for procedure`)
            console.log(imageLinks)
            test = imageLinks;

        })
        
       
    });




})


// ==========================================================================
// FUNCTIONS
// ==========================================================================



//TESTING TO REPLACE BIG FUNCTION ABOVE
 async function uploadImages(element, signData){

    // const files=element
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    const formData = new FormData();
    
    //get images
    const imagesToUpload=getImages(element);

    let imageLinks=[];
    
    imagesToUpload.forEach((filesList)=>{
        // console.log(filesList[0])
        for (let i = 0; i < filesList.length; i++) {
       
            let file = filesList[i];
    
            formData.append("file", file);
            formData.append("api_key", signData.apikey);
            formData.append("timestamp", signData.timestamp);
            formData.append("signature", signData.signature);
            // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); //some form of transformation dont need
            formData.append("folder", "cata"); //put this file in folder named cata
            
            //send post to cloudinary to upload picture
            fetch(url, {
                method: "POST",
                body: formData
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //response from server will contain url of image hosted on cloudinary
                // var str = JSON.stringify(JSON.parse(data), null, 4);
                // let str = data
                // console.log(data)
                // console.log(data.type)
                imageLinks.push(data.url)
                
        
            });
        }

        
        
    })

    return imageLinks

    // for (let i = 0; i < files.length; i++) {
       
    //     let file = files[i];

    //     formData.append("file", file);
    //     formData.append("api_key", signData.apikey);
    //     formData.append("timestamp", signData.timestamp);
    //     formData.append("signature", signData.signature);
    //     // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); //some form of transformation dont need
    //     formData.append("folder", "cata"); //put this file in folder named cata
        
    //     //send post to cloudinary to upload picture
    //     fetch(url, {
    //         method: "POST",
    //         body: formData
    //     })
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         //response from server will contain url of image hosted on cloudinary
    //         // var str = JSON.stringify(JSON.parse(data), null, 4);
    //         let str = data
    //         console.log(data)
    //         console.log(data.type)
    
    //     });
    // }

}


//get images if any and return them
function getImages(element){

    //upload url
    // const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    let files = []

    // get all elements with files
    const allUploads = element.querySelectorAll("[type=file]");

        allUploads.forEach((element)=>{

            //if a file is attached 
            if(element.files.length >0){
                files.push(element.files)
            }
            
            // console.log(element.files)
        })

return files;
    // const files = document.querySelector("[type=file]").files;
    // const filesss = document.querySelector("[type=file]").files;

    
    // const formData = new FormData();

    // Append parameters to the form data. The parameters that are signed using 
    // the signing function (signuploadform) need to match these.
    // for (let i = 0; i < files.length; i++) {
       
    //     let file = files[i];

    //     formData.append("file", file);
    //     formData.append("api_key", signData.apikey);
    //     formData.append("timestamp", signData.timestamp);
    //     formData.append("signature", signData.signature);
    //     // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); //some form of transformation dont need
    //     formData.append("folder", "cata"); //put this file in folder named cata
        
    //     //send post to cloudinary to upload picture
    //     fetch(url, {
    //         method: "POST",
    //         body: formData
    //     })
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         //response from server will contain url of image hosted on cloudinary
    //         // var str = JSON.stringify(JSON.parse(data), null, 4);
    //         let str = data
    //         console.log(data)
    //         console.log(data.type)
    
    //     });
    // }


   
}




function removeImage(event){

   

    //image number i want to target
    const imagenum=event.target.dataset.uploadnum;
    // console.log('imgnum',imagenum)

    //parent 
    const procedure = event.target.closest('.procedure');
    // console.log(`proce`, procedure)

        const uploadList = procedure.querySelector('.uploads');
        uploadList.dataset.totalfiles--;

    //li the image input is in
    const imageListItem = event.target.closest('li');
    // console.log('imageListitem',imageListItem)


    imageListItem.remove();


}

//preview image on page locally when input for image is changed
function previewImage(event){

    const uploadnum= event.target.closest('.uploads').dataset.totalfiles    


    const currentUpload = event.target.closest('.imageuploaded') 
        const image = currentUpload.querySelector('img');
            image.src = URL.createObjectURL(event.target.files[0]);
            image.alt='image preview';
            image.classList.add('img-mini');

        
}





function addImageProcedure(event){
    //parent line item
    const procedure = event.target.closest('.procedure')

    const uploadList = procedure.querySelector('.uploads');
        uploadList.dataset.totalfiles++; //amount of files
        uploadList.dataset.uploadId++; //id for uploading

    let uploadId =uploadList.dataset.uploadId;

    const image = document.createElement('img')
        image.alt='image preview';
        image.classList.add('img-mini');

    const input = document.createElement('input');
        input.dataset.uploadId = uploadId;
        input.name=`picture${uploadId}`;
        input.type='file';
        input.accept="image/*";
        input.onchange=(event)=>{previewImage(event)}

    const removeButton = document.createElement('span');
        removeButton.classList.add('button', 'clickable');
        removeButton.innerText='remove item';
        removeButton.dataset.action='remove-image';
        removeButton.dataset.uploadId = uploadId;
        
    const li = document.createElement('li');
        li.classList.add('imageuploaded');
        li.appendChild(image)
        li.appendChild(input);
        li.appendChild(removeButton);
    

    uploadList.appendChild(li);

    // console.log(input);
    // console.log(`step number is: `,step.dataset.step)
}

