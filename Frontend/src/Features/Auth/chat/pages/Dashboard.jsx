import { useEffect } from 'react'
import { useChat } from '../hooks/UseChat'
import { useState } from 'react'
import {useDispatch, useSelector } from 'react-redux' 
import { setCurrentchatid } from '../chat.slice'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

const Dashboard = () => {
  // const chat =useChat()
  const { InitSocketClient ,HandlesendMessage,LoadChats,LoadMessages} = useChat()
  const dispatch = useDispatch();
  const [inputmsg,setInputmsg] = useState('')

  const chats = useSelector((state)=>state.chat.chats )
  const currentchatid = useSelector((state)=>state.chat.currentchatid)

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = inputmsg.trim()
    if (!trimmedMessage) {
      return
    }

    HandlesendMessage({ message: trimmedMessage, chatId: currentchatid })
   setInputmsg('');
  }
  
  
  
  useEffect(() => {
    InitSocketClient(),
    LoadChats()
  }, [])

 

  return (
    <main className="grid h-dvh min-h-[32rem] grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-3 bg-neutral-900 p-3 text-white md:grid-cols-[16rem_minmax(0,1fr)] md:grid-rows-1 md:gap-4 md:p-4">
      <aside className="flex max-h-40 flex-col gap-3 overflow-y-auto rounded-xl border border-neutral-700 bg-neutral-800 p-4 md:max-h-none">
        <h1 className="text-2xl font-semibold">Perplexity</h1>
        <nav className="grid gap-2">
          {Object.values(chats).map((chat) => (
            <button
              className="flex min-h-11 w-full items-center rounded-lg border border-neutral-700 px-3 py-2 text-left font-medium transition hover:bg-neutral-700"
              key={chat.id}
              onClick={()=>{dispatch(setCurrentchatid(chat.id)); LoadMessages(chat.id)}}
              type="button"
            >
            <span className="line-clamp-2 break-words">
              {chat.title}
          </span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800">
        <div className="grid content-start gap-3 overflow-y-auto p-4 md:p-6">
       {(chats[currentchatid]?.messages ?? []).map((message, index) => (
          <div
            className={`flex w-full ${
              message.role === "user" ? "justify-end" : "justify-start mb-2"
            }`}
            key={`${currentchatid}-${index}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 md:max-w-[70%] ${
                message.role === "user"
                  ? "rounded-br-sm bg-blue-600"
                  : "rounded-bl-sm border border-neutral-700 bg-neutral-900"
              }`}
            >
              <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="mb-3 mt-4 text-2xl font-bold" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="mb-2 mt-4 text-xl font-bold" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="mb-2 mt-3 text-lg font-semibold" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="mb-3 leading-7 last:mb-0" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="mb-3 list-disc space-y-1 pl-6" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="mb-3 list-decimal space-y-1 pl-6" {...props} />
          ),
          li: ({ ...props }) => <li className="pl-1" {...props} />,
          strong: ({ ...props }) => (
            <strong className="font-bold" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-sky-400 underline"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <pre
              className="my-3 max-w-full overflow-x-auto rounded-lg border border-neutral-700 bg-[#161b22] p-4 text-sm"
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => (
            <code
              className={`rounded text-sm ${
                className ? '' : 'bg-neutral-700 px-1.5 py-0.5'
              } ${className || ''}`}
              {...props}
            >
              {children}
            </code>
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-3 border-l-4 border-neutral-500 pl-4 text-neutral-300"
              {...props}
            />
          ),
          table: ({ ...props }) => (
            <div className="my-3 max-w-full overflow-x-auto">
              <table
                className="w-full border-collapse text-left text-sm"
                {...props}
              />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              className="border border-neutral-600 bg-neutral-700 px-3 py-2 font-semibold"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="border border-neutral-700 px-3 py-2"
              {...props}
            />
          ),
          hr: () => <hr className="my-4 border-neutral-700" />,
        }}
      >
        {String(message.content ?? '')}
      </ReactMarkdown>
            </div>
          </div>
          ))}
        </div>

        <div className="border-t border-neutral-700 p-3 md:p-4">
          <form onSubmit={handleSubmitMessage} className=" mx-auto flex w-full max-w-4xl items-center gap-3 rounded-2xl border border-neutral-600 bg-neutral-900 px-4 py-3 focus-within:border-blue-500">
           <input
              className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-neutral-400"
              type="text"
              name="searchinput"
              placeholder="Type here to search"
              value={inputmsg}
              onChange={(e) => setInputmsg(e.target.value)}
            />
           <button
            className="rounded-xl bg-blue-600 px-4 py-2 font-medium transition hover:bg-blue-500"
            type="submit"
          >
            Send
          </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Dashboard