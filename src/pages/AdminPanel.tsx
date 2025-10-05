import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import AchievementsAdmin from "@/components/admin/AchievementsAdmin";
import ExperiencesAdmin from "@/components/admin/ExperiencesAdmin";
import MediaAdmin from "@/components/admin/MediaAdmin";
import SkillsAdmin from "@/components/admin/SkillsAdmin";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("achievements");

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Portfolio Admin" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-0 h-auto p-1">
              <TabsTrigger
                value="achievements"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-2"
              >
                <span className="hidden sm:inline">Achievements</span>
                <span className="sm:hidden">Achieve</span>
              </TabsTrigger>
              <TabsTrigger
                value="experiences"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-2"
              >
                <span className="hidden sm:inline">Experience</span>
                <span className="sm:hidden">Exp</span>
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-2"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-2"
              >
                Skills
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 sm:mt-8">
              <TabsContent value="achievements" className="mt-0">
                <AchievementsAdmin />
              </TabsContent>

              <TabsContent value="experiences" className="mt-0">
                <ExperiencesAdmin />
              </TabsContent>

              <TabsContent value="media" className="mt-0">
                <MediaAdmin />
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <SkillsAdmin />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
