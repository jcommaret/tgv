/**
 * Domain Models for Navigation
 * 
 * These interfaces define the core data structures for navigation in the application.
 * As part of the domain layer, they represent the business entities regardless of
 * how they are stored or presented to the user.
 */

/**
 * Represents a single navigation link with text and target path
 */
export interface NavLink {
  text: string  // Display text for the link
  path: string  // Route path the link navigates to
}

/**
 * Represents the logo information for the navigation
 */
export interface NavLogo {
  text: string  // Text representation of the logo
  path: string  // Path to navigate to when logo is clicked
  img: string   // Image identifier for the logo
}

/**
 * Complete navigation data structure containing logo and links
 */
export interface NavData {
  logo: NavLogo      // The application logo
  links: NavLink[]   // Collection of navigation links
} 