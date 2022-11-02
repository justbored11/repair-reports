const Repair = require('../models/Repair')
const User = require('../models/User')


module.exports.testPost = async (req, res)=>{
    try {
        res.render('test')
        
    } catch (error) {
        
    }
}


//!permanent delete
module.exports.deletePost = async (req, res)=>{
    try {
        const user = await User.findOne({username:req.user.username})
        const report = await Repair.findById({_id:req.params.id})
    
        // if(user.role === 'admin' || report.createdBy === user.username ){
        //     report.removed = true;
        //     await report.save()
        //     res.redirect('/repair/') 
        // }else{
        //     console.log('user not allowed')
        //     throw new Error(`user: ${user.username} not allowed`)
        // }

    } catch (error) {
        
        res.send({err:'delete error implemented ID: '+ req.params.id, message: error.message})
    }
}

//soft delete post
module.exports.deletePost = async (req, res)=>{
    try {
        const user = await User.findOne({username:req.user.username})
        const report = await Repair.findById({_id:req.params.id})
    
        if(user.role === 'admin' || report.createdBy === user.username ){
            report.removed = true;
            await report.save()
            // res.send({message:'user is admin or creator',rep:report})

            res.json({"removed":report}) 
        }else{
            console.log('user not allowed')
            throw new Error(`user: ${user.username} not allowed`)
        }

    } catch (error) {
        
        res.send({err:'delete error implemented ID: '+ req.params.id, message: error.message})
    }
}

//add repair to database
module.exports.addRepair = async (req, res)=>{
        try {
            let entry = {
                procedureArr: req.body.procedureArr,
                searchtags: req.body.searchtags,
                title: req.body.title,
                boardType: req.body.boardType,
                engineMake: req.body.engineMake,
                createdBy:req.user.username,
                removed:false,
            }
            console.log(req.body)
            // console.log(`post at /repairform`,entry)

            let result = await Repair.create(entry)
            console.log(`done uploading at server result`,result)
 
            const repLink= `/repair/${result._id}` //add link to repair

            // console.log(`server response to send`,result)
            res.send({message:"repair added successfully",result:entry,link:repLink})
            
        } catch (error) {
            res.status(400).json({message:'failed to save repair', "error":error.message})
        }
    }


    
//retrieve repairs matching query
module.exports.searchRepairs = async (req, res)=>{
    try {
        console.log(`repairsController.searchRepairs`,req.query)
        const searchStr = req.query.searchPhrase
        const results = 
        await Repair.aggregate(
            [
                { 
                  $search: {
                    index: 'repairs_search',
                    text: {
                      query: searchStr,
                    //   path:["title","searchtags","procedureArr","instructions"],
                        path:{'wildcard': '*'},
                      fuzzy:{maxEdits:2,prefixLength:3}
                    }
                  }
                }
              ]);
        res.json({repairs:results});
    } catch (error) {
        res.status(400).json({message:'failed to get repairs', "error":error.message})
    }
}

//get a number of newest repairs
module.exports.getNewestRepairs = async (req, res)=>{
    try {
        console.log(`controller repair.getNewestRepairs`)
        console.log( `number of repairs requested`,req.params.num)
        const numRepairs = req.params.num ? req.params.num : 8;

        //retrieve certain number of repairs that have not been removed
        const results = await Repair.find({removed:{$ne:true}}).sort({_id:-1}).limit(numRepairs);
        console.log( `number of repairs returned`,results.length)
        
        res.json({
            repairs:results,
        })
    
    } catch (error) {
        res.status(500).json({message:'failed get repairs', "error":error.message})
    }
}


/// api get repair JSON
module.exports.getRepair = async (req, res)=>{
  
        try{
            // get paremeter from url
           const repairId = req.params.id
           const repairObj = await Repair.findOne({_id:repairId}).lean() /// swap to mongoose
    
           console.log(`getting repair JSON`,repairObj)
           res.status(200).json(repairObj)
        }
        catch(err){
           res.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err})
       }
}
