import content from "@data/content.json"

function Documentation() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-light text-4xl font-bold text-light">{content.pages.documentation.title}</h1>
      <p className="code text-light text-xl text-center m-10">
        <code>project</code> and have a look at the code to see how it works.
      </p>
    </div>
  )       
}
export default Documentation