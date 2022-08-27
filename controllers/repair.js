

module.exports={

    addRepair: async (req, res)=>{
        try {
            let entry = (request.body)
            console.log(`post at /repairform`,entry)

            const result = await dataBase.insertLogEntry(entry)
            console.log(`done uploading at server`)
            response.send(result)

        } catch (error) {
            response.status(400).json({message:'failed to save repair', "error":error})
        }
    }
}