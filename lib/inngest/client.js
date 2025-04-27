import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "Daksha.AI", 
    name:"Daksha.AI" ,
    credentials: {
        gemini: {
          apiKey: process.env.GEMINI_API_KEY,
        },
      },
 });
