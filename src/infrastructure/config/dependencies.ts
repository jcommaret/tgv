/**
 * Dependency Injection Configuration
 * 
 * This file manages the instantiation and wiring of services and repositories.
 * It follows the Dependency Inversion Principle by connecting interfaces with implementations.
 * The main purpose is to centralize dependencies and facilitate testing.
 */

// Import the service from application layer and repository from infrastructure layer
import { NavService } from '../../application/services/NavService';
import { FileNavRepository } from '../adapters/secondary/FileNavRepository';

// Create repository instances
const navRepository = new FileNavRepository();

// Create and export service instances with their dependencies
export const navService = new NavService(navRepository); 