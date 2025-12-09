// src/app/components/Guestbook.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { inter, greatVibes } from "../fonts";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("guestbook-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setMessages((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadMessages() {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("id", { ascending: false });

    setMessages(data || []);
    setLoading(false);
  }

  async function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Nama dan pesan wajib diisi");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from("guestbook")
      .insert([{ name, message }])
      .select();
    setSubmitting(false);

    if (error) {
      toast.error("Failed send a message");
    } else {
      toast.success("Message successfully sent");
      if (data && data.length > 0) {
        setMessages((prev) => [data[0], ...prev]);
      }
      setMessage("");
      setName("");
    }
  }

  return (
    <section className="py-4 px-2 w-full flex flex-col items-center">
      {/* Title */}
      <p
        className={`${greatVibes.className} text-2xl md:text-3xl text-[#b89452] mb-8 tracking-wide`}
      >
        Send your special messages
      </p>

      {/* FORM */}
      <form
        onSubmit={submitMessage}
        className="w-full max-w-2xl space-y-3"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${greatVibes.className} w-full px-4 py-3 rounded-lg 
          bg-white border border-[#d4af37]/40 text-black
          focus:outline-none focus:border-[#d4af37] shadow-sm`}
        />

        <textarea
          placeholder="Please, wrote your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${greatVibes.className} w-full px-4 py-3 rounded-lg 
          bg-white border border-[#d4af37]/40 text-black h-32 resize-none
          focus:outline-none focus:border-[#d4af37] shadow-sm`}
        ></textarea>

        <button
          disabled={submitting}
          className={`${greatVibes.className} w-full py-3 rounded-lg bg-[#d4af37] 
          text-black font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50`}
        >
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>

      {/* GARIS PEMBATAS */}
      <div className="w-full max-w-2xl my-6 border-t border-[#d4af37]/40"></div>

      {/* LIST (SCROLLABLE) */}
      <div
        className="w-full max-w-2xl space-y-4 max-h-[420px] overflow-y-auto 
        pr-2"
      >
        {loading ? (
          <div className={`${greatVibes.className} text-black/50 text-center font-semibold shadow-lg hover:shadow-xl`}>Loading data...</div>
        ) : messages.length === 0 ? (
          <div className={`${greatVibes.className} text-black/50 text-center font-semibold shadow-lg hover:shadow-xl`}>No data yet.</div>
        ) : (
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 backdrop-blur-lg border border-[#d4af37]/40 
                rounded-xl p-5 shadow-md"
              >
                <div className={`${greatVibes.className} text-[#4a3f35] text-lg font-semibold`}>
                  {msg.name}
                </div>
                <div className={`${greatVibes.className} text-[#4a3f35] text-sm mt-2 leading-relaxed font-semibold`}>
                  {msg.message}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
