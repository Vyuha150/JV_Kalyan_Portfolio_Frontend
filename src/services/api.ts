import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

// Type definitions
export interface SkillCategory {
  _id?: string;
  icon: string;
  title: string;
  skills: string[];
  color: "primary" | "secondary";
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSkillCategoryData {
  icon: string;
  title: string;
  skills: string[];
  color: "primary" | "secondary";
  order: number;
}

export interface Achievement {
  _id?: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAchievementData {
  title: string;
  description: string;
  image?: string;
  icon: string;
  order: number;
}

export interface Experience {
  _id?: string;
  year: string;
  role: string;
  organization: string;
  description: string;
  image: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateExperienceData {
  year: string;
  role: string;
  organization: string;
  description: string;
  image?: string;
  icon: string;
  order: number;
}

export interface Media {
  _id?: string;
  title: string;
  description: string;
  image: string;
  type:
    | "Podcast"
    | "Speaking"
    | "Content"
    | "Panel"
    | "Interview"
    | "Workshop"
    | "Webinar"
    | "Video";
  icon:
    | "Play"
    | "Mic"
    | "Camera"
    | "Award"
    | "Video"
    | "Users"
    | "Speaker"
    | "Headphones";
  link: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMediaData {
  title: string;
  description: string;
  image?: string;
  type:
    | "Podcast"
    | "Speaking"
    | "Content"
    | "Panel"
    | "Interview"
    | "Workshop"
    | "Webinar"
    | "Video";
  icon:
    | "Play"
    | "Mic"
    | "Camera"
    | "Award"
    | "Video"
    | "Users"
    | "Speaker"
    | "Headphones";
  link: string;
  order: number;
}

export interface ContactQuery {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactQueryData {
  name: string;
  email: string;
  message: string;
}

// Create axios instance with base configuration
// Enable withCredentials so browser will send cookies (HttpOnly token cookie) with requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      unauthorizedHandler?.();
    }
    return Promise.reject(error);
  }
);

// Skills API service
export const skillsService = {
  // Get all skill categories
  getAllSkillCategories: async (): Promise<SkillCategory[]> => {
    try {
      const response = await apiClient.get("/skills");
      const data = response.data;
      // Support different response shapes: array or wrapped object
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.skillCategories)) return data.skillCategories;
      if (Array.isArray(data?.data)) return data.data;
      return [];
    } catch (error) {
      console.error("Error fetching skill categories:", error);
      throw error;
    }
  },

  // Get a single skill category by ID
  getSkillCategoryById: async (id: string): Promise<SkillCategory> => {
    try {
      const response = await apiClient.get(`/skills/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching skill category ${id}:`, error);
      throw error;
    }
  },

  // Create a new skill category
  createSkillCategory: async (
    skillCategory: CreateSkillCategoryData
  ): Promise<SkillCategory> => {
    try {
      const response = await apiClient.post("/skills", skillCategory);
      return response.data;
    } catch (error) {
      console.error("Error creating skill category:", error);
      throw error;
    }
  },

  // Update a skill category
  updateSkillCategory: async (
    id: string,
    skillCategory: Partial<CreateSkillCategoryData>
  ): Promise<SkillCategory> => {
    try {
      const response = await apiClient.put(`/skills/${id}`, skillCategory);
      return response.data;
    } catch (error) {
      console.error(`Error updating skill category ${id}:`, error);
      throw error;
    }
  },

  // Delete a skill category
  deleteSkillCategory: async (id: string) => {
    try {
      const response = await apiClient.delete(`/skills/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting skill category ${id}:`, error);
      throw error;
    }
  },

  // Add a skill to a category
  addSkillToCategory: async (id: string, skill: string) => {
    try {
      const response = await apiClient.post(`/skills/${id}/add-skill`, {
        skill,
      });
      return response.data;
    } catch (error) {
      console.error(`Error adding skill to category ${id}:`, error);
      throw error;
    }
  },

  // Remove a skill from a category
  removeSkillFromCategory: async (id: string, skill: string) => {
    try {
      const response = await apiClient.post(`/skills/${id}/remove-skill`, {
        skill,
      });
      return response.data;
    } catch (error) {
      console.error(`Error removing skill from category ${id}:`, error);
      throw error;
    }
  },
};

