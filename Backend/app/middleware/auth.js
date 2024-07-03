const jwt = require('jsonwebtoken')
const authenticateUser = (req,res,next)=>{
    const token = req.headers['authorization']
    if(token){
        try{
            const tokenData = jwt.verify(token , process.env.JWT_SECRET)
            const user = {
                id:tokenData.id,
                role:tokenData.role
            }
            req.user = user
            next()
        }catch(err){
            console.log(err)
            res.status(500).json({error:'Internal Server Error'})
        }
    }else{
        res.json({
            'notify':'Token is required'
        })
    }
}

const authorizeUser = (permittedRoles)=>{
    return (req,res,next)=>{
        if(permittedRoles.includes(req.user.role)){
            next()
        }else{
            res.status(403).json({error:'You are not allowed to access this route'})
        }
    }
}



module.exports = {
    authenticateUser,
    authorizeUser
}