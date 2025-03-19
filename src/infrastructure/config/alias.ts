/**
 * Centralized imports for the application
 * This file serves as a central point for importing and exporting shared resources
 * It helps reduce import complexity and prevents circular dependencies
 */

// Import data and assets
import navJson from "@/data/nav.json";
import images from "@assets/images";
import { NavData } from "@domain/model/NavTypes";

// Export navigation data with proper typing
export const navData = navJson as NavData;

// Export image assets
export const img = images; 