import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Zap, Globe, Rocket, Heart, Trophy, Camera, Music, Menu, X, Filter } from 'lucide-react';

const timelineData = [
  {
    year: 1903,
    title: "Wright Brothers' First Flight",
    description: "Orville and Wilbur Wright achieved the first powered, sustained, and controlled airplane flight at Kitty Hawk, North Carolina.",
    icon: <Rocket className="w-6 h-6" />,
    category: "Technology",
    color: "from-blue-500 to-purple-600",
    impact: "Revolutionary"
  },
  {
    year: 1914,
    title: "World War I Begins",
    description: "The assassination of Archduke Franz Ferdinand sparked a global conflict that would reshape the world order.",
    icon: <Users className="w-6 h-6" />,
    category: "History",
    color: "from-red-500 to-orange-600",
    impact: "Global"
  },
  {
    year: 1929,
    title: "Stock Market Crash",
    description: "Black Tuesday marked the beginning of the Great Depression, the most severe economic downturn in modern history.",
    icon: <Trophy className="w-6 h-6" />,
    category: "Economics",
    color: "from-gray-500 to-gray-700",
    impact: "Devastating"
  },
  {
    year: 1945,
    title: "End of World War II",
    description: "Victory in Europe and the Pacific brought an end to the deadliest conflict in human history.",
    icon: <Heart className="w-6 h-6" />,
    category: "History",
    color: "from-green-500 to-emerald-600",
    impact: "Liberation"
  },
  {
    year: 1969,
    title: "Moon Landing",
    description: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon during Apollo 11 mission.",
    icon: <Rocket className="w-6 h-6" />,
    category: "Space",
    color: "from-indigo-500 to-purple-600",
    impact: "Historic"
  },
  {
    year: 1989,
    title: "Fall of the Berlin Wall",
    description: "The dismantling of the Berlin Wall symbolized the end of the Cold War and German reunification.",
    icon: <Users className="w-6 h-6" />,
    category: "Politics",
    color: "from-yellow-500 to-orange-600",
    impact: "Unifying"
  },
  {
    year: 1991,
    title: "World Wide Web Goes Public",
    description: "Tim Berners-Lee introduced the World Wide Web to the public, revolutionizing global communication.",
    icon: <Globe className="w-6 h-6" />,
    category: "Technology",
    color: "from-cyan-500 to-blue-600",
    impact: "Revolutionary"
  },
  {
    year: 2001,
    title: "September 11 Attacks",
    description: "Terrorist attacks in New York and Washington D.C. changed global security and foreign policy forever.",
    icon: <MapPin className="w-6 h-6" />,
    category: "History",
    color: "from-red-600 to-red-800",
    impact: "Tragic"
  },
  {
    year: 2004,
    title: "Facebook Launched",
    description: "Mark Zuckerberg launched Facebook from his Harvard dorm room, beginning the social media revolution.",
    icon: <Users className="w-6 h-6" />,
    category: "Technology",
    color: "from-blue-600 to-indigo-600",
    impact: "Social"
  },
  {
    year: 2007,
    title: "iPhone Released",
    description: "Apple's iPhone revolutionized mobile technology and changed how we interact with digital devices.",
    icon: <Zap className="w-6 h-6" />,
    category: "Technology",
    color: "from-gray-600 to-gray-800",
    impact: "Revolutionary"
  },
  {
    year: 2020,
    title: "COVID-19 Pandemic",
    description: "A global pandemic reshaped society, work, and human interaction on an unprecedented scale.",
    icon: <Globe className="w-6 h-6" />,
    category: "Health",
    color: "from-purple-600 to-pink-600",
    impact: "Global"
  },
  {
    year: 2024,
    title: "AI Revolution",
    description: "Artificial Intelligence technologies like ChatGPT and advanced AI systems began transforming industries worldwide.",
    icon: <Zap className="w-6 h-6" />,
    category: "Technology",
    color: "from-emerald-500 to-teal-600",
    impact: "Transformative"
  }
];

const categories = ["All", "Technology", "History", "Economics", "Space", "Politics", "Health"];

function App() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredData = selectedCategory === "All" 
    ? timelineData 
    : timelineData.filter(item => item.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="relative py-12 sm:py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent leading-tight">
            Milestones That Made History
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed px-4">
            Journey through the pivotal moments that shaped our world
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
              <div className="text-2xl font-bold text-amber-400">{timelineData.length}</div>
              <div className="text-sm text-slate-400">Events</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
              <div className="text-2xl font-bold text-emerald-400">121</div>
              <div className="text-sm text-slate-400">Years</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
              <div className="text-2xl font-bold text-purple-400">{categories.length - 1}</div>
              <div className="text-sm text-slate-400">Categories</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <div className="sticky top-1 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between md:hidden">
            <span className="text-sm font-medium text-slate-300">Filter by Category</span>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {isFilterOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            </button>
          </div>

          {/* Filter Options */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block mt-3 md:mt-0`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsFilterOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 shadow-lg'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-4 pb-20">
        {/* Timeline Line */}
        <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-yellow-500 to-emerald-500 transform md:-translate-x-px" />

        {/* Timeline Items */}
        <div className="space-y-12 sm:space-y-16">
          {filteredData.map((item, index) => (
            <div
              key={`${item.year}-${index}`}
              className={`timeline-item relative transform transition-all duration-1000 ${
                visibleItems.has(index.toString()) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              data-index={index}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 sm:left-6 md:left-1/2 w-6 h-6 rounded-full transform md:-translate-x-1/2 z-10 bg-gradient-to-br ${item.color} shadow-lg`}>
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
              </div>

              {/* Year Badge */}
              <div className={`absolute left-14 sm:left-16 md:left-1/2 top-0 transform md:-translate-x-1/2 md:-translate-y-8 ${
                index % 2 === 0 ? 'md:translate-x-4' : 'md:-translate-x-4'
              }`}>
                <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  {item.year}
                </div>
              </div>

              {/* Content Card */}
              <div className={`ml-14 sm:ml-16 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16'
              }`}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl border border-slate-700/50 hover:border-amber-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 group">
                  {/* Category Badge & Impact */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`}>
                        {item.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-amber-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.impact === 'Revolutionary' ? 'bg-purple-500/20 text-purple-300' :
                      item.impact === 'Global' ? 'bg-blue-500/20 text-blue-300' :
                      item.impact === 'Historic' ? 'bg-green-500/20 text-green-300' :
                      item.impact === 'Tragic' ? 'bg-red-500/20 text-red-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {item.impact}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {item.description}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full opacity-20 animate-pulse" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-400 mb-2">No events found</h3>
            <p className="text-slate-500">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <Calendar className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-slate-900/80 py-8 sm:py-12 px-4 text-center border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 mb-4">
            Timeline of Historical Milestones • Created with React & Tailwind CSS
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <span>Interactive Design</span>
            <span>•</span>
            <span>Responsive Layout</span>
            <span>•</span>
            <span>Smooth Animations</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;