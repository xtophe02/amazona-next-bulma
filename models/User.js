import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: [2, '2x characters min'] },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      minlength: [5, 'must have at least 5 chars'], //not working
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
