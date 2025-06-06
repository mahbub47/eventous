import image404 from "../assets/404.png"

function PageNotFoundPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <img src={image404} alt="page not found image" className="lg:w-lg w-2xs md:w-sm"/>
    </div>
  )
}

export default PageNotFoundPage