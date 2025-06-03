import image500 from "../assets/500.png"

function ServerErrorPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <img src={image500} alt="Server error image" className="lg:w-lg w-2xs md:w-sm"/>
    </div>
  )
}

export default ServerErrorPage