import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  profilePicture: { type: String, default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw30gmphsoerRnmnEAof4x9I&ust=1726313995683000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDxp_jqv4gDFQAAAAAdAAAAABAJ' }, // Default profile picture
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  yearsOfExperience: { type: Number, required: true },
  password: { type: String, required: true },
  consultations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Consultation" },
  ],
});

export default mongoose.model("Doctor", doctorSchema);
