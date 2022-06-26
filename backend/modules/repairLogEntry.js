

// {
    
//     "tags": ['search this'],
//     "title": "cummins no 100v",
//     "board": "model 4473",
//     "engine": "cummins engine model",
//     "procedure": [
//     {
//     "step": 1,
//     "images": [
//     "wwww url",
//     "wwww url2"
//     ],
//     "description": "this is how to fix it step 1"
//     },
//     {
//     "step": 2,
//     "images": [
//     "wwww url",
//     "wwww url2"
//     ],
//     "description": "this is how to fix it step 2"
//     }
//     ]
//     }


//repair entry class will contain all information necessary for repair process
class RepairEntry{
    constructor(title_='test title string', tags_=[], procedureArr_ =[],boardType_='type of board DDEC4 KA 8046', engine_='engine model string' ){
        this.tags=tags_; //to search as
        this.title =title_;
        this.board=boardType_;
        this.engine = engine_; // engine make cat cummins detroit
        this.procedure = procedureArr_; // will be an array of objects containing RepairSteps 
       
       
        
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