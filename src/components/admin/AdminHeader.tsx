import React from "react";
import { motion } from "framer-motion";
import { Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Admin Dashboard",
}) => {
  const handleLogout = () => {
    // Navigate to the index/home page
    window.location.href = "/";
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border-b border-border mb-8"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-display">
              {title}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolio content
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings size={16} />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <User size={16} />
              Profile
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
