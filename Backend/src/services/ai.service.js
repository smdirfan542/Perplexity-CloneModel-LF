import { ChatGoogle } from "@langchain/google/node";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tool  } from "@langchain/core/tools";


import {ChatMistralAI} from '@langchain/mistralai'
import * as z from 'zod'
import {createAgent} from 'langchain';
import { searchInternet } from './internet.services.js'



const geminimodel = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralmodel = new ChatMistralAI({
  model:'mistral-code-latest',
  apiKey:process.env.MISTRAL_API_KEY,
  temperature:0
})


// export async function testAi(){
//    const response = await model.invoke('what is ai in one word')
//    console.log(response.text)
// }


const searchInternetTool = tool(searchInternet,
  {
    name:'searchInternet',
    description:'use this tool to seach the internet for relevant information',
    schema:({
      query:z.string().describe('the search query to look up on the internet')
    })
  
  }


)

const agent = createAgent({
  model:geminimodel,
  tools:[searchInternetTool],
})

export async function generateResponse(messages){
  const response = await agent.invoke({messages:messages.map(msg=>{
    if(msg.role=='user'){
      return new HumanMessage(msg.content)
    }else if(msg.role == 'ai'){
      return new AIMessage(msg.content)
    }
  })})

  return response.messages[response.messages.length-1].text;
  
}

export async function generateTitle(message){
  const response = await mistralmodel.invoke([
    new SystemMessage(`You are a title generator.
      Generate a short, clear title based on the user's first message.
      The title should summarize the main topic in 3-6 words.
      Return only the title, without quotes or explanations.`),
      new HumanMessage(message)
  ])
  return response.text
}