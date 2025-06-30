export const About = () => {
  return (
    <section id="about" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">🧐 About Me</h2>
      <div className="space-y-6">
        <div className="text-gray-300 leading-relaxed">
          <p>
            I'm <strong className="text-white">Ansh Grover</strong> — a self-driven developer who turns curiosity into code. With over <strong className="text-white">199+ merged PRs</strong> and <strong className="text-white">$1099+ in bounties</strong> earned via <a href="https://algora.io/Anshgrover23" className="text-purple-400 hover:text-purple-300 transition-colors underline">Algora.io</a>, I specialize in full-stack development, testing infrastructure, and developer tooling.
          </p>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-3">🏆 Key Achievements</h4>
          <ul className="text-gray-300 space-y-2">
            <li>• Maintainer-level contributions to <strong className="text-white">TSCircuit</strong> and <strong className="text-white">Mediar-AI</strong></li>
            <li>• <span className="text-blue-400 font-bold">Receiving <strong className="text-white">$200+ per month</strong> in <a href="https://github.com/sponsors/Anshgrover23" className="underline hover:text-blue-300 transition-colors">GitHub Sponsorships</a></span> — fueling my open source work!</li>
            <li>• Built tools used by thousands of developers</li>
          </ul>
          <div className="mt-4">
            <a href="https://github.com/sponsors/Anshgrover23" target="_blank" rel="noopener noreferrer" className="inline-block bg-pink-600 hover:bg-pink-500 text-white font-semibold px-4 py-2 rounded transition-colors shadow-lg">
              Sponsor me on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
