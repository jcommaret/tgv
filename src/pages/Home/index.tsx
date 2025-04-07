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
    <div className="container-custom py-10">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-light text-4xl font-bold">{content.pages.home.title}</h1>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img 
            src={img.bannerBlack} 
            alt="banner" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default Home 