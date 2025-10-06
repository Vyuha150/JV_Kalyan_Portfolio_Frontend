import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Briefcase, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { experiencesService, Experience } from "@/services/api";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

const ExperiencesAdmin: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const { toast } = useToast();

  // Form field configuration for experiences
  const formFields = [
    {
      name: "year",
      label: "Year",
      type: "text" as const,
      required: true,
      placeholder: "2023 - Present",
    },
    {
      name: "role",
      label: "Role",
      type: "text" as const,
      required: true,
      placeholder: "CEO & Founder",
    },
    {
      name: "organization",
      label: "Organization",
      type: "text" as const,
      required: true,
      placeholder: "Company Name",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Describe your role and achievements",
    },
    {
      name: "icon",
      label: "Icon",
      type: "select" as const,
      required: true,
      options: [
        "Briefcase",
        "Building",
        "Users",
        "Award",
        "Lightbulb",
        "GraduationCap",
        "Target",
        "Star",
      ],
    },
    {
      name: "order",
      label: "Order",
      type: "number" as const,
      required: true,
      placeholder: "1",
    },
    {
      name: "isActive",
      label: "Active",
      type: "select" as const,
      required: true,
      options: ["true", "false"],
    },
    { name: "image", label: "Image", type: "file" as const, required: true },
  ];

  // Fetch experiences from API
  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const data = await experiencesService.getAllExperiences();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast({
        title: "Error",
        description: "Failed to load experiences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Experience) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSave = async (formData: FormData) => {
    try {
      if (editingItem) {
        await experiencesService.updateExperience(editingItem._id!, formData);
        toast({
          title: "Success",
          description: "Experience updated successfully",
        });
      } else {
        const result = await experiencesService.createExperience(formData);
        toast({
          title: "Success",
          description: "Experience created successfully",
        });
      }

      await fetchExperiences();
    } catch (error) {
      console.error("Error saving experience:", error);
      toast({
        title: "Error",
        description: "Failed to save experience",
        variant: "destructive",
      });
      throw error; // Re-throw to prevent form from closing
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    try {
      await experiencesService.deleteExperience(id);
      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });
      await fetchExperiences();
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath?.startsWith("/uploads/")) {
      // This is a backend uploaded image
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
    return imagePath;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <CardTitle>Experience Management</CardTitle>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus size={16} />
              Add Experience
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Loading experiences...
              </span>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No experiences yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first experience entry to get started
              </p>
              <Button onClick={handleCreate} className="gap-2">
                <Plus size={16} />
                Add Experience
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {experiences.map((experience, index) => (
                <ItemCard
                  key={experience._id}
                  item={experience}
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
        title={editingItem ? "Edit Experience" : "Add Experience"}
      />
    </div>
  );
};

export default ExperiencesAdmin;
