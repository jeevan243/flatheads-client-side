const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
   first_name:{type:String,required:true},
   last_name:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true}
});
userSchema.pre("save",function(next) {
    if(!this.isModified("password")) return next();
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();

});
userSchema.methods.checkPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}
let User = mongoose.model("user",userSchema);
module.exports = User;