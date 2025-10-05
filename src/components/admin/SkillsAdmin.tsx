import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { skillsService, SkillCategory } from "@/services/api";
import AdminHeader from "./AdminHeader";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

interface SkillFormData {
  _id?: string;
  title: string;
  icon: string;
  color: "primary" | "secondary";
  skills: string;
  order: string;
}

const SkillsAdmin: React.FC = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillFormData | null>(
    null
  );
  const { toast } = useToast();

  // Form field configuration for skills
  const skillFormFields = [
    {
      name: "title",
      label: "Category Title",
      type: "text" as const,
      placeholder: "e.g., AI & Data Science",
      required: true,
    },
    {
      name: "icon",
      label: "Icon",
      type: "select" as const,
      options: ["Brain", "Code2", "Users", "Megaphone", "Database", "Cloud"],
      required: true,
    },
    {
      name: "color",
      label: "Color Theme",
      type: "select" as const,
      options: ["primary", "secondary"],
      required: true,
    },
    {
      name: "skills",
      label: "Skills (comma-separated)",
      type: "textarea" as const,
      placeholder: "e.g., Python, Machine Learning, Data Analysis",
      required: true,
    },
    {
      name: "order",
      label: "Display Order",
      type: "number" as const,
      placeholder: "0",
      required: true,
    },
  ];

  const fetchSkillCategories = useCallback(async () => {
    try {
      setLoading(true);
      const categories = await skillsService.getAllSkillCategories();
      if (Array.isArray(categories)) {
        setSkillCategories(categories);
      } else {
        console.warn("Unexpected skills response shape:", categories);
        setSkillCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch skill categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch skill categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSkillCategories();
  }, [fetchSkillCategories]);

  const handleCreate = async (formData: SkillFormData) => {
    try {
      // Convert skills string to array
      // Support comma, semicolon or newline separated skills entered by admin
      const skillsArray = formData.skills
        .split(/[,;\n]+/)
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill.length > 0);

      const categoryData = {
        ...formData,
        skills: skillsArray,
        order: parseInt(formData.order) || 0,
      };

      const newCategory = await skillsService.createSkillCategory(categoryData);
      setSkillCategories([...skillCategories, newCategory]);
      setIsFormOpen(false);

      toast({
        title: "Success",
        description: "Skill category created successfully",
      });
    } catch (error) {
      console.error("Failed to create skill category:", error);
      toast({
        title: "Error",
        description: "Failed to create skill category",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (formData: SkillFormData) => {
    if (!editingCategory?._id) return;

    try {
      // Convert skills string to array
      // Support comma, semicolon or newline separated skills entered by admin
      const skillsArray = formData.skills
        .split(/[,;\n]+/)
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill.length > 0);

      const categoryData = {
        ...formData,
        skills: skillsArray,
        order: parseInt(formData.order) || 0,
      };

      const updatedCategory = await skillsService.updateSkillCategory(
        editingCategory._id!,
        categoryData
      );

      setSkillCategories(
        skillCategories.map((category) =>
          category._id === editingCategory._id! ? updatedCategory : category
        )
      );

      setIsFormOpen(false);
      setEditingCategory(null);

      toast({
        title: "Success",
        description: "Skill category updated successfully",
      });
    } catch (error) {
      console.error("Failed to update skill category:", error);
      toast({
        title: "Error",
        description: "Failed to update skill category",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: SkillCategory) => {
    // Convert skills array back to comma-separated string for the form
    const categoryWithStringSkills: SkillFormData = {
      _id: category._id,
      title: category.title,
      icon: category.icon,
      color: category.color,
      skills: category.skills.join(", "),
      order: category.order.toString(),
    };
    // Debug: log the payload that will be passed to ItemForm (open browser console to inspect)
    console.debug(
      "SkillsAdmin: opening edit form with:",
      categoryWithStringSkills
    );
    setEditingCategory(categoryWithStringSkills);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await skillsService.deleteSkillCategory(id);
      setSkillCategories(
        skillCategories.filter((category) => category._id !== id)
      );

      toast({
        title: "Success",
        description: "Skill category deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete skill category:", error);
      toast({
        title: "Error",
        description: "Failed to delete skill category",
        variant: "destructive",
      });
    }
  };

  const handleFormSave = async (formData: FormData) => {
    // Extract form values
    const title = formData.get("title") as string;
    const icon = formData.get("icon") as string;
    const color = formData.get("color") as "primary" | "secondary";
    const skills = formData.get("skills") as string;
    const order = formData.get("order") as string;

    // Convert to our SkillFormData format
    const skillFormData: SkillFormData = {
      _id: editingCategory?._id,
      title,
      icon,
      color,
      skills,
      order,
    };

    if (editingCategory) {
      await handleUpdate(skillFormData);
    } else {
      await handleCreate(skillFormData);
    }
  };

  const getFormItem = () => {
    if (!editingCategory) return null;

    return {
      _id: editingCategory._id,
      title: editingCategory.title,
      description: `Skills: ${editingCategory.skills}`,
      // Provide the raw comma/newline-separated skills string so ItemForm can prefill the textarea
      skills: editingCategory.skills,
      icon: editingCategory.icon,
      type: editingCategory.color,
      order: parseInt(editingCategory.order),
    };
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Skills Management</h2>
          <p className="text-muted-foreground">
            Manage skill categories and individual skills (
            {skillCategories.length} categories)
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchSkillCategories} size="sm" variant="outline">
            <RefreshCw size={16} />
          </Button>
          <Button onClick={handleAddNew} size="sm" className="gap-2">
            <Plus size={16} />
            Add Skill Category
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {skillCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No skill categories found
              </p>
              <Button onClick={handleAddNew} size="sm" className="gap-2">
                <Plus size={16} />
                Add Skill Category
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {skillCategories.map((category, index) => {
                const handleEditCategory = () => handleEdit(category);

                return (
                  <ItemCard
                    key={category._id}
                    item={{
                      _id: category._id,
                      title: category.title,
                      description: `${category.skills.length} skills | Order: ${category.order} | Color: ${category.color}`,
                      icon: category.icon,
                      type: category.color,
                    }}
                    index={index}
                    onEdit={handleEditCategory}
                    onDelete={handleDelete}
                    getImageUrl={() => ""}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <ItemForm
        item={getFormItem()}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleFormSave}
        fields={skillFormFields}
        title={editingCategory ? "Edit Skill Category" : "Add Skill Category"}
      />
    </div>
  );
};

export default SkillsAdmin;
