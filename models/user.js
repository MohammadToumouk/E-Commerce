const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        select: false
      },
      role: {
        type: String,
        enum: ['admin', 'manager', 'employee'],
        default: 'employee',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { collection: 'users' }
  );
  
  module.exports = mongoose.model('User', userSchema);
  