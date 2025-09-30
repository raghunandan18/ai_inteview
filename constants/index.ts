import { CreateAssistantDTO, CreateWorkflowDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};


export const generator: CreateWorkflowDTO = 
{
  "name": "ai_interview_prep",
  "nodes": [
    {
      "name": "introduction",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -661.9809898882805,
          "y": -83.42485446751547
        }
      },
      "prompt": "You are a friendly AI interview preparation assistant. \nYou are a professional career coach having a natural conversation. After greeting the user, gather information about their interview preparation needs conversationally, just as a real consultant would.\nKey behaviors:\nRespond to social cues (if they ask how you are, acknowledge it naturally)\nShow interest in their responses with brief encouraging comments\nAsk follow-up questions when appropriate to show you're listening\nUse varied phrasing - never repeat the same sentence structure\nConnect their answers to show you understand their goals.\n",
      "voice": {
        "model": "eleven_turbo_v2_5",
        "voiceId": "mCQMfsqGDT6IDkEKR20a",
        "provider": "11labs"
      },
      "globalNodePlan": {
        "enabled": true,
        "enterCondition": ""
      },
      "variableExtractionPlan": {
        'output': [
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": "What role would you like to train for?"
          },
          {
            "enum": [],
            "type": "string",
            "title": "type",
            "description": "Are you aiming for a technical, behavioral, or mixed interview?"
          },
          {
            "enum": [],
            "type": "string",
            "title": "level",
            "description": "The job experience level."
          },
          {
            "enum": [],
            "type": "string",
            "title": "amount",
            "description": "How many questions would you like me to prepare for you?"
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": "A list of technologies to cover during the job interview."
          }
        ]
      },
      "messagePlan": {
        "firstMessage": "Hello {{username}}! Let's prepare your interview. I'll ask you a few questions and generate a perfect interview just for you. Are you ready? "
      },
      "toolIds": []
    },
    {
      "name": "apiRequest_1756363549561",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -661.0532700159362,
          "y": 806.5114163423048
        }
      },
      "tool": {
        "url": "https://ai-interview-prep-two-red.vercel.app/api/vapi/generate",
        "body": {
          "type": "object",
          "required": [
            "techstack",
            "userid",
            "amount",
            "type",
            "level",
            "role"
          ],
          "properties": {
            "role": {
              "type": "string",
              "default": "{{role}}",
              "description": ""
            },
            "type": {
              "type": "string",
              "default": "{{type}}",
              "description": ""
            },
            "level": {
              "type": "string",
              "default": "{{level}}",
              "description": ""
            },
            "amount": {
              "type": "string",
              "default": "{{amount}}",
              "description": ""
            },
            "userid": {
              "type": "string",
              "default": "{{userid}}",
              "description": ""
            },
            "techstack": {
              "type": "string",
              "default": "{{techstack}}",
              "description": ""
            }
          }
        },
        "name": "getUserData",
        "type": "apiRequest",
        "method": "POST",
        "function": {
          "name": "api_request_tool",
          "parameters": {
            "type": "object",
            "required": [],
            "properties": {}
          },
          "description": "API request tool"
        },
        "messages": [
          {
            "role": "assistant",
            "type": "request-complete",
            "content": "Thanks for your patience! I am happy to let you know that your interview has been successfully generated. I will redirect you to the dashboard now. Thanks for the call!",
            "endCallAfterSpokenEnabled": true
          },
          {
            "type": "request-failed",
            "content": "Oops, looks like something went wrong with your internet! Please try again",
            "endCallAfterSpokenEnabled": true
          }
        ],
        "variableExtractionPlan": {
          "schema": {
            "type": "object",
            "required": [],
            "properties": {}
          },
          "aliases": []
        }
      }
    }
  ],
  "edges": [
    {
      "from": "introduction",
      "to": "apiRequest_1756363549561",
      "condition": {
        "type": "ai",
        "prompt": "if the user provided all the data to be extra"
      }
    }
  ],
  "voice": {
    "model": "eleven_turbo_v2_5",
    "voiceId": "mCQMfsqGDT6IDkEKR20a",
    "provider": "11labs"
  },
  "globalPrompt": ""
}

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};


export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];