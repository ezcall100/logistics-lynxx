
import { FC } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const { user, signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <header className="bg-card border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">TMS Portal</h2>
          {userRole && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {userRole.replace('_', ' ').toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <button
            onClick={handleSignOut}
            className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
