import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User, Mail, Lock, Shield } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information</p>
        </header>
        
        <div className="max-w-2xl">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-2xl">Account Information</CardTitle>
              <CardDescription>Your personal account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input 
                  value={user?.user_metadata?.username || user?.email?.split('@')[0] || ''} 
                  disabled 
                  className="bg-primary/5 border-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input 
                  value={user?.email || ''} 
                  disabled 
                  className="bg-primary/5 border-primary/20"
                />
              </div>

              {!isChangingPassword ? (
                <Button 
                  onClick={() => setIsChangingPassword(true)}
                  variant="outline"
                  className="w-full bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-primary">
                      <Shield className="h-4 w-4" />
                      Current Password
                    </Label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="bg-primary/5 border-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-primary">
                      <Lock className="h-4 w-4" />
                      New Password
                    </Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="bg-primary/5 border-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-primary">
                      <Lock className="h-4 w-4" />
                      Confirm New Password
                    </Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-primary/5 border-primary/20"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Update Password
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="border-primary/20 hover:bg-primary/5"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile; 