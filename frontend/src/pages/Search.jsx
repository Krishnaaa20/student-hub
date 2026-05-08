import { useState, useEffect } from 'react';
import { Search as SearchIcon, Users, BookOpen, GraduationCap } from 'lucide-react';
import api from '../services/api';
import { Card, CardContent } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await api.get(`/users/search?skill=${encodeURIComponent(query.trim())}`);
      setResults(res.data);
      setSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto pt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Students</h1>
        <p className="text-gray-600 mb-8">
          Find peers for your next project, hackathon, or study group by searching for specific skills.
        </p>

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-grow">
            <Input
              placeholder="Search by skill (e.g., React, Machine Learning, Design)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={SearchIcon}
              className="h-12 text-base shadow-sm"
            />
          </div>
          <Button type="submit" size="lg" isLoading={loading} className="h-12 px-8">
            Search
          </Button>
        </form>
      </div>

      {/* Results Section */}
      {searched && (
        <div className="pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Found {results.length} {results.length === 1 ? 'student' : 'students'} with "{query}"
          </h2>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((student) => (
                <Card key={student._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <GraduationCap className="h-4 w-4" />
                          Student
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {student.skills.slice(0, 5).map((skill, idx) => (
                          <span 
                            key={idx} 
                            className={`text-xs px-2 py-1 rounded-md font-medium ${
                              skill.toLowerCase() === query.toLowerCase()
                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                        {student.skills.length > 5 && (
                          <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded-md border border-gray-200">
                            +{student.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No students found</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                We couldn't find anyone with the exact skill "{query}". Try searching for broader terms or related technologies.
              </p>
            </div>
          )}
        </div>
      )}
      
      {!searched && !loading && (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto opacity-60">
          {['JavaScript', 'Python', 'React', 'Node.js', 'UI/UX Design', 'Data Science', 'Machine Learning', 'Java'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                // Trigger form submission equivalent logic here
              }}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
