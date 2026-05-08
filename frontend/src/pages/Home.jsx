import { Link } from 'react-router-dom';
import { ArrowRight, Code, Users, Briefcase, Zap } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center pt-16 pb-8 md:pt-24 md:pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-8">
          <Zap className="h-4 w-4" />
          Welcome to the new Student Hub
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Showcase your skills.<br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Connect with peers.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10">
          The premier platform for students and faculty to share projects, discover talent, and collaborate on the next big thing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-200">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-200">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                  Explore Students
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to stand out</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build your portfolio, find collaborators, and take your academic career to the next level.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Share Your Skills</h3>
            <p className="text-gray-600">
              Highlight your technical stack, soft skills, and areas of expertise to make your profile easily discoverable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors border border-gray-100 hover:border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Showcase Projects</h3>
            <p className="text-gray-600">
              Add your best projects with descriptions and links to demonstrate your practical experience to peers and faculty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-colors border border-gray-100 hover:border-purple-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Connect & Collaborate</h3>
            <p className="text-gray-600">
              Search for students by specific skills and form the perfect team for your next hackathon or startup idea.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
