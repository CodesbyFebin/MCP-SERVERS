"use client";

import React, { useState } from "react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { Mail, Building, Landmark, CheckCircle2 } from "lucide-react";

export default function AboutContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const breadcrumbSteps = [{ name: "About & Contact", href: "/contact" }];

  return (
    <div id="about-contact-page" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
          
          {/* Left Column: About Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                About MCPserver
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                MCPserver.in is an India-first Model Context Protocol integration and developer resource platform. 
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                Our mission is to help developer teams, AI startups, and enterprise engineers build secure connection layers that safely expose data assets and tools to LLM models.
              </p>
            </div>

            {/* Platform Identification */}
            <div className="p-4 rounded-xl bg-gray-900/20 border border-gray-900 space-y-3.5 text-xs text-gray-400">
              <h3 className="font-bold text-white">Platform Information</h3>
              
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>Bengaluru, Karnataka, India</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@mcpserver.in</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-[#09090e] border border-gray-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-sans font-bold text-white mb-2">Connect with our Solutions Team</h2>
            <p className="text-xs text-gray-400 mb-6">Have enterprise questions? Looking to request custom server builds? Fill out our form below.</p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h3 className="text-sm font-bold text-white">Message Transmitted Successfully!</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Thank you for connecting with us. An solutions engineer from our Bengaluru office will follow up with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-cyan-400 hover:underline"
                >
                  Submit another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg text-xs text-gray-300 focus:outline-none focus:border-cyan-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Work Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg text-xs text-gray-300 focus:outline-none focus:border-cyan-500"
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Message / Requirements</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-black border border-gray-800 rounded-lg text-xs text-gray-300 focus:outline-none focus:border-cyan-500"
                    placeholder="Specify integration targets or requested capabilities..."
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
