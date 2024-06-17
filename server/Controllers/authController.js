const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel')
const createErrors = require('../Utils/apiErrors')

exports.signUp = async(req, res, next) =>{

    try{
     const existingUser = await User.findOne({email: req.body.email});
     if(existingUser){
        return res.status(400).send("User Already Exists!");
        //next(new createErrors('User Already Exists!', 400));
     }
    // const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const salt = await bcrypt.genSalt(10); // Generate a random salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

     const user = await User.create({
       ...req.body,
        password: hashedPassword
     })

     //ASSIGN JWT TOKEN TO USER
     const token = jwt.sign({_id: user._id}, "secretkey123",
        {expiresIn: '90d'}
     )

     res.status(201).json({
        status: 'Success',
        message: 'User registered successfully',
        token,
        user
     })
    }
    catch(error){
        next(error)
    }

}
exports.login = async(req, res, next) =>{
   try{
      const { email, password } = req.body;
      const user = await User.findOne({email});
       if(!user) return res.status(404).send("Invalid user");
       //next(new createErrors('User Not Found', 404));

      const isPasswordvalid = await bcrypt.compare(password, user.password);

      if(!isPasswordvalid) return  res.status(400).send("Invalid password");
      //next(new createErrors('Invalid Paasword', 401));

      const token = jwt.sign({_id: user._id}, "secretkey123",
        {expiresIn: '90d'}
     )

      res.status(200).json({
        status: 'Success',
        message: 'User login successfully',
        token,
        user:{
            _id: user._id,
            email: user.email,
            password: user.password,
            role: user.role
        }
     })
   }
   catch(error){
      next(error)
   }
}