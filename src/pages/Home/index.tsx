import "./index.scss"
import img from "../../assets/images"

function Home() {
  return (
    <div className="home">
      <h2>Home</h2>
      <div className="home__banner">
        <img src={img.bannerBlack} alt="banner" />
      </div>
    </div>
  )
}
export default Home