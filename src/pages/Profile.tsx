
import React, { useState } from 'react';
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Building, 
  Shield, 
  Bell, 
  CreditCard,
  Lock
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@pacificventures.com",
    phone: "+675 123 4567",
    companyName: "Pacific Ventures Ltd",
    tinNumber: "PNG123456789",
    address: "123 Harbor Road, Port Moresby"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate saving profile
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully."
      });
    }, 1000);
  };

  const handleChangePassword = () => {
    setLoading(true);
    // Simulate password change
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully."
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>
        <User size={48} className="text-primary opacity-80" />
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
      
        <TabsContent value="personal">
          <BlurCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={userData.name} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="bg-png-red hover:bg-png-red/90"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </BlurCard>
        </TabsContent>
        
        <TabsContent value="company">
          <BlurCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    name="companyName"
                    value={userData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tinNumber">TIN Number</Label>
                  <Input 
                    id="tinNumber" 
                    name="tinNumber"
                    value={userData.tinNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="bg-png-red hover:bg-png-red/90"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </BlurCard>
        </TabsContent>

        <TabsContent value="security">
          <BlurCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button 
                    className="mt-4 bg-png-red hover:bg-png-red/90"
                    onClick={handleChangePassword}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Change Password'}
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </BlurCard>
        </TabsContent>
        
        <TabsContent value="notifications">
          <BlurCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tax Filing Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming tax filing deadlines
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Document Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Notifications when documents are processed by our system
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">System Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about new features and updates
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Newsletter</h3>
                    <p className="text-sm text-muted-foreground">
                      Monthly newsletter with tax tips and updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </BlurCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
