const mongoose = require('mongoose');
const Repair = require('../models/Repair')
const User = require('../models/User')


module.exports.testPost = async (req, res)=>{
    try {
       console.log(req.session.passport)
    
        res.render('test')
        
    } catch (error) {
        
    }
}

//soft delete
module.exports.deletePost = async (req, res)=>{
    try {
        const user = await User.findOne({username:req.user.username})
        const report = await Repair.findById({_id:req.params.id})
    
        // if(user.role === 'admin' || report.createdBy === user.username ){
        if(user.role === 'admin' || user._id.equals(report.createdBy) ){

            report.removed = true;
            await report.save()
            // res.send({message:'user is admin or creator',rep:report})

            res.redirect('/repair/') 
        }else{
            console.log('user not allowed')
            throw new Error(`user: ${user.username} not allowed`)
        }

    } catch (err) {
        
        res.send({err:'delete error implemented ID: '+ req.params.id, message: error.message})
    }
}

//add repair to database
module.exports.addRepair = async (req, res)=>{
    console.log("request for add repair",req.body)
    console.log("***********************************")
        try {
           let  groupId= req.body.group ? req.body.group : req.user.username


            let entry = {
                procedureArr: req.body.procedureArr,
                searchtags: req.body.searchtags,
                title: req.body.title,
                boardType: req.body.boardType,
                engineMake: req.body.engineMake,
                createdBy:req.user._id,//user user id instead
                removed:false,
                group:groupId //user group id instead
                //! test if group is actually assigne
            }
            console.log(req.body)
            // console.log(`post at /repairform`,entry)

            let result = await Repair.create(entry)
            console.log(`done uploading at server result`,result)

            const repLink= `/repair/${result._id}` //add link to repair

            // console.log(`server response to send`,result)
            res.send({result:entry,link:repLink})
            
        } catch (err) {
            res.status(400).json({message:'failed to save repair', "error":err.message})
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
        res.render('search.ejs',{title:'Search Results',repairs:results,user:req.user});
    } catch (err) {
        res.status(400).json({message:'failed to get repairs', "error":err.message})
    }
}

//get a number of newest repairs
module.exports.getNewestRepairs = async (req, res)=>{
    try {
        console.log(`controller repair.getNewestRepairs`)
        console.log( `number of repairs requested`,req.params.num)
        const numRepairs = req.params.num ? req.params.num : 8;
        const userGroups = [...req.user.groups,'public']

        //retrieve certain number of repairs that have not been removed
        // const results = await Repair.find({removed:{$ne:true},group:{$in:userGroups}}).sort({_id:-1}).limit(numRepairs);
        const results = await Repair.find({$or:[
            {
                removed:{$ne:true},
                group:{$in:userGroups}
            },
            {
                visibility:{$in:['public']},
                removed:{$ne:true},
                
            }
           
        ]}).sort({_id:-1}).limit(numRepairs);

        console.log( `number of repairs returned`,results.length)
        console.log('repairs are: ',results)
        res.render('latest.ejs',{
            title:'Latest Repairs',
            repairs:results,
            user:req.user
        })
    
    } catch (err) {
        res.status(500).json({message:'failed get repairs', "error":err.message})
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



/// render single repair 
module.exports.getRepairPage = async (req, res)=>{
    const repairId = req.params.id
    let repairObj ={};
    let createdByUser='';
    let foundUser={};
    let requestingUser={};
    let toolsAllowed=false;

    try { //find repair report
       repairObj = await Repair.findOne({_id:repairId}).lean() 
    } catch (err) {
        res.status(400).json({message:`ID: ${repairId}  NOT FOUND`, error:err.message})
        return;
    }

    
    try {//find user that created report from user id on report
        
        //!need to abstract the ID to username action

        console.log(`repair obj`,repairObj)

        //! some entry are old using string newer ones use ID
        if(repairObj.createdBy.length > 10){
            foundUser =await User.findOne({_id:repairObj.createdBy}) //find by ID user who made report
        }else{
            foundUser =await User.findOne({username:repairObj.createdBy}) //find by ID user who made report

        }

        createdByUser = foundUser.username // get the username string for report render

        requestingUser = await User.findOne({_id:req.user._id})//user requesting

        
    } catch (err) {
        res.status(400).json({message:`Failed to find report ID:${repairId}`, error:err.message})
        return
    }

    //check if user can have edit tools
    
    
    // console.log(repairObj)
    // console.log(`created by compare` ,repairObj.createdBy,' : ',req.user._id )
    // console.log(foundUser)
    // console.log(`req user`, requestingUser)
    
    
    toolsAllowed = (req.user._id.equals(repairObj.createdBy) ||repairObj.createdBy === req.user.username || requestingUser.role === 'admin') //! need admin check
    console.log(req.user)
    
    /// render page
    res.render('repairinfo.ejs',{
        title:'Repair Information',
        repair:repairObj,user:req.user,
        createdBy:createdByUser,
        // allowedEdit:(repairObj.createdBy == req.user._id)
        //!need to abstract check for modify tools
        allowedEdit:toolsAllowed


    })
   


}



module.exports.getSearchPage = async (req, res)=>{
  
    try{
        // get paremeter from ur

       res.render('search-page.ejs',{title:'Search Records',user:req.user})
    }
    catch(err){
       res.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err.message})
   }



}


