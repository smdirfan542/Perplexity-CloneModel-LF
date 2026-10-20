import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
model: "mistral-code-latest",
temperature: 0,
apiKey:process.env.MISTRAL_API_KEY
});

export async function mistraltestAi(){
  try {
    const response = await model.invoke(
      "wheere is palestine?And waht is happeneing in the palestine right now "
    );
// "How can I realistically earn money in USD as an Indian living in Andhra Pradesh? Give me practical ideas."
    console.log(response.content);
  } catch (error) {
    console.error("Mistral API error:", error.message);
  }
  
}

