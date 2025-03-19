/**
 * File-based Navigation Repository
 * 
 * This class is a secondary adapter in the hexagonal architecture.
 * It implements the NavRepository port defined in the domain layer,
 * providing data from a static JSON file.
 * 
 * In a real-world application, this might be replaced with a database 
 * or API repository without changing the application core.
 */

import { NavData } from '../../../domain/model/NavTypes';
import { NavRepository } from '../../../domain/ports/NavRepository';
import navData from '../../../data/nav.json';

/**
 * Repository implementation that sources navigation data from a JSON file
 */
export class FileNavRepository implements NavRepository {
  /**
   * Returns navigation data from the static JSON file
   * @returns Promise with the navigation data
   */
  async getNavData(): Promise<NavData> {
    // The Promise wrapper simulates async behavior, similar to a real data source
    return navData as NavData;
  }
} 