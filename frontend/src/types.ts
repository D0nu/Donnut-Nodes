export type List = {
  pnodeId: string
}

export type FilterKeys = "name" |  "pubkey" | "address" | "version"

export type User = {
  id: string;
  name: string;
  email: string;
  provider: string;
  updatedAt: string;
  watchlist: List[];
}

export type Histories = {
  uptime: number;
  pubkey: string;
  online: boolean;
  observed_at: number;
  storage_used: number;
  storage_committed: number;
  storage_usage_percent: number;
}

export type PNodes = {
  name: string;
  pubkey: string;
  address: string;
  version: string;
  rpc_port: number;
  last_seen: number; // unix seconds
  is_public: boolean;

  uptime: number; // seconds
  last_seen_timestamp: number; // unix seconds

  first_seen: number;
  storage_used: number; // bytes
  storage_committed: number; // bytes

}