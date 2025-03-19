/**
 * Navigation Service
 * 
 * This service belongs to the application layer in the hexagonal architecture.
 * It orchestrates the use cases related to navigation by coordinating domain objects
 * and interacting with repositories through their interfaces (ports).
 * 
 * The service receives its dependencies through constructor injection,
 * following the Dependency Inversion Principle.
 */

import { NavData } from '@domain/model/NavTypes';
import { NavRepository } from '@domain/ports/NavRepository';

/**
 * Service that handles navigation-related operations
 */
export class NavService {
  /**
   * Creates a new NavService
   * @param navRepository Repository for accessing navigation data
   */
  constructor(private readonly navRepository: NavRepository) {}

  /**
   * Retrieves navigation data from the repository
   * @returns Promise with the navigation data
   */
  async getNavData(): Promise<NavData> {
    return this.navRepository.getNavData();
  }
} 