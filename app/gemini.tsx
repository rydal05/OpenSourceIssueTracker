import { GoogleGenAI } from "@google/genai";
import * as dotenv  from 'dotenv';
import * as readline from 'readline';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

