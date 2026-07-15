"use client";

import React, { useState } from "react";
import { pricingPlans } from "../data/pricing";
import { CheckCircle2, ShieldAlert, X, Sparkles, CreditCard, ChevronRight } from "lucide-react";

export default function PricingTable() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");

  const openPlanModal = (planName: string) => {
    setActiveModal(planName);
    setPaymentSuccess(false);
    setCompanyName("");
  };

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => {
          const isPopular = plan.badge === "Popular";
          return (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 backdrop-blur-sm ${
                isPopular
                  ? "bg-gradient-to-b from-cyan-950/20 via-white/[0.02] to-purple-950/10 border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                  : "bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 shadow-md"
              }`}
            >
              {/* Visual Popular/Enterprise badge */}
              {plan.badge && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  {plan.badge}
                </span>
              )}

              <div>
                <h3 className="font-display font-bold text-lg text-white">{plan.name}</h3>
                <p className="mt-2 text-xs text-white/50 leading-relaxed min-h-[40px]">{plan.description}</p>
                
                <div className="mt-4 pt-4 border-t border-white/5 flex items-baseline gap-1">
                  <span className="text-3xl font-display font-bold text-white">{plan.price}</span>
                  {plan.period !== "forever" && plan.period !== "negotiated" && (
                    <span className="text-xs text-white/40 font-medium">/{plan.period}</span>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/75 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openPlanModal(plan.name)}
                  className={`w-full py-3 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                    isPopular
                      ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.cta}
                </button>
                
                {plan.price !== "₹0" && (
                  <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-white/40">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-450" />
                    Secured by Razorpay & Stripe (India)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Billing & Checkout Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 overflow-hidden rounded-2xl bg-[#09090e] border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-[#e0e0e0]">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!paymentSuccess ? (
              <form onSubmit={handleSimulatedPayment}>
                <div className="flex items-center gap-2 text-cyan-400 text-[10px] uppercase font-bold tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  SaaS Sandbox Checkout
                </div>
                
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  Activate {activeModal} Plan
                </h3>
                <p className="text-xs text-white/50 mb-5">
                  Confirm your secure billing setup below. No real card will be charged.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-white/60 mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Software India"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg text-xs focus:outline-none transition-all text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-white/60 mb-1.5">
                      Choose Indian Gateway
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          paymentMethod === "upi"
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        BHIM UPI / QR
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          paymentMethod === "card"
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        Credit / Debit Card
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "upi" ? (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg text-center">
                      <div className="inline-block p-2 bg-white rounded mb-2">
                        {/* Simulating QR code with CSS */}
                        <div className="w-24 h-24 bg-zinc-900 border-2 border-cyan-500 flex items-center justify-center text-[8px] text-cyan-400 font-mono font-bold leading-normal">
                          [MUMBAI GATEWAY]<br/>SCAN TO DEPLOY
                        </div>
                      </div>
                      <p className="text-[10px] text-white/40">
                        Scan with GPay, PhonePe, or BHIM. Simulated Sandbox merchant.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number (Simulated)"
                        defaultValue="4111 2222 3333 4444"
                        disabled
                        className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/40 cursor-not-allowed"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/30"
                          disabled
                          className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/40 cursor-not-allowed"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          defaultValue="123"
                          disabled
                          className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/40 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
                  >
                    Simulate Setup Payment
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  Plan Activated Successfully!
                </h3>
                <p className="text-xs text-white/50 mb-6">
                  {activeModal} plan is now active for <strong className="text-white">{companyName || "Acme Software"}</strong>.
                </p>

                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-left space-y-2 text-[11px] mb-6 font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-1 text-white/40 uppercase tracking-wider text-[9px] font-bold">
                    <span>Invoice Details</span>
                    <span>Status: PAID</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Merchant:</span>
                    <span className="text-white">MCPserver.in</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>GSTIN Match:</span>
                    <span className="text-white">27AAPCM1234F1Z5</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Amount Charged:</span>
                    <span className="text-cyan-400 font-bold">
                      {pricingPlans.find(p => p.name === activeModal)?.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Cluster Hub:</span>
                    <span className="text-white">Mumbai-Edge-01</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                >
                  Go to Dashboard <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
