
//each phase of repair or procedure has a repair step
class RepairStep{

    constructor(heading_='heading here',images_=[], description_ = 'text detailing description'){
        this.heading=heading_
        this.imagesLinks=images_; // contain urls of images for this particular repair step
        this.description= description_;
    }

    addImage(imageUrl_){
        this.imagesLinks.push(imageUrl_)
    }

    addHeading(heading_){
        this.heading= heading_
    }

    addDesc(description_){

        this.description=description_
    }

    print(){
        console.log(`Headings: `); console.log(this.heading)
        console.log(`image urls: `); console.log(this.imagesLinks)
        console.log(`description: `); console.log(this.description)
    }

    makeJson(){
        return JSON.stringify(this)
    }

 
}


// let test = new RepairStep()
// tempObj=test.makeJson()
// console.log(tempObj)

module.exports=RepairStep