// Achievements API service
export const achievementsService = {
  // Get all achievements
  getAllAchievements: async (
    includeInactive = false
  ): Promise<Achievement[]> => {
    try {
      const response = await apiClient.get("/achievements", {
        params: includeInactive ? { includeInactive: true } : undefined,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching achievements:", error);
      throw error;
    }
  },

  // Get a single achievement by ID
  getAchievementById: async (id: string): Promise<Achievement> => {
    try {
      const response = await apiClient.get(`/achievements/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching achievement ${id}:`, error);
      throw error;
    }
  },

  // Create a new achievement
  createAchievement: async (formData: FormData): Promise<Achievement> => {
    try {
      // Do not set Content-Type header manually for FormData; let the browser set the correct
      // multipart boundary. axios will pick it up automatically.
      const response = await apiClient.post("/achievements", formData);
      return response.data;
    } catch (error) {
      console.error("Error creating achievement:", error);
      throw error;
    }
  },

  // Update an achievement
  updateAchievement: async (
    id: string,
    formData: FormData
  ): Promise<Achievement> => {
    try {
      const response = await apiClient.put(`/achievements/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Error updating achievement ${id}:`, error);
      throw error;
    }
  },

  // Delete an achievement
  deleteAchievement: async (id: string) => {
    try {
      const response = await apiClient.delete(`/achievements/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting achievement ${id}:`, error);
      throw error;
    }
  },

  // Soft delete an achievement
  deactivateAchievement: async (id: string) => {
    try {
      const response = await apiClient.patch(`/achievements/${id}/deactivate`);
      return response.data;
    } catch (error) {
      console.error(`Error deactivating achievement ${id}:`, error);
      throw error;
    }
  },
};

// Experiences API service
export const experiencesService = {
  // Get all experiences
  getAllExperiences: async (includeInactive = false): Promise<Experience[]> => {
    try {
      const response = await apiClient.get("/experiences", {
        params: includeInactive ? { includeInactive: true } : undefined,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching experiences:", error);
      throw error;
    }
  },

  // Get a single experience by ID
  getExperienceById: async (id: string): Promise<Experience> => {
    try {
      const response = await apiClient.get(`/experiences/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching experience ${id}:`, error);
      throw error;
    }
  },

  // Create a new experience
  createExperience: async (formData: FormData): Promise<Experience> => {
    try {
      const response = await apiClient.post("/experiences", formData);
      return response.data;
    } catch (error) {
      console.error("Error creating experience:", error);
      throw error;
    }
  },

  // Update an experience
  updateExperience: async (
    id: string,
    formData: FormData
  ): Promise<Experience> => {
    try {
      const response = await apiClient.put(`/experiences/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Error updating experience ${id}:`, error);
      throw error;
    }
  },

  // Delete an experience
  deleteExperience: async (id: string) => {
    try {
      const response = await apiClient.delete(`/experiences/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting experience ${id}:`, error);
      throw error;
    }
  },

  // Soft delete an experience
  deactivateExperience: async (id: string) => {
    try {
      const response = await apiClient.patch(`/experiences/${id}/deactivate`);
      return response.data;
    } catch (error) {
      console.error(`Error deactivating experience ${id}:`, error);
      throw error;
    }
  },
};

// Media API service
export const mediaService = {
  // Get all media items
  getAllMedia: async (includeInactive = false): Promise<Media[]> => {
    try {
      const response = await apiClient.get("/media", {
        params: includeInactive ? { includeInactive: true } : undefined,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching media:", error);
      throw error;
    }
  },

  // Get a single media item by ID
  getMediaById: async (id: string): Promise<Media> => {
    try {
      const response = await apiClient.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching media ${id}:`, error);
      throw error;
    }
  },

  // Create a new media item
  createMedia: async (formData: FormData): Promise<Media> => {
    try {
      const response = await apiClient.post("/media", formData);
      return response.data;
    } catch (error) {
      console.error("Error creating media:", error);
      throw error;
    }
  },

  // Update a media item
  updateMedia: async (id: string, formData: FormData): Promise<Media> => {
    try {
      const response = await apiClient.put(`/media/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Error updating media ${id}:`, error);
      throw error;
    }
  },

  // Delete a media item
  deleteMedia: async (id: string) => {
    try {
      const response = await apiClient.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting media ${id}:`, error);
      throw error;
    }
  },

  // Soft delete a media item
  deactivateMedia: async (id: string) => {
    try {
      const response = await apiClient.patch(`/media/${id}/deactivate`);
      return response.data;
    } catch (error) {
      console.error(`Error deactivating media ${id}:`, error);
      throw error;
    }
  },
};

// Contact queries API service
export const contactsService = {
  submitContactQuery: async (
    payload: CreateContactQueryData
  ): Promise<ContactQuery> => {
    const response = await apiClient.post("/contacts", payload);
    return response.data?.query ?? response.data;
  },

  getAllContactQueries: async (): Promise<ContactQuery[]> => {
    const response = await apiClient.get("/contacts");
    return Array.isArray(response.data) ? response.data : [];
  },

  markContactQueryRead: async (id: string): Promise<ContactQuery> => {
    const response = await apiClient.patch(`/contacts/${id}/read`);
    return response.data;
  },

  deleteContactQuery: async (id: string) => {
    const response = await apiClient.delete(`/contacts/${id}`);
    return response.data;
  },
};

export default apiClient;
