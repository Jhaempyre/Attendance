import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, UserPlus, Users, BookOpen, Calendar, BarChart, PlusCircle, Clipboard, Settings } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    { name: 'Home', icon: <Home size={24} />, path: '/home' },
    { name: 'Add Branch', icon: <UserPlus size={24} />, path: '/add-branch' },
    { name: 'Add Subject', icon: <BookOpen size={24} />, path: '/add-subject' },
    { name: 'Add Student', icon: <Users size={24} />, path: '/add-student' },
    { name: 'Take Attendance', icon: <Calendar size={24} />, path: '/take-attendance' },
    { name: 'View Attendance', icon: <BarChart size={24} />, path: '/view-attendance' },
    { name: 'Add Teacher', icon: <PlusCircle size={24} />, path: '/add-teacher' },
    { name: 'Assignments', icon: <Clipboard size={24} />, path: '/assignments' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings' },
    // Add more features as needed to fill the 2x6 grid
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">College Management System</h1>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => navigate(feature.path)}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <div className="text-blue-500 mb-2">{feature.icon}</div>
            <span className="text-sm font-medium text-gray-800">{feature.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;