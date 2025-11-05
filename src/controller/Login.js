const Astrologer = require("../model/Astrologer");
const jwt = require("jsonwebtoken");
const loginRouter = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user=await Astrologer.findOne({email,password});
    if(!user){
      return res.status(400).json({message:"User not found",status:400})
    }
    if(user.password !== password){
      return res.status(400).json({message:"Invalid password",status:400})
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const usObj=user.toObject();
    delete usObj.password;
    res.status(200).json({user:usObj,token,status:200})
  } catch (error) {
    res.status(500).json({ message: error.message,status:500 });
  }
}; 
module.exports = { loginRouter };
