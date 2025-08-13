
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const roles = [
  { value: 'super_admin' as UserRole, label: 'Super Admin' },
  { value: 'carrier_admin' as UserRole, label: 'Carrier Admin' },
  { value: 'freight_broker_admin' as UserRole, label: 'Freight Broker Admin' },
  { value: 'shipper_admin' as UserRole, label: 'Shipper Admin' },
  { value: 'carrier_driver' as UserRole, label: 'Driver' },
  { value: 'owner_operator' as UserRole, label: 'Owner Operator' },
];

export const useLoginForm = () => {
  const { signIn, setSelectedRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRoleLocal] = useState<UserRole>('super_admin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('useLoginForm: Attempting to sign in with:', email);
      const result = await signIn(email, password);
      
      if (!result.error) {
        // Set the selected role
        setSelectedRole(selectedRole);
        
        const roleData = roles.find(r => r.value === selectedRole);
        toast({
          title: "Login successful",
          description: `Welcome to LogiPortal as ${roleData?.label}`,
        });
        
        console.log('useLoginForm: Login successful, navigating to dashboard');
        navigate('/dashboard', { replace: true });
      } else {
        console.error('useLoginForm: Login error:', result.error);
        setError(result.error || 'Invalid email or password');
        toast({
          title: "Login failed",
          description: result.error || 'Invalid email or password',
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('useLoginForm: Login exception:', err);
      setError('An error occurred during login. Please try again.');
      toast({
        title: "Login error",
        description: 'An error occurred during login. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Please contact your administrator to reset your password.",
    });
  };

  return {
    email,
    password,
    selectedRole,
    isLoading,
    error,
    setEmail,
    setPassword,
    setSelectedRoleLocal,
    handleSubmit,
    handleForgotPassword,
  };
};
