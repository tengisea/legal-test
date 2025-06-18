"use client";

import {
  LiveKitRoom,
  VideoConference,
  useChat,
  useLocalParticipant,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function LiveRoom({ token }: { token: string }) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      data-lk-theme="default"
      style={{ height: "100vh" }}>
      <div className="flex h-full w-full bg-gray-100 dark:bg-neutral-900">
        {/* Видео хэсэг */}
        <div className="flex-1 p-4">
          <VideoConference className="rounded-2xl border border-neutral-300 dark:border-neutral-700 shadow-xl h-full w-full" />
        </div>

        {/* Чат хэсэг */}
        <aside className="w-[400px] bg-white dark:bg-neutral-800 border-l border-gray-300 dark:border-neutral-700 flex flex-col">
          <Chat />
        </aside>
      </div>
    </LiveKitRoom>
  );
}

function Chat() {
  const { chatMessages, send, isSending } = useChat();
  const [msg, setMsg] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim() || isSending) return;
    send(msg);
    setMsg("");
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Чатын гарчиг */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        💬 Consultation Chat
      </h2>

      {/* Чат мессежүүд */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-neutral-700">
        {chatMessages.map((m, i) => {
          const isLocal = m.from?.identity === localParticipant.identity;
          return (
            <div
              key={i}
              className={clsx(
                "flex",
                isLocal ? "justify-end" : "justify-start"
              )}>
              <div
                className={clsx(
                  "max-w-[80%] px-4 py-2 rounded-xl text-sm shadow-md",
                  isLocal
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                )}>
                <p className="text-[11px] mb-1 font-semibold text-gray-100 dark:text-gray-300">
                  {m.from?.name || "Anonymous"}
                </p>
                <p>{m.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Илгээх хэсэг */}
      <form onSubmit={handleSend} className="flex items-center gap-2 mt-auto">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 rounded-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={!msg.trim() || isSending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-full transition disabled:opacity-50">
          Send
        </button>
      </form>
    </div>
  );
}
