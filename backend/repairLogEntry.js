


//repair entry class will contain all information necessary for repair process
class RepairEntry{
    constructor(title_='test title string', tags_=[], instructionsArr_ =[], engineModel_='engine model string', boardType_='type of board DDEC4 KA 8046'){
        this.title =title_;
        this.tags=tags_; //to search as
        this.instructionsArr = instructionsArr_; // will be an array of objects containing RepairSteps 
        this.engineModel = engineModel_;
        this.boardType=boardType_;
        
    }

    print(){
        console.log(`title : ${this.title} tags: ${this.tags}`);
        console.log(this.instructionsArr)
    }

    makeJson(){
        return JSON.stringify(this)
    }

    //will accept RepairStep object
    addStep(step_){
        this.instructionsArr.push(step_)
    }

}


// let test = new RepairEntry


// console.log(JSON.stringify(test))



module.exports=RepairEntry