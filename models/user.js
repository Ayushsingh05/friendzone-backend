const mongoose= require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({

          name:
           {
            type: String,
             required:true,
              trim:true,
             minLength:2,
             maxLength:30
             },
             email:
            {
            type: String,
            required:true,
            trim:true,
            unique:true
            },
            password:
            {
            type: String,
            required:true,
            trim:true,
            minLength:2,
            },
            profile_pic: {
                type: "String",
                required: true,
                default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
              },
          followers:[{
                       type:ObjectId,
                       ref:"user"
                    }],
          following:[{
                       type:ObjectId,
                       ref:"user"
                     }],
          date:
          {
            type:Date,
            default:Date.now
          },
})

const UserModel= mongoose.model("user",userSchema);

module.exports=UserModel;