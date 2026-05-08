import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { BookOpen, FolderGit2, X, Plus } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth();
  
  // Skills State
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [updatingSkills, setUpdatingSkills] = useState(false);
  
  // Projects State
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [addingProject, setAddingProject] = useState(false);
  
  // Status Messages
  const [skillsMsg, setSkillsMsg] = useState({ text: '', type: '' });
  const [projectMsg, setProjectMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    if (user) {
      setSkills(user.skills || []);
      setProjects(user.projects || []);
    }
  }, [user]);

  // Handle Skills Update
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) {
        setNewSkill('');
        return;
    }
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSaveSkills = async () => {
    setUpdatingSkills(true);
    setSkillsMsg({ text: '', type: '' });
    
    try {
      const res = await api.post('/users/skills', { skills });
      setUser({ ...user, skills: res.data.skills });
      setSkillsMsg({ text: 'Skills saved successfully!', type: 'success' });
      setTimeout(() => setSkillsMsg({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error(error);
      setSkillsMsg({ text: 'Failed to save skills', type: 'error' });
    } finally {
      setUpdatingSkills(false);
    }
  };

  // Handle Projects Update
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;
    
    setAddingProject(true);
    setProjectMsg({ text: '', type: '' });

    try {
      const res = await api.post('/users/projects', {
        title: newProject.title.trim(),
        description: newProject.description.trim()
      });
      setUser({ ...user, projects: res.data.projects });
      setProjects(res.data.projects);
      setNewProject({ title: '', description: '' });
      setProjectMsg({ text: 'Project added successfully!', type: 'success' });
      setTimeout(() => setProjectMsg({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error(error);
      setProjectMsg({ text: 'Failed to add project', type: 'error' });
    } finally {
      setAddingProject(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Profile</h1>
        <p className="text-gray-600 mt-1">Update your skills and portfolio projects</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Skills Section */}
        <Card>
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Your Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 flex items-center gap-1"
                >
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="text-gray-500 text-sm italic">No skills added yet.</span>
              )}
            </div>

            <div className="flex gap-3">
              <Input
                placeholder="E.g., React, Python, Data Analysis"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                className="flex-grow"
              />
              <Button type="button" onClick={handleAddSkill} variant="secondary">
                Add
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
              <span className={`text-sm ${skillsMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {skillsMsg.text}
              </span>
              <Button onClick={handleSaveSkills} isLoading={updatingSkills}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-indigo-600" />
              Your Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            
            {/* Existing Projects List */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Current Portfolio</h3>
              {projects.length > 0 ? (
                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-sm transition-all">
                      <h4 className="font-bold text-gray-900">{project.title}</h4>
                      <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{project.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  You haven't showcased any projects yet. Add one below!
                </div>
              )}
            </div>

            {/* Add New Project Form */}
            <div className="bg-white rounded-xl border border-indigo-100 overflow-hidden">
              <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex items-center gap-2">
                <Plus className="h-4 w-4 text-indigo-600" />
                <h3 className="font-semibold text-indigo-900 text-sm">Add New Project</h3>
              </div>
              <form onSubmit={handleAddProject} className="p-4 space-y-4">
                <Input
                  label="Project Title"
                  placeholder="E.g., E-commerce Website"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] resize-y"
                    placeholder="Describe your role, technologies used, and outcomes..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className={`text-sm ${projectMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {projectMsg.text}
                  </span>
                  <Button type="submit" isLoading={addingProject} className="bg-indigo-600 hover:bg-indigo-700">
                    Add Project
                  </Button>
                </div>
              </form>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Profile;
