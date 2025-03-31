
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardComponent from "@/components/Dashboard";
import DocumentUpload from "@/components/DocumentUpload";
import AIAssistant from "@/components/AIAssistant";
import TaxHistory from "@/components/TaxHistory";
import CompanyManagement from "@/components/CompanyManagement";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Upload,
  BarChart,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  User,
  Building,
  History,
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

type Tab = "dashboard" | "documents" | "assistant" | "reports" | "settings" | "tax-history" | "companies" | "profile";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardComponent />;
      case "documents":
        return <DocumentUpload />;
      case "assistant":
        return <AIAssistant />;
      case "tax-history":
        return <TaxHistory />;
      case "companies":
        return <CompanyManagement />;
      case "reports":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-foreground/70">
            <FileText className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg mb-4">Reports feature coming soon</p>
            <Button onClick={() => handleNavigate('/reports')}>
              Go to Reports Page
            </Button>
          </div>
        );
      case "profile":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-foreground/70">
            <User className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg mb-4">View and edit your profile</p>
            <Button onClick={() => handleNavigate('/profile')}>
              Go to Profile Page
            </Button>
          </div>
        );
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-foreground/70">
            <Settings className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">Settings feature coming soon</p>
          </div>
        );
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      {/* Mobile Header */}
      {isMobile && (
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 ml-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-png-red">
                <span className="text-white font-bold text-xs">W</span>
              </div>
              <span className="font-bold">
                Wantok<span className="text-png-red">.ai</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-foreground/70" onClick={() => handleNavigate('/help')}>
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-foreground/70">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isMobile
              ? `fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-64 border-r border-border"
          } bg-background flex flex-col h-screen`}
        >
          {isMobile && (
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-png-red">
                  <span className="text-white font-bold">W</span>
                </div>
                <span className="text-xl font-bold">
                  Wantok<span className="text-png-red">.ai</span>
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          <div className={`flex flex-col flex-1 ${isMobile ? "p-2" : "p-4"}`}>
            {!isMobile && (
              <div className="mb-8 flex items-center gap-2 pl-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-png-red">
                  <span className="text-white font-bold">W</span>
                </div>
                <span className="text-xl font-bold">
                  Wantok<span className="text-png-red">.ai</span>
                </span>
              </div>
            )}

            <nav className="space-y-1 flex-1">
              <NavItem
                icon={<Home className="h-5 w-5" />}
                label="Dashboard"
                active={activeTab === "dashboard"}
                onClick={() => handleTabChange("dashboard")}
              />
              <NavItem
                icon={<Upload className="h-5 w-5" />}
                label="Documents"
                active={activeTab === "documents"}
                onClick={() => handleTabChange("documents")}
              />
              <NavItem
                icon={<MessageSquare className="h-5 w-5" />}
                label="AI Assistant"
                active={activeTab === "assistant"}
                onClick={() => handleTabChange("assistant")}
              />
              <NavItem
                icon={<History className="h-5 w-5" />}
                label="Tax History"
                active={activeTab === "tax-history"}
                onClick={() => handleTabChange("tax-history")}
              />
              <NavItem
                icon={<BarChart className="h-5 w-5" />}
                label="Reports"
                active={activeTab === "reports"}
                onClick={() => handleTabChange("reports")}
              />
              <NavItem
                icon={<Building className="h-5 w-5" />}
                label="Companies"
                active={activeTab === "companies"}
                onClick={() => handleTabChange("companies")}
              />
              <NavItem
                icon={<User className="h-5 w-5" />}
                label="My Profile"
                active={activeTab === "profile"}
                onClick={() => handleTabChange("profile")}
              />
              <NavItem
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
                active={activeTab === "settings"}
                onClick={() => handleTabChange("settings")}
              />
            </nav>

            <div className="mt-auto">
              <BlurCard className="p-3 mb-3" intensity="light">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-medium">JD</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">John Doe</p>
                    <p className="text-xs text-foreground/70">Pacific Ventures Ltd</p>
                  </div>
                </div>
              </BlurCard>
              
              <div className="flex items-center justify-between px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/70 text-xs"
                  onClick={() => handleNavigate('/help')}
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Help
                </Button>
                <Link to="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground/70 text-xs"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 max-w-6xl">
            {!isMobile && (
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">
                    {activeTab === "dashboard" && "Dashboard"}
                    {activeTab === "documents" && "Document Upload"}
                    {activeTab === "assistant" && "AI Tax Assistant"}
                    {activeTab === "reports" && "Reports"}
                    {activeTab === "tax-history" && "Tax Calculation History"}
                    {activeTab === "companies" && "Company Management"}
                    {activeTab === "profile" && "My Profile"}
                    {activeTab === "settings" && "Settings"}
                  </h1>
                  <p className="text-foreground/70">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-foreground/70"
                    onClick={() => handleNavigate('/help')}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help
                  </Button>
                  <Link to="/">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-foreground/70"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {isMobile && (
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold">
                    {activeTab === "dashboard" && "Dashboard"}
                    {activeTab === "documents" && "Document Upload"}
                    {activeTab === "assistant" && "AI Tax Assistant"}
                    {activeTab === "reports" && "Reports"}
                    {activeTab === "tax-history" && "Tax Calculation History"}
                    {activeTab === "companies" && "Company Management"}
                    {activeTab === "profile" && "My Profile"}
                    {activeTab === "settings" && "Settings"}
                  </h1>
                  <Link to="/">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  </Link>
                </div>
                <p className="text-foreground/70 text-sm">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}

            {getTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      active
        ? "bg-png-red text-white"
        : "text-foreground/70 hover:bg-secondary/50"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Dashboard;
