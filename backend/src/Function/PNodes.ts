import { Request, Response } from "express";
import { PNodes as Nodes } from "../Model/PNodes";
import NodesInstance from "../Model/NodesInstance";

// function getRangeConfig( range: string | ParsedQs | (string | ParsedQs)[]) {
//   const now = Date.now();

//   switch (range) {
//     case "1h":
//       return { from: new Date(now - 60 * 60 * 1000), bucketMs: 60 * 1000 };
//     case "24h":
//       return { from: new Date(now - 24 * 60 * 60 * 1000), bucketMs: 5 * 60 * 1000 };
//     case "7d":
//       return { from: new Date(now - 7 * 24 * 60 * 60 * 1000), bucketMs: 30 * 60 * 1000 };
//     case "30d":
//       return { from: new Date(now - 30 * 24 * 60 * 60 * 1000), bucketMs: 60 * 60 * 1000 };
//     default:
//       throw new Error("Invalid range");
//   }
// }

export default async function getPNodesStatsById( req: Request , res: Response) {
  const { id: pubkey } = req.params;

  try {
    const data = await Nodes.findOne({ pubkey });
    if (!data) return res.status(404).json({ error: "Node not found" });

    const history = await NodesInstance.find({ pubkey });

    const histories = history?.length ? history : []

    return res.status(200).json({ data , histories });
  } catch (error) {
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}