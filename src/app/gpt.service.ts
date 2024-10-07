import { Injectable } from '@angular/core';
import OpenAI from 'openai';

const openai = new OpenAI({
  //apiKey: process.env["OPENAI_API_KEY"] ,
   apiKey: "",
   dangerouslyAllowBrowser: true
 });


@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor() { }

  async getMessage(){
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": "What is the capital of Brazil?"}],
    });
    return chatCompletion.choices[0].message;
  }

}
