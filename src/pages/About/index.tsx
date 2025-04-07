import content from "@data/content.json"

function About() {
  return (
    <div className="container-custom py-10">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-light text-4xl font-bold text-light">{content.pages.about.title}</h1>
      </div>
    </div>
  )
}

export default About