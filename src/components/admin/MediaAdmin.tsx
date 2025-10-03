import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Play, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mediaService, Media } from "@/services/api";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

const MediaAdmin: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Media | null>(null);
  const { toast } = useToast();

  // Form field configuration for media
  const formFields = [
    {
      name: "title",
      label: "Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter media title",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Describe the media content",
    },
    {
      name: "type",
      label: "Type",
      type: "select" as const,
      required: true,
      options: [
        "Podcast",
        "Speaking",
        "Content",
        "Panel",
        "Interview",
        "Workshop",
        "Webinar",
        "Video",
      ],
    },
    {
      name: "icon",
      label: "Icon",
      type: "select" as const,
      required: true,
      options: [
        "Play",
        "Mic",
        "Camera",
        "Award",
        "Video",
        "Users",
        "Speaker",
        "Headphones",
      ],
    },
    {
      name: "link",
      label: "Link",
      type: "url" as const,
      required: true,
      placeholder: "https://example.com",
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

  // Fetch media items from API
  const fetchMediaItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mediaService.getAllMedia();
      setMediaItems(data);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast({
        title: "Error",
        description: "Failed to load media items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchMediaItems();
  }, [fetchMediaItems]);

  const handleCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Media) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSave = async (formData: FormData) => {
    try {
      if (editingItem) {
        // Update existing media item
        await mediaService.updateMedia(editingItem._id!, formData);
        toast({
          title: "Success",
          description: "Media item updated successfully",
        });
      } else {
        // Create new media item
        await mediaService.createMedia(formData);
        toast({
          title: "Success",
          description: "Media item created successfully",
        });
      }

      // Refresh the list
      await fetchMediaItems();
    } catch (error) {
      console.error("Error saving media:", error);
      toast({
        title: "Error",
        description: "Failed to save media item",
        variant: "destructive",
      });
      throw error; // Re-throw to prevent form from closing
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) {
      return;
    }

    try {
      await mediaService.deleteMedia(id);
      toast({
        title: "Success",
        description: "Media item deleted successfully",
      });
      await fetchMediaItems();
    } catch (error) {
      console.error("Error deleting media:", error);
      toast({
        title: "Error",
        description: "Failed to delete media item",
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
              <Play className="h-6 w-6 text-primary" />
              <CardTitle>Media Management</CardTitle>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus size={16} />
              Add Media
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Loading media items...
              </span>
            </div>
          ) : mediaItems.length === 0 ? (
            <div className="text-center py-12">
              <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No media items yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first media item to get started
              </p>
              <Button onClick={handleCreate} className="gap-2">
                <Plus size={16} />
                Add Media
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {mediaItems.map((mediaItem, index) => (
                <ItemCard
                  key={mediaItem._id}
                  item={mediaItem}
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
        title={editingItem ? "Edit Media Item" : "Add Media Item"}
      />
    </div>
  );
};

export default MediaAdmin;
