const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for players joined
const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp : {
        type : String,
        required : true
    },
  },
  {
    collection: 'authSchema', // Set your desired collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const AuthSchema = mongoose.models.AuthSchema || mongoose.model('AuthSchema', authSchema);

export default AuthSchema;