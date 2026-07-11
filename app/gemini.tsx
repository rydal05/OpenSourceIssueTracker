import { GoogleGenAI } from "@google/genai";
import * as dotenv  from 'dotenv';
import * as readline from 'readline';
import { Repository } from "./page";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function startChatbot(repoList: Repository[]) {
    const serializedInventory = JSON.stringify(repoList, null, 2);

    const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
            systemInstruction: `
            You are a chatbot on a site that is purpose built for helping newly intermediate level developers find projects of interest to work on.
            
            CRUCIAL RULES:
            1. Only recommend repositories from the catalogue provided
            2. Try as best as possible to match the projected difficulty of the project to the user's listed experience (if they do)
            3. Explain why you chose the repositories you chose based on the request made.
            `,
        },
    });

    const userQuery = "I am a developer who wants to work in python. What are some simple open source projects I can contribute to?";
    console.log(`User: ${userQuery}\n`);

    const response = await chat.sendMessage({ message: userQuery });
    console.log(`AI: ${response.text}`);
}