import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['LOGIN', 'LOGOUT', 'CREATE_ASSESSMENT', 'VIEW_ASSESSMENT', 'UPDATE_PROFILE', 'ADMIN_ACTION']
  },
  details: {
    type: mongoose.Schema.Types.Mixed, // Can store objects/flexible data about the action
    default: {}
  },
  ipAddress: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for faster querying by user or action over time
AuditLogSchema.index({ userId: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });

export default mongoose.model('AuditLog', AuditLogSchema);
