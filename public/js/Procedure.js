

class Procedure {
    constructor(thumbs=[],imagesArr=[],procedureNum=1,instructions='default instructions'){
        this.images = imagesArr
        this.procedureNum=procedureNum
        this.instructions=instructions
        this.thumbs = thumbs
    }
    procedureHtml(){
        const element = ` 
            <section>
                <h3>Repair Procedure</h3>
                <!-- images uploaded -->
                <fieldset>
                    <legend>Images
                        <!-- add another image button -->
                        <div class="add-img button clickable " data-action="add-image">add another image</div>
                    </legend>

                    <ol class="uploads" data-totalfiles="0" data-uploadId="0">
                        <!-- <li class="imageuploaded">
                            <img src="" alt="repair image" class="img-mini">
                            <input  data-uploadnum="1" type="file" name="picture1" accept="image/*" onchange="previewImage(event)"  >
                            <span class="button clickable">remove item</span>
                        </li> -->
                    
                    </ol>
                
                </fieldset>
            
                <textarea name="instructions1" id="instructions1" class="instructions" cols="10" rows="10" value="test dfafamongo"></textarea>

            </section>
            <section>
                <div class="add-proc button clickable " data-action="add-procedure">add another step to this procedure</div>
            </section>`;

   return element;
    }

    

}
