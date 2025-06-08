import mongoose, { Document, Schema } from 'mongoose';

export interface IFormSubmission extends Document {
  name: string;
  email: string;
  company?: string;
  useCase?: string;
  companySize?: string;
  message?: string;
  submittedAt: Date;
  emailSent: boolean;
  emailSentAt?: Date;
}

const FormSubmissionSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name must be less than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name must be less than 100 characters']
  },
  useCase: {
    type: String,
    enum: ['surveillance', 'autonomous', 'research', 'security', 'other', ''],
    default: ''
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201+', ''],
    default: ''
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message must be less than 1000 characters']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date
  }
});

// Create indexes for better query performance
FormSubmissionSchema.index({ email: 1 });
FormSubmissionSchema.index({ submittedAt: -1 });

export default mongoose.models.FormSubmission || mongoose.model<IFormSubmission>('FormSubmission', FormSubmissionSchema); 