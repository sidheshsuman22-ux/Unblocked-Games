/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent } from 'react';
import { 
  Search, 
  Gamepad2, 
  Globe, 
  Shield, 
  ExternalLink, 
  X, 
  Maximize2, 
  GraduationCap,
  LayoutGrid,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GAMES } from './data/games';
import { Game } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'games' | 'proxy'>('games');

  // Filter games based on search
  const filteredGames = useMemo(() => {
    return GAMES.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleProxySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!proxyUrl) return;
    
    const formattedUrl = proxyUrl.startsWith('http') ? proxyUrl : `https://${proxyUrl}`;
    // Using our internal proxy endpoint
    window.open(`/api/proxy?url=${encodeURIComponent(formattedUrl)}`, '_blank');
  };

  const playRoblox = () => {
    window.open('https://now.gg/apps/roblox/9166/roblox.html', '_blank');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isStealthMode ? 'bg-white text-gray-800' : 'bg-bg text-gray-100'}`}>
      {/* Cloaked Header */}
      <header className={`sticky top-0 z-40 border-b transition-colors ${isStealthMode ? 'bg-white border-gray-200' : 'bg-surface/90 backdrop-blur-md border-border'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isStealthMode ? 'bg-green-600' : 'bg-accent/20'}`}>
              <GraduationCap className={isStealthMode ? 'text-white' : 'text-accent'} size={24} />
            </div>
            <div>
              <h1 className={`font-bold text-xl tracking-tight ${isStealthMode ? 'text-green-700' : 'text-white'}`}>
                {isStealthMode ? 'IXL Learning' : 'IXL Math & ELA'}
              </h1>
              {!isStealthMode && <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">Unblocked Edition</span>}
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('games')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === 'games' ? (isStealthMode ? 'text-green-600' : 'text-accent') : 'opacity-60 hover:opacity-100'}`}
            >
              <LayoutGrid size={18} />
              Learning Games
            </button>
            <button 
              onClick={() => setActiveTab('proxy')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === 'proxy' ? (isStealthMode ? 'text-green-600' : 'text-accent') : 'opacity-60 hover:opacity-100'}`}
            >
              <Globe size={18} />
              Web Explorer
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsStealthMode(!isStealthMode)}
              className={`p-2 rounded-full transition-all ${isStealthMode ? 'bg-gray-100 text-gray-600' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
              title="Toggle Stealth Mode"
            >
              <Shield size={20} />
            </button>
            <button className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isStealthMode ? 'bg-green-600 text-white' : 'bg-accent text-black hover:bg-accent/80'}`}>
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className={`text-4xl font-black mb-2 ${isStealthMode ? 'text-gray-900' : 'text-white'}`}>
                {activeTab === 'games' ? 'Curated Game Library' : 'Universal Web Proxy'}
              </h2>
              <p className="opacity-60 max-w-xl">
                {activeTab === 'games' 
                  ? 'Access over 600 unblocked educational and entertainment titles directly in your browser.' 
                  : 'Bypass filters and access any website securely using our integrated web proxy technology.'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={playRoblox}
                className="flex items-center gap-2 bg-[#00A2FF] hover:bg-[#0082CC] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
              >
                <Play size={20} fill="currentColor" />
                Play Roblox
              </button>
            </div>
          </div>

          {/* Search & Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`relative group ${isStealthMode ? 'text-gray-900' : ''}`}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
              <input 
                type="text"
                placeholder="Search 600+ games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all ${
                  isStealthMode 
                    ? 'bg-gray-50 border-gray-200 focus:border-green-500' 
                    : 'bg-surface border-border focus:border-accent focus:ring-4 focus:ring-accent/10'
                }`}
              />
            </div>

            <form onSubmit={handleProxySubmit} className="relative group">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
              <input 
                type="text"
                placeholder="Enter URL to unblock (e.g. google.com)..."
                value={proxyUrl}
                onChange={(e) => setProxyUrl(e.target.value)}
                className={`w-full pl-12 pr-32 py-4 rounded-2xl border outline-none transition-all ${
                  isStealthMode 
                    ? 'bg-gray-50 border-gray-200 focus:border-green-500' 
                    : 'bg-surface border-border focus:border-accent focus:ring-4 focus:ring-accent/10'
                }`}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-accent/80 transition-colors"
              >
                Unblock
              </button>
            </form>
          </div>
        </section>

        {/* Game Grid */}
        {activeTab === 'games' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-50">
                {filteredGames.length} Results Found
              </h3>
              <div className="flex gap-2">
                {['All', 'Action', 'Arcade', 'Shooter', 'Sports'].map(cat => (
                  <button 
                    key={cat}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      isStealthMode 
                        ? 'border-gray-200 hover:bg-gray-100' 
                        : 'border-border hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame(game)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all ${
                      isStealthMode 
                        ? 'bg-white border-gray-200 shadow-sm' 
                        : 'bg-surface border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5'
                    }`}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-black">
                          <Play size={24} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold truncate group-hover:text-accent transition-colors">{game.title}</h4>
                      <p className="text-xs opacity-50 mt-1">{game.category}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-20 opacity-50">
                <Gamepad2 size={48} className="mx-auto mb-4 opacity-20" />
                <p>No games found matching your search.</p>
              </div>
            )}
          </section>
        )}

        {/* Proxy Info Section */}
        {activeTab === 'proxy' && (
          <section className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-3xl border ${isStealthMode ? 'bg-gray-50 border-gray-200' : 'bg-surface border-border'}`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500 mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Browsing</h3>
              <p className="opacity-60 text-sm leading-relaxed">
                Our proxy encrypts your traffic and masks your IP address, allowing you to browse any site without being tracked or blocked by network filters.
              </p>
            </div>
            <div className={`p-8 rounded-3xl border ${isStealthMode ? 'bg-gray-50 border-gray-200' : 'bg-surface border-border'}`}>
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Access</h3>
              <p className="opacity-60 text-sm leading-relaxed">
                Access content from around the world. Perfect for unblocking social media, video streaming, and gaming platforms like Roblox.
              </p>
            </div>
            <div className={`p-8 rounded-3xl border ${isStealthMode ? 'bg-gray-50 border-gray-200' : 'bg-surface border-border'}`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-500 mb-6">
                <Maximize2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Screen</h3>
              <p className="opacity-60 text-sm leading-relaxed">
                Enjoy a distraction-free experience with our full-screen mode. Perfect for immersive gaming and focused browsing.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl h-full max-h-[90vh] bg-surface rounded-3xl overflow-hidden border border-border flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-surface/50">
                <div className="flex items-center gap-4">
                  <img src={selectedGame.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold">{selectedGame.title}</h3>
                    <p className="text-xs opacity-50">{selectedGame.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Full Screen">
                    <Maximize2 size={20} />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Open in New Tab">
                    <ExternalLink size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black relative">
                <iframe 
                  src={`/api/proxy?url=${encodeURIComponent(selectedGame.url)}`}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={selectedGame.title}
                />
              </div>
              <div className="p-4 bg-surface/50 flex items-center justify-between text-xs opacity-50">
                <p>Playing on IXL Math & ELA Unblocked</p>
                <p>Powered by Unblocked Games CDN</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className={`mt-20 border-t py-12 transition-colors ${isStealthMode ? 'bg-gray-50 border-gray-200' : 'bg-surface/50 border-border'}`}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className={isStealthMode ? 'text-green-600' : 'text-white'} size={24} />
              <span className="font-bold text-lg">IXL Math & ELA</span>
            </div>
            <p className="text-sm opacity-50 max-w-sm leading-relaxed">
              The ultimate destination for unblocked learning and entertainment. Providing students with safe access to the tools they need to succeed and unwind.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2 text-sm opacity-60">
              <li><a href="#" className="hover:text-accent transition-colors">Curriculum</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Inspiration</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Membership</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm opacity-60">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-xs opacity-30">
          &copy; 2026 IXL Learning. All rights reserved. Not affiliated with IXL Learning, Inc.
        </div>
      </footer>
    </div>
  );
}
