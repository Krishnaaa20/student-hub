import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { BookOpen, FolderGit2, User, PlusCircle } from 'lucide-react';
import Button from '../components/Button';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const skillsCount = user.skills?.length || 0;
  const projectsCount = user.projects?.length || 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
        </div>
        <Link to="/profile">
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Manage Profile
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Your Role</p>
              <p className="text-2xl font-bold capitalize mt-1">{user.role}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <User className="h-8 w-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Skills Added</p>
              <p className="text-2xl font-bold mt-1">{skillsCount}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Projects</p>
              <p className="text-2xl font-bold mt-1">{projectsCount}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <FolderGit2 className="h-8 w-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
            <CardTitle>Your Skills</CardTitle>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="text-blue-600">
                <PlusCircle className="h-4 w-4 mr-1" /> Add
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-6">
            {skillsCount > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>You haven't added any skills yet.</p>
                <Link to="/profile" className="text-blue-600 hover:underline mt-2 inline-block text-sm">
                  Add your first skill
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Projects Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
            <CardTitle>Recent Projects</CardTitle>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="text-blue-600">
                <PlusCircle className="h-4 w-4 mr-1" /> Add
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-6">
            {projectsCount > 0 ? (
              <div className="space-y-4">
                {user.projects.slice(-3).reverse().map((project, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h4 className="font-semibold text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>You haven't added any projects yet.</p>
                <Link to="/profile" className="text-blue-600 hover:underline mt-2 inline-block text-sm">
                  Add your first project
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
