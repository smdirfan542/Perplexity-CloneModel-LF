import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken

export async function authUser(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:'Unauthorized',
            success:false,
            err:'No token provided'
        })
    }

    let decoded ;
    
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRETKEY)
    }catch(err){
        return res.status(401).json({
            message:'Unauthorized',
            success:false
            ,err:'Invalid token'
        })
    }

    req.user= decoded;
    next();
    
}
