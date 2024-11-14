import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      <div className="text-center">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-4xl font-bold text-green-500 mb-2">
            Payment Successful!
          </h1>
        </div>
        <p className="text-lg text-gray-300 mb-6">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
        {sessionId && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-400">Session ID:</p>
            <p className="text-sm text-gray-200 font-mono break-all">{sessionId}</p>
          </div>
        )}
        <p className="text-gray-400 mb-6">
          An email with the payment details and invoice will be sent to your
          registered email address shortly.
        </p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
