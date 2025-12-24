import mongoose from "mongoose";

const NodeInstanceSchema = new mongoose.Schema({
  pubkey: {
    type: String,
    required: true,
    index: true,
  },

  observed_at: {
    index: true,
    type: Number,
    required: true,
  },

  uptime: Number,

  storage_committed: Number,
  storage_used: Number,
  storage_usage_percent: Number,
});

const NodesInstance = mongoose.models.NodesInstance || mongoose.model( "NodeInstance", NodeInstanceSchema );

export default NodesInstance
