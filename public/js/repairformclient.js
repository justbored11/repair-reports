

function previewImage(event){

    console.log(`preview image`)
    const previewArea = document.getElementById('image-preview');
    let image = document.createElement('img')
    image.src = URL.createObjectURL(event.target.files[0]);

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
    
    // console.log(`url is :`, url)


    //get form from document
    const form = document.querySelector("form");

    

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
            // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
            formData.append("folder", "cata");
    
            fetch(url, {
                method: "POST",
                body: formData
            })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(JSON.parse(data))
                var str = JSON.stringify(JSON.parse(data), null, 4);
                document.getElementById("formdata").innerHTML += str;
            });
        }
    });

})

