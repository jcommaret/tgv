/**
 * Home Page Component
 * 
 * This component renders the home page of the application.
 * It includes a banner image and welcome text.
 */

import { img } from "@infrastructure/config/alias"

function Home() {
  return (
    <div className="container-custom py-10">
      <div className="flex flex-col items-center space-y-8">
        
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