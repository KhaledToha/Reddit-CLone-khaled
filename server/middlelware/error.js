//  exports.errHandling = (err,req,res,next)=>{

//     res.status(err.status).json({
//         error: true,
//         message: err.message
//     })

//     next()
   
// }

exports.errHandling = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.status || 501;
    const message = err.message || 'Unknown Error';
  
    res.status(statusCode).json({
      error: true,
      message: message,
    });
  
    // Call next to properly terminate the middleware chain
    next();
  };
  