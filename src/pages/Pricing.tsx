import { motion } from "framer-motion";
import { Check, Brain, Zap, Building } from "lucide-react";
import BASE_URL from '../utils/helper'

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: 29,
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      features: [
        "1,000 face searches per month",
        "Basic API access",
        "Email support",
        "Basic analytics",
      ],
      recommended: false,
    },
    {
      name: "Professional",
      price: 99,
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      features: [
        "10,000 face searches per month",
        "Advanced API access",
        "Priority support",
        "Advanced analytics",
        "Custom integration",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: 299,
      icon: <Building className="w-6 h-6 text-cyan-400" />,
      features: [
        "Unlimited face searches",
        "Full API access",
        "24/7 dedicated support",
        "Custom solutions",
        "On-premise deployment",
        "SLA guarantee",
      ],
      recommended: false,
    },
  ];

  const handleCheckout = async (plan: string) => {
  
    try {
      const response = await fetch(`${BASE_URL}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
  
      const data = await response.json();
  
      if (data.url) {
        // Redirect to the Stripe Checkout session URL
        window.location.href = data.url;
      } else {
        alert("Failed to initiate checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };  

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core
            facial recognition features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl backdrop-blur-lg ${
                plan.recommended
                  ? "bg-gradient-to-b from-blue-900/50 to-purple-900/50 border-2 border-blue-500/50"
                  : "bg-gray-900/50 border border-gray-800"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <div className="p-8 pb-28">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price}
                      </span>
                      <span className="ml-1 text-gray-400">/month</span>
                    </div>
                  </div>
                  {plan.icon}
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-8 left-0 w-full px-6">
                  <button
                  onClick={() => handleCheckout(plan.name)}
                    className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                      plan.recommended
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Need a custom solution?{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
