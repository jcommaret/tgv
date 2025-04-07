import content from "@data/content.json"

function ErrorPage() {
  return (
    <div className="container-custom py-10">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-bold">{content.pages.error.title}</h1>
        <p className="text-xl">Page non trouvée</p>
      </div>
    </div>
  )
}

export default ErrorPage 