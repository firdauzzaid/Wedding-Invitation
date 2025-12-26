// src/app/components/BankAccount.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Copy, CheckCircle2, Crown, CreditCard } from "lucide-react";
import { useInvitation } from "../layout";

const playfairStyle = {
  fontFamily: "Playfair Display, serif",
};

interface BankAccountData {
  bank: string;
  accountNumber: string;
  accountName: string;
  logo?: string;
}

export default function BankAccount() {
  const { isVIP } = useInvitation();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Data rekening mempelai pria
  const groomAccounts: BankAccountData[] = [
    {
      bank: "Bank Mandiri",
      accountNumber: "1340027307825",
      accountName: "Zhafron Firdaus",
    },
  ];

  // Data rekening mempelai wanita
  const brideAccounts: BankAccountData[] = [
    {
      bank: "Bank BSI Syariah",
      accountNumber: "7220418407",
      accountName: "Annisa Zahra",
    },
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  // Jika bukan VIP, jangan tampilkan komponen
  if (!isVIP) {
    return null;
  }

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* VIP Badge */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Gift className="w-3 h-3 text-[#d4af37]" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-[#4a3f35] mb-3"
            style={playfairStyle}
          >
            Amplop Digital
          </h2>
          <p className="text-sm md:text-base text-[#86755a] max-w-2xl mx-auto leading-relaxed">
            Doa restu Anda adalah hadiah terindah bagi kami. Namun jika memberi
            adalah ungkapan tanda kasih, Anda dapat menggunakan rekening
            berikut:
          </p>
        </motion.div>

        {/* Bank Accounts Grid */}
        <div className="flex flex-col gap-6">
          {/* Mempelai Pria */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-rose-50 to-indigo-50 rounded-2xl p-6 border-2 border-gold-200/50 shadow-xl">
              {/* Header Card */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200/30">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-[#4a3f35]"
                    style={playfairStyle}
                  >
                    Mempelai Pria
                  </h3>
                  <p className="text-xs text-[#86755a]">Zhafron Firdaus</p>
                </div>
              </div>

              {/* Bank List */}
              <div className="space-y-4">
                {groomAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-blue-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xs">
                            {account.bank
                              .split(" ")[1]
                              ?.substring(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>
                        <span className="font-bold text-[#4a3f35] text-sm">
                          {account.bank}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-[#86755a] mb-1">
                        Nomor Rekening
                      </p>
                      <p className="text-xl font-bold text-[#4a3f35] tracking-wider font-mono">
                        {account.accountNumber}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#86755a]">Atas Nama</p>
                        <p className="text-sm font-semibold text-[#4a3f35]">
                          {account.accountName}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(account.accountNumber, index)
                        }
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${
                          copiedIndex === index
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                      >
                        {copiedIndex === index ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Salin
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mempelai Wanita */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200/50 shadow-xl">
              {/* Header Card */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-pink-200/30">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-[#4a3f35]"
                    style={playfairStyle}
                  >
                    Mempelai Wanita
                  </h3>
                  <p className="text-xs text-[#86755a]">Annisa Zahra</p>
                </div>
              </div>

              {/* Bank List */}
              <div className="space-y-4">
                {brideAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-pink-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                          <span className="text-pink-600 font-bold text-xs">
                            {account.bank
                              .split(" ")[1]
                              ?.substring(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>
                        <span className="font-bold text-[#4a3f35] text-sm">
                          {account.bank}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-[#86755a] mb-1">
                        Nomor Rekening
                      </p>
                      <p className="text-xl font-bold text-[#4a3f35] tracking-wider font-mono">
                        {account.accountNumber}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#86755a]">Atas Nama</p>
                        <p className="text-sm font-semibold text-[#4a3f35]">
                          {account.accountName}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(account.accountNumber, index + 10)
                        }
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${
                          copiedIndex === index + 10
                            ? "bg-green-500 text-white"
                            : "bg-pink-500 hover:bg-pink-600 text-white"
                        }`}
                      >
                        {copiedIndex === index + 10 ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Salin
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-3 border-2 border-amber-200/50 max-w-2xl mx-auto">
            <p className="text-sm text-[#86755a] italic leading-relaxed">
              💝{" "}
              <strong>Terima kasih atas perhatian dan kehadiran Anda.</strong>
              <br />
              Doa dan restu Anda adalah hadiah yang paling berharga bagi kami.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
