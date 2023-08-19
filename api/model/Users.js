const db = require("../config")
const{hash,compare,hashSync}=require('bcrypt')
const {createToken} = require('../middleware/AuthenticateUser')
class Users{
    fetchUsers(req,res){
        const query =`
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd, userPassword, profileUrl
        FROM Users;
        `
        db.query(query,(err,results)=>{
            if (err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    fetchUser(req,res){
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd, userPassword, profileUrl
        FROM Users
        WHERE userID =${req.params.id};
        `
        db.query(query,(err,result)=>{
            if (err) throw err
            res.json({
                status:res.statusCode,
                result
            })
        })
    }
    login(req, res) {
        const {emailAdd, userPassword} = req.body
        
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd, userPassword, profileUrl
        FROM Users
        WHERE emailAdd = '${emailAdd}';
        `
        db.query(query, async (err, result)=>{
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode, 
                    msg: "You provided a wrong email."
                })
            }else {
                await compare(userPassword,
                    result[0].userPassword,
                    (cErr, cResult)=>{
                        if(cErr) throw cErr
                        
                        const token =
                        createToken({
                            emailAdd,
                            userPassword
                        })
                        if(cResult) {
                            res.json({
                                msg: "Logged in",
                                token,
                                result: result[0]
                            })
                        }else {
                            res.json({
                                status: res.statusCode,
                                msg:
                                "Invalid password or you have not registered"
                            })
                        }
                    })
            }
        })
}
async register(req,res){
    const data = req.body
 
    data.userPassword = await hash(data.userPassword,15)

    const user = {
        emailAdd : data.emailAdd,
        userPassword : data.userPassword
    }

    const query =`
    INSERT INTO Users
    SET ?;
    `
    db.query(query,[data], (err)=>{
    if(err)throw err
    let token = createToken(user)
  
    res.json({
        status : res.statusCode,
        token,
        msg: "you are now registered."
    })
})
}
updateUser(req,res){
    const data =req.body
    if(data.userPassword){
        data.userPassword = hashSync(data.userPassword,15)
    }
    const query =`
    UPDATE Users
    SET ?
    WHERE userID=?
    `
    db.query(query, [data, req.params.id],(err)=>{
       if (err) throw err
       res.json({
        status: statusCode,
        msg: "The user record was updated."

       })
 
    })
}
deleteUser(req,res){
    const query = `
    DELETE FROM Users
    WHERE userID =${req.params.id}
    `
    db.query(query,(err)=>{
        if (err) throw err
        res.json({
            status:res.statusCode,
            msg: "A user record was deleted."
        })
    })
}

}
module.exports = Users
