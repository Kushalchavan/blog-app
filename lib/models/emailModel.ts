import mongoose, { Schema } from "mongoose";

interface EmailType extends Document {
  email: string;
  date: Date;
}

const emailSchema = new Schema<EmailType>({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const EmailModel =
  mongoose.models.Email || mongoose.model<EmailType>("Email", emailSchema);

export default EmailModel;
