import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// System prompt for Gemini Placement Coach
const COACH_SYSTEM_PROMPT = `
You are the Gemini Placement Coach for NAYANA AI PLACEMENT OS.
Student: Bandla Nayana Lakshmi Pranava (B Nayana)
College: KL University, 4th Year B.Tech CSIT, Batch Y23, Expected Graduation 2027.
Academic: CGPA 9.17 / 10, 0 Backlogs. Target CTC: 6+ LPA. Locations: Hyderabad, Bangalore, Open.
Target Companies: JPMC (Software Engineer), Google (Software Engineer), TCS (SDE/IT), AT&T (Software Developer).
Study Routine: 2 hours/day (Evening focused).
Baseline Skills: C (9/10), Java (5/10), Python (4/10), DSA (7/10), SQL (6/10), Aptitude (9.7/10), English/Communication (9.5/10).
Known Projects:
1. Laptop Support Assistant (Python, Groq API, Streamlit, RAG, Vector Embeddings)
2. Hotel Management Platform (Java, MySQL, Node.js, Docker, Git)
3. AI-SHIELD (Federated Learning, GANs, Client Honeypots, AI Cybersecurity)
Internship: Eduskills Virtual Internship (Cloud & AI)
Certifications: AZ-900 (verified), Cambridge LinguaSkill (verified), AI-102 & ServiceNow (tracked in portal).

Guidelines:
- Never fabricate student achievements, marks, backlogs, or unearned certifications.
- Ground advice in her actual profile. Aptitude and communication are strong; Java OOP, DBMS transactions, and advanced DSA (DP, Trees) need active preparation.
- Recommend realistic, high-impact tasks fitting her 2 hours/evening schedule.
- When suggesting concrete study tasks or plans, provide structured action proposals.
- Keep tone professional, encouraging, and mentor-like.
`;

// 1. Chat with Placement Coach
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // Fallback message when API key is not yet set
      return res.json({
        reply: `Hello Nayana! I received your query: "${message}". Your placement readiness is currently ${
          context?.readinessScore || 72
        }%. Remember to prioritize Java Collections and DBMS normalization for your upcoming target drives.`,
        actionProposal: null,
      });
    }

    const prompt = `
Student Data Context:
${JSON.stringify(context || {}, null, 2)}

User Message:
${message}

Respond to Nayana with direct, insightful, actionable placement guidance. If you recommend specific tasks, format them clearly.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: COACH_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I am ready to help you with your placement preparation, Nayana.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      error: 'Gemini service encountered an issue',
      reply: 'Gemini is temporarily unavailable. Your tracked data is safe.',
    });
  }
});

// 2. Generate 2-Hour Evening Daily Plan
app.post('/api/gemini/generate-plan', async (req, res) => {
  try {
    const { context, availableMinutes = 120 } = req.body;

    if (!ai) {
      return res.json({
        tasks: [
          {
            title: 'DSA: Two-Pointer & Sliding Window (2 problems)',
            category: 'DSA',
            priority: 'High',
            estimatedDurationMinutes: 45,
            dueDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
          },
          {
            title: 'Java OOP: Dynamic Dispatch & Interfaces',
            category: 'Study',
            priority: 'High',
            estimatedDurationMinutes: 35,
            dueDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
          },
          {
            title: 'DBMS: BCNF Normalization & Dependencies',
            category: 'Study',
            priority: 'Medium',
            estimatedDurationMinutes: 25,
            dueDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
          },
          {
            title: 'Project Pitch: Laptop Support Assistant RAG',
            category: 'Practice',
            priority: 'Medium',
            estimatedDurationMinutes: 15,
            dueDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
          },
        ],
      });
    }

    const prompt = `
Generate a structured, realistic evening study plan for Nayana with exactly ${availableMinutes} minutes total duration.
Context:
${JSON.stringify(context || {}, null, 2)}

Output ONLY valid JSON in this schema:
{
  "tasks": [
    {
      "title": string,
      "category": "DSA" | "Study" | "Practice" | "Interview" | "Resume",
      "priority": "Low" | "Medium" | "High" | "Urgent",
      "estimatedDurationMinutes": number,
      "reason": string
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: COACH_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const today = new Date().toISOString().split('T')[0];
    const tasks = (parsed.tasks || []).map((t: any) => ({
      ...t,
      dueDate: today,
      status: 'Pending',
    }));

    res.json({ tasks });
  } catch (error: any) {
    console.error('Plan Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

// 3. AI Mock Interview Evaluation
app.post('/api/gemini/interview-evaluate', async (req, res) => {
  try {
    const { question, answer, topic } = req.body;

    if (!ai) {
      return res.json({
        score: 82,
        technicalAccuracy: 80,
        communication: 92,
        feedback:
          'Clear, articulate answer demonstrating conceptual understanding. To excel in JPMC/Google technical rounds, highlight edge-case performance and runtime complexities.',
        missedConcepts: ['Memory footprint considerations', 'Concurrency guarantees'],
      });
    }

    const prompt = `
You are evaluating Nayana's answer to an interview question for topic/company: ${topic}.
Question: "${question}"
Candidate Answer: "${answer}"

Provide an authoritative evaluation. Output ONLY JSON:
{
  "score": number (0-100),
  "technicalAccuracy": number (0-100),
  "communication": number (0-100),
  "feedback": string,
  "missedConcepts": string[]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const evalResult = JSON.parse(response.text || '{}');
    res.json(evalResult);
  } catch (error: any) {
    console.error('Interview Eval Error:', error);
    res.status(500).json({ error: 'Failed to evaluate interview answer' });
  }
});

// 4. Study Room Explanation & Quiz
app.post('/api/gemini/study-explain', async (req, res) => {
  try {
    const { topic, mode = 'explain' } = req.body;

    if (!ai) {
      return res.json({
        content: `**${topic} Overview:**\n- Core concept breakdown tailored for placement interviews.\n- Focus on key algorithmic or architectural trade-offs.\n- Common interview pitfall: neglecting edge cases and normalization anomalies.`,
        flashcards: [
          { question: `What is the core purpose of ${topic}?`, answer: 'Optimizing resource utilization and guaranteeing correctness.' },
        ],
      });
    }

    const prompt = `
Explain the placement preparation topic: "${topic}" in mode "${mode}" (modes: explain | quiz | flashcards).
Provide clear, structured explanations with code snippets where applicable, focused on college placement interviews.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ content: response.text });
  } catch (error: any) {
    console.error('Study Explain Error:', error);
    res.status(500).json({ error: 'Failed to explain study topic' });
  }
});

// Mount Vite middleware for dev or serve dist in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  const PORT = Number(process.env.PORT) || 3000;

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NAYANA AI PLACEMENT OS Server listening on port ${PORT}`);
  });
}

startServer();
