import mongoose from "mongoose";

const PNodeSchema = new mongoose.Schema({
  pubkey: {
    index: true,
    type: String,
    required: true,
    unique: true, // THIS is the identity
  },

  name: {
    type: String,
    unique: true,
    required: true,
  },
  address: String,
  version: String,
  rpc_port: Number,
  is_public: Boolean,
  storage_committed: Number,
  last_seen_timestamp: Number,

  first_seen: {
    type: Number,
    required: true,
  },

  last_seen: {
    type: Number,
    required: true,
  },
  
  uptime: {
    min: 0,
    default: 0,
    type: Number,
    required: true,
  },

  storage_used: {
    min: 0,
    default: 0,
    type: Number,
    required: true,
  },
});

export const PNodes = mongoose.models.PNodes || mongoose.model("PNodes", PNodeSchema);
