const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await  fn(req, res, next);
        
    } catch (error) {
        res.status(error || 500).json({
            success: false,
            message: error.message
        })
    }
}

// Promise handling 
// const asyncHandler = (requestHandler)=>{
//     (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
//     }
// }

export {asyncHandler} 