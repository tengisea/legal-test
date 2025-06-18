"use client";

import {
  LiveKitRoom,
  VideoConference,
  useChat,
  useToken,
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
      <div className="flex h-full w-full relative">
        {/* Видео дуудлага */}
        <div className="flex-1 bg-white">
          <div className="h-full w-full p-4">
            <VideoConference className="rounded-2xl border border-neutral-700 shadow-xl overflow-hidden" />
          </div>
        </div>

        {/* Чат */}
        <div className="w-96 bg-white dark:bg-neutral-900 border-l border-gray-300 dark:border-neutral-800 flex flex-col">
          <Chat />
        </div>
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending || !msg.trim()) return;
    send(msg);
    setMsg("");
  };

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
        💬 Consultation Chat
      </h2>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-neutral-700 dark:scrollbar-track-neutral-800">
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
                  "max-w-xs px-4 py-2 rounded-2xl text-sm shadow",
                  isLocal
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-bl-sm"
                )}>
                <span className="block font-medium mb-1 text-xs text-gray-200 dark:text-gray-400">
                  {m.from?.name || "Unknown"}
                </span>
                <span>{m.message}</span>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
