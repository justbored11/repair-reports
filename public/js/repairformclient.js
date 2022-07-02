







//preview image on page locally
function previewImage(event){

    //get event target
    //get event closest parent
    //subselect the image preview
    //change source of image to image we uploaded

    console.log(`preview image`)
    const previewArea = document.querySelector('.image-preview');
    let image = document.createElement('img')
    image.src = URL.createObjectURL(event.target.files[0]);
    image.alt='image preview'
    image.classList.add('img-mini')

    previewArea.appendChild(image)
}









document.addEventListener('DOMContentLoaded', async () => {
    console.log(`doc loaded repair form`)

    const signResponse = await fetch('/signform'); //fetch signature from server

    // console.log(`response is: `,signResponse)


    const signData = await signResponse.json();

    // console.log(signData)

    //build url to upload
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    


    //get form from document
    const form = document.querySelector("form");

        // subelement in form
        const procedure =form.querySelector('#procedure')

    









    // =========================================================
    //event listeners
    // =========================================================

    //inside procedure
    procedure.addEventListener('click',(event)=>{
        

        
        const action = event.target.dataset.action
        const step = event.target.closest('.repair-step')


        switch (action) {
            case 'add-image':
               
                const input = document.createElement('input')
                img.type='file'
                console.log(`step number is: `,step.dataset.step)
                step
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

