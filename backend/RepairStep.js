
//each phase of repair or procedure has a repair step
class RepairStep{

    constructor(heading_='heading here',images_=[], description_ = 'text detailing description'){
        this.heading=heading_
        this.images=images_; // contain urls of images for this particular repair step
        this.description= description_;
    }
 
}

module.exports=RepairStep