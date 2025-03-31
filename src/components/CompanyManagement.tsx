
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Plus, Edit, Trash, Check } from 'lucide-react';
import { BlurCard } from '@/components/ui/blur-card';
import { useToast } from '@/hooks/use-toast';

// Sample company data
const INITIAL_COMPANIES = [
  {
    id: '1',
    name: 'Pacific Ventures Ltd',
    tin: 'PNG123456789',
    address: '123 Harbor Road, Port Moresby',
    industry: 'Retail',
    isActive: true
  },
  {
    id: '2',
    name: 'Highland Resources Ltd',
    tin: 'PNG987654321',
    address: '45 Mountain View, Lae',
    industry: 'Mining',
    isActive: false
  }
];

const CompanyManagement = () => {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [newCompany, setNewCompany] = useState({
    name: '',
    tin: '',
    address: '',
    industry: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCompany) {
      setEditingCompany({
        ...editingCompany,
        [name]: value
      });
    } else {
      setNewCompany({
        ...newCompany,
        [name]: value
      });
    }
  };

  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.tin) {
      toast({
        title: "Missing information",
        description: "Company name and TIN are required",
        variant: "destructive"
      });
      return;
    }

    const newCompanyObj = {
      id: `company-${Date.now()}`,
      ...newCompany,
      isActive: true
    };
    
    setCompanies([...companies, newCompanyObj]);
    setNewCompany({
      name: '',
      tin: '',
      address: '',
      industry: ''
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Company added",
      description: `${newCompany.name} has been added to your account`
    });
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingCompany.name || !editingCompany.tin) {
      toast({
        title: "Missing information",
        description: "Company name and TIN are required",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCompanies = companies.map(company => 
      company.id === editingCompany.id ? editingCompany : company
    );
    
    setCompanies(updatedCompanies);
    setEditingCompany(null);
    setIsDialogOpen(false);
    
    toast({
      title: "Company updated",
      description: `${editingCompany.name} has been updated`
    });
  };

  const handleSetActive = (id) => {
    const updatedCompanies = companies.map(company => ({
      ...company,
      isActive: company.id === id
    }));
    
    setCompanies(updatedCompanies);
    
    const activatedCompany = companies.find(company => company.id === id);
    
    toast({
      title: "Active company changed",
      description: `${activatedCompany.name} is now your active company`
    });
  };

  const handleDelete = (id) => {
    const companyToDelete = companies.find(company => company.id === id);
    const isActive = companyToDelete.isActive;
    
    if (isActive && companies.length > 1) {
      toast({
        title: "Cannot delete",
        description: "You cannot delete your active company. Please set another company as active first.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCompanies = companies.filter(company => company.id !== id);
    setCompanies(updatedCompanies);
    
    toast({
      title: "Company deleted",
      description: `${companyToDelete.name} has been removed from your account`
    });
  };

  const handleDialogClose = () => {
    setEditingCompany(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Company Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-png-red hover:bg-png-red/90">
              <Plus className="mr-2 h-4 w-4" /> Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? "Edit Company" : "Add New Company"}
              </DialogTitle>
              <DialogDescription>
                {editingCompany 
                  ? "Update your company information" 
                  : "Add a new company to manage its tax information separately"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Company Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editingCompany ? editingCompany.name : newCompany.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tin" className="text-right">
                  TIN Number
                </Label>
                <Input
                  id="tin"
                  name="tin"
                  value={editingCompany ? editingCompany.tin : newCompany.tin}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={editingCompany ? editingCompany.address : newCompany.address}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="industry" className="text-right">
                  Industry
                </Label>
                <Input
                  id="industry"
                  name="industry"
                  value={editingCompany ? editingCompany.industry : newCompany.industry}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button 
                className="bg-png-red hover:bg-png-red/90"
                onClick={editingCompany ? handleUpdate : handleAddCompany}
              >
                {editingCompany ? "Update Company" : "Add Company"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {companies.map((company) => (
          <BlurCard key={company.id} className={company.isActive ? "border-png-red" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-png-red" />
                  <CardTitle>{company.name}</CardTitle>
                </div>
                {company.isActive && (
                  <div className="bg-png-red/10 text-png-red px-2 py-1 rounded text-xs font-medium flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Active
                  </div>
                )}
              </div>
              <CardDescription>TIN: {company.tin}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-muted-foreground">Address:</span> {company.address}
                </div>
                <div>
                  <span className="text-muted-foreground">Industry:</span> {company.industry}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {!company.isActive && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetActive(company.id)}
                >
                  Set as Active
                </Button>
              )}
              {company.isActive && <div />}
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleEditClick(company)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(company.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </BlurCard>
        ))}
      </div>
    </div>
  );
};

export default CompanyManagement;
