/**
 * Home Page Component
 * 
 * This component renders the home page of the application.
 * It includes a banner image and welcome text.
 */

import { img } from "@assets/alias"
import content from "@data/content.json"

function Home() {
  return (
    <div className="flex flex-col items-center" data-testid="home-container">
      <h1 className="text-4xl font-bold text-light">{content.pages.home.title}</h1>
      <img 
        src={img.bannerBlack} 
        alt="banner" 
        className="w-50" 
      />
    </div>
  )
}

export default Home 