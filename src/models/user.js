import { type } from 'os';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types; // Import ObjectId type

// Define schema for players joined
const userSchema = new Schema(
  {
    eId: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    department: {
      type: String,
    },
    reportsRight: {
      finance: {
        type: Number,
        default: 0,
      },
      ppc: {
        type: Number,
        default: 0,
      },
      survey: {
        type: Number,
        default: 0,
      },
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['Operator', 'Admin'],
      default: 'Operator'
    },
    isHOD : {
      type : Boolean,
      default : false
    },
    hodDepartments : {
      type : Array
    }
  },
  {
    collection: 'userDesire', // Set your desired collection name
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const UserSchema = mongoose.models.UserSchema || mongoose.model('UserSchema', userSchema);

export default UserSchema;