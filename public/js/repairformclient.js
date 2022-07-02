















document.addEventListener('DOMContentLoaded', async () => {
    console.log(`doc loaded repair form`)

    const signResponse = await fetch('/signform'); //fetch signature from server
    const signData = await signResponse.json();

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


    //submit from event
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        uploadImages(event ,signData)
        // //get all elements with files
        // const files = document.querySelector("[type=file]").files;
        // const formData = new FormData();
    
        // // Append parameters to the form data. The parameters that are signed using 
        // // the signing function (signuploadform) need to match these.
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
        //         return response.text();
        //     })
        //     .then((data) => {
        //         //response from server will contain url of image hosted on cloudinary
        //         console.log(JSON.parse(data))
        //         var str = JSON.stringify(JSON.parse(data), null, 4);
        //         document.getElementById("formdata").innerHTML += str;
        //     });
        // }
    });




})


// ==========================================================================
// FUNCTIONS
// ==========================================================================

//upload images and return urls to images
function uploadImages(event,signData){
    //upload url
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";

    let links =[]

    //get all elements with files
    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    // Append parameters to the form data. The parameters that are signed using 
    // the signing function (signuploadform) need to match these.
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
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
            let str = data
            console.log(data)
            console.log(data.type)
            // document.getElementById("formdata").innerHTML += str;

            links.push()
        });
    }


    return links
}



function removeImage(event){

    //image number i want to target
    const imagenum=event.target.dataset.uploadnum;
    console.log('imgnum',imagenum)

    //parent 
    const procedure = event.target.closest('.procedure');
    console.log(`proce`, procedure)

    //li the image input is in
    const imageListItem = event.target.closest('li');
    console.log('imageListitem',imageListItem)

    //img tag that is holding preview
    const preview = procedure.querySelector(`img[data-uploadnum="${imagenum}"]`);
    console.log('preview',`img[data-uploadnum="${imagenum}"]`)
  
    
    imageListItem.remove();

    preview.remove();

}

//preview image on page locally
function previewImage(event){

    const uploadnum= event.target.closest('.uploads').dataset.totalfiles    



    console.log(`preview image`)
    const previewArea = document.querySelector('.img-preview');

    let image = document.createElement('img');
        image.src = URL.createObjectURL(event.target.files[0]);
        image.alt='image preview';
        image.classList.add('img-mini');
        image.dataset.uploadnum=uploadnum;

    previewArea.appendChild(image);
}





function addImageProcedure(event){
    const procedure = event.target.closest('.procedure')
    const uploadList = procedure.querySelector('.uploads');
    uploadList.dataset.totalfiles++;
    let numOfUploads =uploadList.dataset.totalfiles;

    const input = document.createElement('input');
        input.dataset.uploadnum = numOfUploads;
        input.name=`picture${numOfUploads}`;
        input.type='file';
        input.accept="image/*";
        input.onchange=(event)=>{previewImage(event)}

    const removeButton = document.createElement('span');
        removeButton.classList.add('button', 'clickable');
        removeButton.innerText='remove item';
        removeButton.dataset.action='remove-image';
        removeButton.dataset.uploadnum = numOfUploads;
        
    const li = document.createElement('li');
        li.classList.add('imageuploaded');
        li.appendChild(input);
        li.appendChild(removeButton);
    

    uploadList.appendChild(li);

    console.log(input)
    // console.log(`step number is: `,step.dataset.step)
}

