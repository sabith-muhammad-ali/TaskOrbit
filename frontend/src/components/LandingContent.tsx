import { Rocket, Users, Target, ArrowRight } from "lucide-react";

const LandingContent = () => {
  return (
    <div
      className="flex items-center justify-center px-4 py-2 overflow-hidden"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="max-w-4xl mx-auto text-center text-black">
        {/* Hero Section */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            Elevate Your Team's
            <span className="block bg-gradient-to-r text-black bg-clip-text">
              Project Management
            </span>
          </h2>

          <p className="text-lg md:text-xl text-black mb-6 max-w-2xl mx-auto leading-relaxed">
            Streamline workflows, boost collaboration, and launch your projects
            into orbit with the ultimate team management platform.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mb-6">
          <button className="group relative inline-flex items-center gap-3 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-400 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-pink-200">
            <div className="p-2 rounded-full bg-blue-600/20 w-fit mx-auto mb-3">
              <Target className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-black">
              Smart Planning
            </h3>
            <p className="text-sm text-black">
              Intelligent task organization with AI-powered insights
            </p>
          </div>

          <div className="p-4 rounded-xl bg-pink-200">
            <div className="p-2 rounded-full bg-purple-600/20 w-fit mx-auto mb-3">
              <Users className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-black">Team Sync</h3>
            <p className="text-sm text-black">
              Real-time collaboration that keeps everyone aligned
            </p>
          </div>

          <div className="p-4 rounded-xl bg-pink-200">
            <div className="p-2 rounded-full bg-pink-600/20 w-fit mx-auto mb-3">
              <Rocket className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-black">
              Launch Ready
            </h3>
            <p className="text-sm text-black">
              Deploy projects faster with streamlined workflows
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-24 h-24 bg-pink-600/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default LandingContent;
