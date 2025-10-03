import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Award, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { achievementsService, Achievement } from "@/services/api";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

const AchievementsAdmin: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const { toast } = useToast();

  // Form field configuration for achievements
  const formFields = [
    {
      name: "title",
      label: "Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter achievement title",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Describe the achievement",
    },
    {
      name: "icon",
      label: "Icon",
      type: "select" as const,
      required: true,
      options: ["Award", "Users", "BookOpen", "Mic", "Star", "Trophy"],
    },
    {
      name: "order",
      label: "Order",
      type: "number" as const,
      required: true,
      placeholder: "1",
    },
    { name: "image", label: "Image", type: "file" as const },
  ];

  // Fetch achievements from API
  const fetchAchievements = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await achievementsService.getAllAchievements();
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      toast({
        title: "Error",
        description: "Failed to load achievements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const handleCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Achievement) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSave = async (formData: FormData) => {
    try {
      if (editingItem) {
        // Update existing achievement
        await achievementsService.updateAchievement(editingItem._id!, formData);
        toast({
          title: "Success",
          description: "Achievement updated successfully",
        });
      } else {
        // Create new achievement
        await achievementsService.createAchievement(formData);
        toast({
          title: "Success",
          description: "Achievement created successfully",
        });
      }

      // Refresh the list
      await fetchAchievements();
    } catch (error) {
      console.error("Error saving achievement:", error);
      toast({
        title: "Error",
        description: "Failed to save achievement",
        variant: "destructive",
      });
      throw error; // Re-throw to prevent form from closing
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      await achievementsService.deleteAchievement(id);
      toast({
        title: "Success",
        description: "Achievement deleted successfully",
      });
      await fetchAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive",
      });
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath?.startsWith("/uploads/")) {
      let backendUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      // If someone set the backend URL without protocol (e.g. api.jvkalyan.com/api), add https:// by default
      if (!/^https?:\/\//i.test(backendUrl)) {
        backendUrl = `https://${backendUrl}`;
      }

      // Remove a single trailing '/api' segment if present (only at the end)
      backendUrl = backendUrl.replace(/\/api\/?$/i, "");

      // Ensure no double slashes when concatenating
      return `${backendUrl}${imagePath}`;
    }
    // This is a frontend public image (fallback)
    return imagePath;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <CardTitle>Achievements Management</CardTitle>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus size={16} />
              Add Achievement
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Loading achievements...
              </span>
            </div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No achievements yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first achievement to get started
              </p>
              <Button onClick={handleCreate} className="gap-2">
                <Plus size={16} />
                Add Achievement
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {achievements.map((achievement, index) => (
                <ItemCard
                  key={achievement._id}
                  item={achievement}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  getImageUrl={getImageUrl}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ItemForm
        item={editingItem}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        fields={formFields}
        title={editingItem ? "Edit Achievement" : "Add Achievement"}
      />
    </div>
  );
};

export default AchievementsAdmin;
