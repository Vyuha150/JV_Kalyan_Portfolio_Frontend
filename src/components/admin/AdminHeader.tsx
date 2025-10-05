import React from "react";
import { motion } from "framer-motion";
import { Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

interface AdminHeaderProps {
  title?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Admin Dashboard",
}) => {
  const handleLogout = () => {
    // Call backend signout to clear HttpOnly cookie then redirect to login
    (async () => {
      await signOut();
      window.location.href = "/admin/login";
    })();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border-b border-border mb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground font-display">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Manage your portfolio content
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 sm:gap-2 hidden sm:inline-flex"
            >
              <Settings size={16} />
              <span className="hidden md:inline">Settings</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 sm:gap-2 hidden sm:inline-flex"
            >
              <User size={16} />
              <span className="hidden md:inline">Profile</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-1 sm:gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
