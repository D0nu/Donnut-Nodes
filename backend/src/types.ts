export type List = {
  pnodeId: string
}

export type PNodes ={
  pubkey: string;
  address: string;
  version: string;
  rpc_port: number;
  is_public: boolean;

  uptime: number; // seconds
  last_seen_timestamp: number; // unix seconds

  storage_used: number; // bytes
  storage_committed: number; // bytes
  storage_usage_percent: number;

}