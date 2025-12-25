// src/app/generator/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Lock, Unlock, Eye, EyeOff, Sparkles, Link2, Download, Copy, Trash2, Users, CheckCircle2, AlertCircle, Crown } from "lucide-react";

export default function GeneratorPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [mounted, setMounted] = useState(false);

  const [baseUrl, setBaseUrl] = useState("");
  const [guestList, setGuestList] = useState("");
  const [generatedData, setGeneratedData] = useState<Array<{ name: string; url: string; isVIP: boolean }>>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Daftar kode VIP yang tersedia
  const VIP_CODES = ["VIP001", "VIP002"];
  const [nextVIPCode, setNextVIPCode] = useState("VIP001");

  // Password yang bisa Anda ubah sesuai kebutuhan
  const ADMIN_PASSWORD = "znonymous#1998";

  useEffect(() => {
    setMounted(true);
    const sessionAuth = sessionStorage.getItem("weddingAuth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }

    const savedGuests = localStorage.getItem("weddingGuestList");
    if (savedGuests) setGuestList(savedGuests);

    const currentUrl = window.location.origin;
    const savedUrl = localStorage.getItem("weddingBaseUrl");
    setBaseUrl(savedUrl || currentUrl);
  }, []);

  useEffect(() => {
    if (mounted && baseUrl) {
      localStorage.setItem("weddingBaseUrl", baseUrl);
    }
  }, [baseUrl, mounted]);

  useEffect(() => {
    if (mounted && guestList) {
      localStorage.setItem("weddingGuestList", guestList);
    }
  }, [guestList, mounted]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("weddingAuth", "true");
      setPasswordError("");
    } else {
      setPasswordError("Password salah! Silakan coba lagi.");
      setPasswordInput("");
    }
  };

  const handleLoginKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("weddingAuth");
    setPasswordInput("");
  };

  const generateLinks = () => {
    if (!baseUrl.trim()) {
      alert("Mohon masukkan URL website undangan!");
      return;
    }

    if (!guestList.trim()) {
      alert("Mohon masukkan daftar nama tamu!");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const guests = guestList.split("\n").filter((name) => name.trim() !== "");
      let vipCodeIndex = 0;
      
      const data = guests.map((name) => {
        const trimmedName = name.trim();
        
        // Cek apakah nama diawali dengan [VIP] atau (VIP)
        const isVIP = /^\[VIP\]|\(VIP\)/i.test(trimmedName);
        const cleanName = trimmedName.replace(/^\[VIP\]|\(VIP\)\s*/i, '').trim();
        
        const encodedName = encodeURIComponent(cleanName);
        
        // Jika VIP, tambahkan kode VIP
        let url = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}to=${encodedName}`;
        
        if (isVIP) {
          const vipCode = VIP_CODES[vipCodeIndex % VIP_CODES.length];
          url += `&code=${vipCode}`;
          vipCodeIndex++;
        }
        
        return { name: cleanName, url, isVIP };
      });

      setGeneratedData(data);
      setIsGenerating(false);
    }, 800);
  };

  const copyLink = (index: number) => {
    const url = generatedData[index].url;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const copyAllLinks = () => {
    const allLinks = generatedData
      .map((item) => `${item.isVIP ? '👑 ' : ''}${item.name}: ${item.url}`)
      .join("\n\n");

    navigator.clipboard.writeText(allLinks).then(() => {
      alert("✓ Semua link berhasil di-copy ke clipboard!");
    });
  };

  const downloadAsText = () => {
    const content = generatedData
      .map(
        (item) =>
          `${item.isVIP ? '👑 VIP - ' : ''}Nama: ${item.name}\nLink: ${item.url}\n${"=".repeat(60)}`
      )
      .join("\n\n");

    downloadFile("daftar-undangan.txt", content);
  };

  const downloadAsCSV = () => {
    const header = "Nama,Link Undangan,Status\n";
    const rows = generatedData
      .map((item) => `"${item.name}","${item.url}","${item.isVIP ? 'VIP' : 'Regular'}"`)
      .join("\n");

    downloadFile("daftar-undangan.csv", header + rows);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const clearAll = () => {
    if (confirm("Hapus semua data? Tindakan ini tidak dapat dibatalkan.")) {
      setGuestList("");
      setGeneratedData([]);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mb-4 shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Protected Area</h1>
              <p className="text-purple-200">Masukkan password untuk mengakses generator</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-purple-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError("");
                    }}
                    onKeyPress={handleLoginKeyPress}
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition text-white placeholder-purple-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordError && (
                  <div className="mt-2 flex items-center gap-2 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {passwordError}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Unlock className="w-5 h-5" />
                Masuk
              </button>
            </div>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-purple-200 hover:text-white transition text-sm inline-flex items-center gap-1"
              >
                ← Kembali ke Undangan
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Generator Screen
  const vipCount = generatedData.filter(item => item.isVIP).length;
  const regularCount = generatedData.length - vipCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header with Logout */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Wedding Link Generator
                </h1>
                <p className="text-purple-200 text-sm">Premium Edition with VIP Support</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-lg transition flex items-center gap-2 border border-red-300/20"
            >
              <Lock className="w-4 h-4" />
              Logout
            </button>
          </div>
          <p className="text-purple-100 text-center">
            Buat link undangan personal untuk setiap tamu dengan mudah dan cepat
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 border border-white/20">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-purple-100 mb-2 flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              URL Website Undangan Anda
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://wedding-yourname.vercel.app"
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition text-white placeholder-purple-200"
            />
            <p className="text-xs text-purple-200 mt-2 italic">
              Masukkan URL lengkap website undangan Anda
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-purple-100 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Daftar Nama Tamu (Satu nama per baris)
            </label>
            
            {/* VIP Instructions */}
            <div className="bg-amber-500/10 backdrop-blur-sm border border-amber-400/20 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Crown className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-100">
                  <p className="font-semibold mb-1">💡 Tips untuk Tamu VIP:</p>
                  <p>Tambahkan <span className="bg-amber-500/20 px-2 py-0.5 rounded text-amber-200 font-mono">[VIP]</span> atau <span className="bg-amber-500/20 px-2 py-0.5 rounded text-amber-200 font-mono">(VIP)</span> di awal nama untuk menampilkan gelar akademik</p>
                  <p className="mt-2 text-xs text-amber-200">
                    Contoh: <span className="font-mono">[VIP] Prof. Dr. Ahmad Wijaya</span>
                  </p>
                </div>
              </div>
            </div>

            <textarea
              value={guestList}
              onChange={(e) => setGuestList(e.target.value)}
              placeholder="Bapak Ahmad Wijaya&#10;[VIP] Prof. Dr. Siti Nurhaliza&#10;(VIP) Dr. Budi Santoso, M.Sc&#10;Keluarga Pak Rahman&#10;Teman Kantor - Andi"
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition font-mono text-sm text-white placeholder-purple-200"
              rows={10}
            />
            <p className="text-xs text-purple-200 mt-2 italic">
              Tips: Gunakan format yang jelas. Tambahkan [VIP] untuk tamu yang akan melihat gelar akademik
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generateLinks}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Link
                </>
              )}
            </button>
            <button
              onClick={clearAll}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition border border-white/20 flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Hapus Semua
            </button>
          </div>
        </div>

        {/* Output Section */}
        {generatedData.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-300/20">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-300" />
                  <div className="text-4xl font-bold text-white">
                    {generatedData.length}
                  </div>
                </div>
                <div className="text-sm text-emerald-100 font-semibold">Total Undangan</div>
              </div>

              <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-300/20">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Crown className="w-8 h-8 text-amber-300" />
                  <div className="text-4xl font-bold text-white">
                    {vipCount}
                  </div>
                </div>
                <div className="text-sm text-amber-100 font-semibold">Tamu VIP</div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-300/20">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-blue-300" />
                  <div className="text-4xl font-bold text-white">
                    {regularCount}
                  </div>
                </div>
                <div className="text-sm text-blue-100 font-semibold">Tamu Regular</div>
              </div>
            </div>

            {/* Links List */}
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {generatedData.map((item, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-sm rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 border transition ${
                    item.isVIP 
                      ? 'bg-amber-500/10 border-amber-400/30 hover:bg-amber-500/15' 
                      : 'bg-white/10 border-white/10 hover:bg-white/15'
                  }`}
                >
                  <div className="font-semibold text-white sm:min-w-[200px] flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      item.isVIP 
                        ? 'bg-amber-500/30 text-amber-200' 
                        : 'bg-purple-500/30 text-purple-200'
                    }`}>
                      {item.isVIP ? <Crown className="w-4 h-4" /> : index + 1}
                    </div>
                    {item.name}
                  </div>
                  <div
                    className="flex-1 text-xs text-purple-200 font-mono break-all bg-black/20 rounded-lg p-2"
                    title={item.url}
                  >
                    {item.url}
                  </div>
                  <button
                    onClick={() => copyLink(index)}
                    className={`${
                      copiedIndex === index
                        ? "bg-green-500"
                        : item.isVIP 
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "bg-purple-500 hover:bg-purple-600"
                    } text-white text-sm font-medium py-2 px-4 rounded-lg transition whitespace-nowrap flex items-center gap-2 shadow-lg`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={copyAllLinks}
                className="bg-white/10 hover:bg-white/20 border-2 border-purple-400 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Copy className="w-5 h-5" />
                Copy Semua
              </button>
              <button
                onClick={downloadAsText}
                className="bg-white/10 hover:bg-white/20 border-2 border-purple-400 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download TXT
              </button>
              <button
                onClick={downloadAsCSV}
                className="bg-white/10 hover:bg-white/20 border-2 border-purple-400 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CSV
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-semibold py-3 px-8 rounded-xl transition shadow-lg border border-white/20"
          >
            ← Kembali ke Undangan
          </a>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}