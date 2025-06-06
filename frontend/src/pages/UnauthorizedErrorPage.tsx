import image403 from "../assets/403.png"

function UnauthorizedErrorPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <img src={image403} alt="unauthorized error image" className="lg:w-lg w-2xs md:w-sm"/>
    </div>
  )
}

export default UnauthorizedErrorPage