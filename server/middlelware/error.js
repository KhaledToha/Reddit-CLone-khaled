 exports.errHandling = (err,req,res,next)=>{

    res.status(err.status).json({
        error: true,
        message: err.message
    })
   
}