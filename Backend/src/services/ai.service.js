import { ChatGoogle } from "@langchain/google/node";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import {ChatMistralAI} from '@langchain/mistralai'


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

export async function generateResponse(messages){
  const response = await geminimodel.invoke(messages.map(msg=>{
    if(msg.role=='user'){
      return new HumanMessage(msg.content)
    }else if(msg.role == 'ai'){
      return new AIMessage(msg.content)
    }
  }))

  return response.text
  
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