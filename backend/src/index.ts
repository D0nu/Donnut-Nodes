// server.js - Express Backend for Xandeum pNode Analytics
import "dotenv/config"
import cors from "cors";
import path from "path";
import axios from "axios";
import mongoose from "mongoose";
import { PNodes } from "./types";
import { Server } from "socket.io";
import cookieParser from "cookie-parser"
import { PNodes as Nodes } from "./Model/PNodes";
import NodesInstance from "./Model/NodesInstance";
import getPNodesStatsById from "./Function/PNodes";
import express, { Response , Request } from "express";
import { HomePage, verifyJWT } from "./Function/Utils"
import signUp, { Settings , Delete } from "./Function/signUp";
import { AddToWatchlist, RemoveFromWatchlist } from "./Function/watchList";
import { googleLogin, signIn, twitterCallback, twitterRedirect } from "./Function/signIn";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

// Known pNodes list
const pNodesArray = process.env.KNOWN_PNODES?.split(",")
    .map((url) => `http://${url.trim()}`)
    .filter((url) => url)

const KNOWN_PNODES = [
  ...pNodesArray || ''
];

// In-memory caches
interface Cache<T> {
  data: T[];
  ttl: number;
  lastUpdated: number | null;
}

let pNodesCache: Cache<PNodes> = {
  data: [],
  ttl: 60000,
  lastUpdated: null,
};

const generatedIds = new Set<string>();

// Fetch all pNodes from known endpoints

async function fetchAllPNodes() {
  const now = Date.now();

  if ( pNodesCache.lastUpdated && now - pNodesCache.lastUpdated < pNodesCache.ttl ) return pNodesCache.data;

  const allPNodes = [];

  for ( const nodeEndpoint of KNOWN_PNODES ) {
    try {
      const response = await axios.post(`${nodeEndpoint}/rpc`,
      {
        jsonrpc: "2.0",
        method: "get-pods-with-stats",
        id: 1,
      },
      {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.data.result.pods

      allPNodes.push(...result);
    } catch (err) {
      if (err instanceof Error) console.error(`Error fetching from ${nodeEndpoint}:`, err.message);
    }
  }

  const uniquePNodes = Array.from(
    new Map(allPNodes.filter((n: PNodes)=> n.pubkey ).map((n) => [ n.pubkey || n.id , n ])).values()
  );

  pNodesCache = {
		ttl: 60000,
    lastUpdated: now,
    data: uniquePNodes,
  };

  return uniquePNodes;
}

function generateUniqueNodeId(): string {
  let id: string;
  
  do {
    const letters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    const digits = Math.floor(1000 + Math.random() * 9000);
    id = `${letters}-${digits}`;
  } while (generatedIds.has(id)); // regenerate if collision

  generatedIds.add(id);
  return id;
}

async function pollPNodes() {
  const pods = await fetchAllPNodes();

  const now = Date.now();

  const nodeBulkOps = [];
  const snapshotDocs = [];

  for (const pod of pods) {
    if (!pod.pubkey) {
      console.warn(`Skipping pod because pubkey is missing:`, pod);
      continue; // skip this one
    }

    const online = ( node: PNodes ) => {
      const lastseen = node.last_seen_timestamp * 1000;
      return now - lastseen <= 90000;
    }

    nodeBulkOps.push({
      updateOne: {
        filter: { pubkey: pod.pubkey },
        update: {
          $set: {
            last_seen: now,
            uptime: pod.uptime,
            address: pod.address,
            version: pod.version,
            rpc_port: pod.rpc_port,
            is_public: pod.is_public,
            storage_used: pod.storage_used,
            storage_committed: pod.storage_committed,
            last_seen_timestamp: pod.last_seen_timestamp
          },
          $setOnInsert: {
            first_seen: now,
            pubkey: pod.pubkey,
            age:  now - pod.uptime * 1000,
            name: `Pnode-${generateUniqueNodeId()}`,
          },
        },
        upsert: true,
      },
    });

    snapshotDocs.push({
      observed_at: now,
      uptime: pod.uptime,
      pubkey: pod.pubkey,
      online: online(pod),
      storage_used: pod.storage_used,
      storage_committed: pod.storage_committed,
      storage_usage_percent: pod.storage_usage_percent,
    });
  }

  if (nodeBulkOps.length) {
    await Nodes.bulkWrite(nodeBulkOps);
    await NodesInstance.insertMany(snapshotDocs);

    const nodes = await Nodes.find({});
    
    io.emit("pnodes:update", nodes );
  }

  console.log(`Polled ${pods.length} pNodes`);
}


app.get('/auth/twitter', twitterRedirect);
app.get('/pnodes/:id', getPNodesStatsById);
app.get('/auth/twitter/callback', twitterCallback);

app.post("/auth/google", googleLogin );

app.get("/auth/validate/twitter" , async (req, res) => {
  try {
    const user = await verifyJWT( req )
    return res.status(200).json({ message: `${user.name} auth validated`})
  } catch (err) {
    if (err instanceof Error) console.log(err)
    return res.status(401).json({ error: 'Invalid twitter auth token'})
  }
});

app.get("/health", ( req: Request , res: Response ) => {
  res.json({ status: "ok", uptime: process.uptime() , timeStamp: Date.now() });
});
app.get("/pnodes", async ( req: Request , res: Response ) => {
  try {
    const nodes = await Nodes.find({});
    res.json({
      data: nodes ,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
});

app.get('/', (req, res) => {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    
    res.send(HomePage(clientUrl));
});

app.post("/auth/signin", signIn);
app.post("/auth/signup", signUp);
app.post("/auth/settings", Settings);
app.post("/watchlist", AddToWatchlist);

app.delete("/auth/delete", Delete);
app.delete("/watchlist", RemoveFromWatchlist);


const server = app.listen(PORT, async () => {
  await mongoose.connect( process.env.MONGO_URI || '' )
  await pollPNodes()
  console.log(`API running on port ${PORT}`)
});

const io = new Server(server, {
  cors: { origin: [
    process.env.clientUrl || 'http://localhost:3000'
  ] },
});

// Socket events
io.on("connection", (socket) => {
  console.log("Client connected to ", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected from ", socket.id);
  });
});

setInterval(pollPNodes, 90000); // every 90 sec

export default app;
