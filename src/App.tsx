import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Zap, Globe, Rocket, Heart, Trophy, Camera, Music } from 'lucide-react';

const timelineData = [
  {
    year: 1903,
    title: "Wright Brothers' First Flight",
    description: "Orville and Wilbur Wright achieved the first powered, sustained, and controlled airplane flight at Kitty Hawk, North Carolina.",
    icon: <Rocket className="w-6 h-6" />,
    category: "Technology",
    color: "from-blue-500 to-purple-600"
  },
  {
    year: 1914,
    title: "World War I Begins",
    description: "The assassination of Archduke Franz Ferdinand sparked a global conflict that would reshape the world order.",
    icon: <Users className="w-6 h-6" />,
    category: "History",
    color: "from-red-500 to-orange-600"
  },
  {
    year: 1929,
    title: "Stock Market Crash",
    description: "Black Tuesday marked the beginning of the Great Depression, the most severe economic downturn in modern history.",
    icon: <Trophy className="w-6 h-6" />,
    category: "Economics",
    color: "from-gray-500 to-gray-700"
  },
  {
    year: 1945,
    title: "End of World War II",
    description: "Victory in Europe and the Pacific brought an end to the deadliest conflict in human history.",
    icon: <Heart className="w-6 h-6" />,
    category: "History",
    color: "from-green-500 to-emerald-600"
  },
  {
    year: 1969,
    title: "Moon Landing",
    description: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon during Apollo 11 mission.",
    icon: <Rocket className="w-6 h-6" />,
    category: "Space",
    color: "from-indigo-500 to-purple-600"
  },
  {
    year: 1989,
    title: "Fall of the Berlin Wall",
    description: "The dismantling of the Berlin Wall symbolized the end of the Cold War and German reunification.",
    icon: <Users className="w-6 h-6" />,
    category: "Politics",
    color: "from-yellow-500 to-orange-600"
  },
  {
    year: 1991,
    title: "World Wide Web Goes Public",
    description: "Tim Berners-Lee introduced the World Wide Web to the public, revolutionizing global communication.",
    icon: <Globe className="w-6 h-6" />,
    category: "Technology",
    color: "from-cyan-500 to-blue-600"
  },
  {
    year: 2001,
    title: "September 11 Attacks",
    description: "Terrorist attacks in New York and Washington D.C. changed global security and foreign policy forever.",
    icon: <MapPin className="w-6 h-6" />,
    category: "History",
    color: "from-red-600 to-red-800"
  },
  {
    year: 2004,
    title: "Facebook Launched",
    description: "Mark Zuckerberg launched Facebook from his Harvard dorm room, beginning the social media revolution.",
    icon: <Users className="w-6 h-6" />,
    category: "Technology",
    color: "from-blue-600 to-indigo-600"
  },
  {
    year: 2007,
    title: "iPhone Released",
    description: "Apple's iPhone revolutionized mobile technology and changed how we interact with digital devices.",
    icon: <Zap className="w-6 h-6" />,
    category: "Technology",
    color: "from-gray-600 to-gray-800"
  },
  {
    year: 2020,
    title: "COVID-19 Pandemic",
    description: "A global pandemic reshaped society, work, and human interaction on an unprecedented scale.",
    icon: <Globe className="w-6 h-6" />,
    category: "Health",
    color: "from-purple-600 to-pink-600"
  },
  {
    year: 2024,
    title: "AI Revolution",
    description: "Artificial Intelligence technologies like ChatGPT and advanced AI systems began transforming industries worldwide.",
    icon: <Zap className="w-6 h-6" />,
    category: "Technology",
    color: "from-emerald-500 to-teal-600"
  }
];

function App() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

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
        rootMargin: '0px 0px -100px 0px'
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
  }, []);

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
      <header className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Milestones That Made History
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            Journey through the pivotal moments that shaped our world
          </p>
        </div>
      </header>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-4 pb-20">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-yellow-500 to-emerald-500 transform md:-translate-x-px" />

        {/* Timeline Items */}
        <div className="space-y-16">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`timeline-item relative transform transition-all duration-1000 ${
                visibleItems.has(index.toString()) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              data-index={index}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-2 md:left-1/2 w-6 h-6 rounded-full transform md:-translate-x-1/2 z-10 bg-gradient-to-br ${item.color} shadow-lg`}>
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
              </div>

              {/* Year Badge */}
              <div className={`absolute left-12 md:left-1/2 top-0 transform md:-translate-x-1/2 md:-translate-y-8 ${
                index % 2 === 0 ? 'md:translate-x-4' : 'md:-translate-x-4'
              }`}>
                <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {item.year}
                </div>
              </div>

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16'
              }`}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-700/50 hover:border-amber-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed">
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
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 py-12 px-4 text-center border-t border-slate-700/50">
        <p className="text-slate-400">
          Timeline of Historical Milestones • Created with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;