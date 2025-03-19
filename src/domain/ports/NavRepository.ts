/**
 * Navigation Repository Port
 *
 * This interface defines the contract for accessing navigation data.
 * It's a port in the hexagonal architecture that allows the application core
 * to communicate with the outside world without knowing implementation details.
 * 
 * Following the Dependency Inversion Principle, this interface allows the domain
 * to define what it needs without depending on specific implementations.
 */

import { NavData } from '@domain/model/NavTypes';

/**
 * Interface for accessing navigation data
 */
export interface NavRepository {
  /**
   * Retrieves the complete navigation data
   * @returns Promise containing navigation data
   */
  getNavData(): Promise<NavData>;
} 