import React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ItemCardProps {
  item: {
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
  };
  index: number;
  onEdit: (item: ItemCardProps["item"]) => void;
  onDelete: (id: string) => void;
  getImageUrl?: (imagePath: string) => string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  index,
  onEdit,
  onDelete,
  getImageUrl,
}) => {
  const itemId = item._id || item.id || "";

  // Generate title for different item types
  const getItemTitle = () => {
    if (item.title) {
      return item.title;
    }
    // For experiences, combine role and organization
    if (item.role && item.organization) {
      return `${item.role} at ${item.organization}`;
    }
    return "Untitled Item";
  };

  const defaultGetImageUrl = (imagePath: string) => {
    if (imagePath?.startsWith("/uploads/")) {
      const backendUrl =
        import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
        "http://localhost:5000";
      return `${backendUrl}${imagePath}`;
    }
    return imagePath;
  };

  const imageUrl = getImageUrl
    ? getImageUrl(item.image || "")
    : defaultGetImageUrl(item.image || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {item.image && (
            <div className="relative h-32 sm:h-40 md:h-48 bg-muted flex-shrink-0">
              <img
                src={imageUrl}
                alt={getItemTitle()}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onEdit(item)}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <Edit size={12} className="sm:w-[14px] sm:h-[14px]" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(itemId)}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <Trash2 size={12} className="sm:w-[14px] sm:h-[14px]" />
                </Button>
              </div>
            </div>
          )}

          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-base sm:text-lg line-clamp-2 pr-2">
                {getItemTitle()}
              </h3>
              {!item.image && (
                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(item)}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <Edit size={12} className="sm:w-[14px] sm:h-[14px]" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(itemId)}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <Trash2 size={12} className="sm:w-[14px] sm:h-[14px]" />
                  </Button>
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 mb-3 flex-1">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
              {item.type && <Badge variant="secondary">{item.type}</Badge>}
              {item.year && <Badge variant="outline">{item.year}</Badge>}
              {item.role && <Badge variant="outline">{item.role}</Badge>}
              {item.organization && (
                <Badge variant="outline">{item.organization}</Badge>
              )}
              {item.icon && <Badge variant="secondary">{item.icon}</Badge>}
              {item.order !== undefined && (
                <Badge variant="outline">Order: {item.order}</Badge>
              )}
              {item.isActive !== undefined && (
                <Badge variant={item.isActive ? "default" : "destructive"}>
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              )}
            </div>

            {item.link && (
              <div className="mt-3">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  View Link →
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ItemCard;
