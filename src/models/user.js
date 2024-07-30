import { type } from 'os';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types; // Import ObjectId type

// Define schema for players joined
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password : {
        type : String,
        required : true
    },
    role: {
      type: String,
      enum: ['Operator', 'Admin'],
      default : 'Operator'
    }
  },
  {
    collection: 'userDesire', // Set your desired collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const UserSchema = mongoose.models.UserSchema || mongoose.model('UserSchema', userSchema);

export default UserSchema;