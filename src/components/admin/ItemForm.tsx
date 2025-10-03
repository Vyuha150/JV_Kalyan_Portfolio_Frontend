import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, X, Upload, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItemFormProps {
  item?: {
    _id?: string;
    id?: string;
    title?: string;
    description: string;
    image?: string;
    type?: string;
    icon?: string;
    year?: string;
    role?: string;
    organization?: string;
    link?: string;
    order?: number;
    isActive?: boolean;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "textarea" | "select" | "number" | "url" | "file";
    required?: boolean;
    options?: string[];
    placeholder?: string;
  }>;
  title: string;
}

const ItemForm: React.FC<ItemFormProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
  fields,
  title,
}) => {
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >(() => {
    const initialData: Record<string, string | number | boolean> = {};
    fields.forEach((field) => {
      if (item && field.name in item) {
        const value = (item as Record<string, unknown>)[field.name];
        if (field.type === "number") {
          initialData[field.name] = typeof value === "number" ? value : 0;
        } else if (typeof value === "boolean") {
          initialData[field.name] = value;
        } else {
          initialData[field.name] = String(value || "");
        }
      } else {
        initialData[field.name] = field.type === "number" ? 0 : "";
      }
    });
    return initialData;
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    item?.image || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    name: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitFormData = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          submitFormData.append(key, value.toString());
        }
      });

      // Add file if selected
      if (selectedFile) {
        submitFormData.append("image", selectedFile);
      }

      await onSave(submitFormData);
      handleClose();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    setSelectedFile(null);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-auto"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image upload section */}
              {fields.some((field) => field.type === "file") && (
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setImagePreview(null);
                            setSelectedFile(null);
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div>
                          <Label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <Button
                              type="button"
                              variant="outline"
                              className="gap-2"
                            >
                              <Upload size={16} />
                              Choose Image
                            </Button>
                          </Label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dynamic form fields */}
              {fields
                .filter((field) => field.type !== "file")
                .map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </Label>

                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        value={String(formData[field.name] || "")}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        value={String(formData[field.name] || "")}
                        onValueChange={(value) =>
                          handleInputChange(field.name, value)
                        }
                        required={field.required}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              field.placeholder || `Select ${field.label}`
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        value={String(formData[field.name] || "")}
                        onChange={(e) =>
                          handleInputChange(
                            field.name,
                            field.type === "number"
                              ? Number(e.target.value)
                              : e.target.value
                          )
                        }
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 gap-2"
                >
                  <Save size={16} />
                  {isLoading ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ItemForm;
