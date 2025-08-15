
import successPaymentImg from "../assets/success_payment.png";
function SuccessPaymentPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col">
      <div className="font-semibold text-4xl">Payment Successful</div>
      <div className="underline font-normal cursor-pointer" onClick={() => window.location.href = "/"}>
        go to Home
      </div>
      <img src={successPaymentImg} alt="success payment image" className="lg:w-lg w-2xs md:w-sm"/>
    </div>
  )
}

export default SuccessPaymentPage