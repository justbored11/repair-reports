







//preview image on page locally
function previewImage(event){

    //get event target
    //get event closest parent
    //subselect the image preview
    //change source of image to image we uploaded

    console.log(`preview image`)
    const previewArea = document.querySelector('.img-preview');
    let image = document.createElement('img');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.alt='image preview';
    image.classList.add('img-mini');

    previewArea.appendChild(image);
}









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
                addImageProcedure(procedure)
                // const uploadList = procedure.querySelector('.uploads');
                // uploadList.dataset.totalfiles++;
                // let numOfUploads =uploadList.dataset.totalfiles;

                // const input = document.createElement('input');
                // input.dataset.uploadnum = numOfUploads;
                // input.name=`picture${numOfUploads}`
                // input.type='file';
                // input.accept="image/*"
                // input.onchange=(event)=>{previewImage(event)}
                // const li = document.createElement('li');
                
               
               


                // li.appendChild(input);
                // uploadList.appendChild(li);
                // console.log(input)
                // // console.log(`step number is: `,step.dataset.step)
                
                break;
        
            default:
                break;
        }

    })

    //submit event
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
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
                return response.text();
            })
            .then((data) => {
                //response from server will contain url of image hosted on cloudinary
                console.log(JSON.parse(data))
                var str = JSON.stringify(JSON.parse(data), null, 4);
                document.getElementById("formdata").innerHTML += str;
            });
        }
    });




})



function addImageProcedure(procedure){
    const uploadList = procedure.querySelector('.uploads');
    uploadList.dataset.totalfiles++;
    let numOfUploads =uploadList.dataset.totalfiles;

    const input = document.createElement('input');
        input.dataset.uploadnum = numOfUploads;
        input.name=`picture${numOfUploads}`
        input.type='file';
        input.accept="image/*"
        input.onchange=(event)=>{previewImage(event)}

    const li = document.createElement('li');
        li.appendChild(input);
   
   


   
    uploadList.appendChild(li);

    console.log(input)
    // console.log(`step number is: `,step.dataset.step)
}

