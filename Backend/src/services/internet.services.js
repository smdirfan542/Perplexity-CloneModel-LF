import {tavily} from '@tavily/core'
const tavilyService = tavily({apiKey:process.env.TAVILY_API_KEY})

export  const searchInternet = async ({query}) => {
    const result =  await tavilyService.search(query,{
        maxResults:5,
        searchDepth:"basic",
    })
    return JSON.stringify(result)
}