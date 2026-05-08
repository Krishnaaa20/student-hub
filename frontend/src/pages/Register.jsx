import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // API call to register
      const res = await api.post('/auth/register', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        role: formData.role
      });
      
      // Some backends return token on register, some require separate login.
      // Assuming it returns token or we just redirect to login
      if (res.data.token || res.data) {
         // Auto login if possible, else redirect
         const token = res.data.token || res.data;
         // Try to login directly if backend returns token
         if (typeof token === 'string') {
             login(res.data.user || {}, token);
             navigate('/dashboard');
             return;
         }
      }
      
      // If no token returned, just redirect to login with a success message state
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <UserCircle className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <p className="mt-2 text-sm text-gray-600">
            Join the platform to share skills and projects
          </p>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`py-2 px-4 rounded-md border text-sm font-medium transition-colors ${
                    formData.role === 'student'
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'faculty' })}
                  className={`py-2 px-4 rounded-md border text-sm font-medium transition-colors ${
                    formData.role === 'faculty'
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Faculty
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              isLoading={loading}
            >
              Sign up
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center pb-8">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
