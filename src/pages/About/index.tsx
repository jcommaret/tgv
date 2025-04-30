import content from "@data/content.json"

function About() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-light text-4xl font-bold text-light">{content.pages.about.title}</h1>
      <p></p>
    </div>
  )
}
export default About