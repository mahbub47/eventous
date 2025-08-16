import failedPaymentImage from "@/assets/payment_fail.png";
function PaymentFailedPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col">
      <div className="font-semibold text-4xl">Payment Failed</div>
      <div className="underline font-normal cursor-pointer" onClick={() => window.location.href = "/"}>
        go to Home
      </div>
      <img src={failedPaymentImage} alt="failed payment image" className="lg:w-lg w-2xs md:w-sm"/>
    </div>
  )
}

export default PaymentFailedPage