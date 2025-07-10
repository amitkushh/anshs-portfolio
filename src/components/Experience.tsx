import { useState } from "react";
import { CompanyModal } from "./CompanyModal";

export const Experience = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const experiences = [
    {
      company: "antiwork",
      role: "Open Source Contributor",
      period: "2024 - Present",
      description: "Worked on converting the antiwork/helper app from multi-tenant to single-tenant mailbox logic. All PRs merged. Received bounty/payment via antiwork's own platform, Flexile.",
      logo: "🛠️",
      link: "https://github.com/antiwork/helper",
      totalPRs: "5+",
      totalBounties: "$1000 (Flexile)",
      contributions: [
        {
          title: "refactor: rename mailboxId to unused_mailboxId",
          description: "Renamed mailboxId to unused_mailboxId for clarity and future-proofing.",
          link: "https://github.com/antiwork/helper/pull/706",
          bounty: "$1000 bounty via Flexile Collective (approved, to be merged)"
        },
        {
          title: "refactor: replace getMailboxById/getMailboxBySlug with getMailbox",
          description: "Simplified mailbox retrieval logic by consolidating functions.",
          link: "https://github.com/antiwork/helper/pull/704"
        },
        {
          title: "Remove mailbox switcher dropdown and mailboxes.list procedure",
          description: "Streamlined the UI by removing unnecessary mailbox switcher and related backend procedure.",
          link: "https://github.com/antiwork/helper/pull/703"
        },
        {
          title: "Fix: status dot colors for open (green), closed (gray), and spam (red) in conversation filter dropdown",
          description: "Improved status dot color coding for better visual clarity in the conversation filter dropdown.",
          link: "https://github.com/antiwork/helper/pull/683"
        },
        {
          title: "fix: modal overlay lighter for better UI/UX",
          description: "Enhanced modal overlay for a lighter, more user-friendly appearance.",
          link: "https://github.com/antiwork/helper/pull/684"
        }
      ]
    },
    {
      company: "TSCircuit",
      role: "Open Source Contributor",
      period: "2024 - Present",
      description: "Contributing to circuit design tools and testing infrastructure",
      logo: "🔌",
      link: "https://tscircuit.com/",
      totalPRs: "100+",
      totalBounties: "$809+",
      contributions: [
        {
          title: "Issue Roulette Game",
          description: "Built a full frontend using React & TypeScript that randomly assigns GitHub issues to contributors.",
          bounty: "$40 bounty",
          link: "https://issue-roulette-red.vercel.app/"
        },
        {
          title: "Contribution Tracker",
          description: "Designed and implemented the frontend for tracking contributor activities.",
          link: "https://contributions.tscircuit.com/"
        },
        {
          title: "Maintenance Tracker",
          description: "Boosted flaky test coverage from 5% to 95%+ using Playwright.",
          bounty: "$20+ bounty",
          link: "https://maintenance.tscircuit.com/"
        },
        {
          title: "Fake Reddit",
          description: "Set up initial fake-backend endpoints and architecture.",
          bounty: "$25+ bounty",
          link: "https://github.com/tscircuit/fake-reddit/pull/3"
        }
      ]
    },
    {
      company: "Mediar-AI",
      role: "Open Source Contributor", 
      period: "2024 - Present",
      description: "Building AI-powered media processing tools",
      logo: "🤖",
      link: "https://www.mediar.ai/",
      totalPRs: "20+",
      totalBounties: "$250+",
      contributions: [
        {
          title: "Highlight Element Debugging Tool",
          description: "Created a visual bounding box feature for Terminator to help devs debug AI workflows.",
          bounty: "$100 bounty",
          link: "https://github.com/mediar-ai/terminator/pull/41"
        },
        {
          title: "Gmail Automation Tool",
          description: "Implements a script to automate Gmail operations like sending mail.",
          bounty: "$100 bounty",
          link: "https://github.com/mediar-ai/terminator/pull/38"
        },
        {
          title: "VLC Media Player Automation",
          description: "Add VLC media player automation example script with support for YouTube streams and local video playback.",
          link: "https://github.com/mediar-ai/terminator/pull/35"
        },
        {
          title: "Homebrew Release for Screenpipe",
          description: "Published the Screenpipe tool to Homebrew with CI/CD integration.",
          bounty: "$50 bounty",
          link: "https://github.com/mediar-ai/screenpipe/pull/623"
        }
      ]
    },
    {
      company: "Algora.io",
      role: "Bounty Hunter",
      period: "2024 - Present", 
      description: "Earned $1099+ in bounties by solving development challenges",
      logo: "💰",
      link: "https://algora.io/Anshgrover23",
      totalPRs: "33+",
      totalBounties: "$1099+",
      contributions: [
        {
          title: "Multiple Bounty Completions",
          description: "Successfully completed various development challenges across different organizations, earning significant bounties for quality contributions.",
          bounty: "$1099+ total earned",
          link: "https://algora.io/Anshgrover23"
        }
      ]
    }
  ];

  const companyData = {
    "antiwork": {
      name: "antiwork",
      logo: "🛠️",
      contributions: experiences[0].contributions
    },
    "TSCircuit": {
      name: "TSCircuit",
      logo: "🔌",
      contributions: experiences[1].contributions
    },
    "Mediar-AI": {
      name: "Mediar-AI", 
      logo: "🤖",
      contributions: experiences[2].contributions
    },
    "Algora.io": {
      name: "Algora.io",
      logo: "💰", 
      contributions: experiences[3].contributions
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Cool places I worked at</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-4 p-6 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer relative ${exp.company === 'antiwork' ? 'border-2 border-purple-500 shadow-[0_0_16px_4px_rgba(168,85,247,0.5)]' : ''}`}
            onClick={() => setSelectedCompany(exp.company)}
          >
            <div className="text-3xl">{exp.logo}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <a 
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-white hover:text-purple-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {exp.company}
                </a>
                <span className="text-gray-400 text-sm">{exp.period}</span>
              </div>
              <p className="text-purple-400 mb-2">{exp.role}</p>
              <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold">PRs Merged:</span>
                  <span className="text-white">{exp.totalPRs}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold">Bounties Earned:</span>
                  <span className="text-white">{exp.totalBounties}</span>
                </div>
              </div>
              <p className="text-blue-400 text-sm mt-2">Click to view featured contributions →</p>
              {/* Language badges bottom right (responsive) */}
              {exp.company === "TSCircuit" && (
                <div className="flex gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row flex-col items-center md:items-end justify-center">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    <svg width="16" height="16" fill="currentColor" className="text-blue-400"><path d="M2 2h12v12H2z" fill="none"/><path d="M4 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-cyan-400/30 shadow-lg text-cyan-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-cyan-700/30">
                    <svg width="16" height="16" fill="currentColor" className="text-cyan-400"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="8" cy="8" r="3" fill="currentColor"/></svg>
                    React.js
                  </span>
                </div>
              )}
              {exp.company === "Mediar-AI" && (
                <div className="flex gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row flex-col items-center md:items-end justify-center">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-orange-400/30 shadow-lg text-orange-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-orange-700/30">
                    <svg width="16" height="16" fill="currentColor" className="text-orange-400"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none"/><text x="8" y="12" textAnchor="middle" fontSize="10" fill="currentColor">🦀</text></svg>
                    Rust
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <CompanyModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={companyData[selectedCompany as keyof typeof companyData]}
        />
      )}
    </section>
  );
};
