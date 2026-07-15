"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#050508",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          textAlign: "center",
          padding: "24px",
          boxSizing: "border-box"
        }}>
          <div style={{
            padding: "32px",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            maxWidth: "480px",
            width: "100%"
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold"
            }}>
              !
            </div>
            
            <h1 style={{ 
              fontSize: "20px", 
              fontWeight: "bold", 
              margin: "0 0 12px 0",
              color: "#ffffff"
            }}>
              System Execution Halted
            </h1>
            
            <p style={{ 
              fontSize: "14px", 
              color: "rgba(255, 255, 255, 0.6)", 
              lineHeight: "1.5",
              margin: "0 0 24px 0"
            }}>
              An unexpected system boundary crash was intercepted. The local node state has been preserved.
            </p>
            
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#06b6d4",
                  color: "#050508",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                Reset Connection
              </button>
              
              <button
                onClick={() => window.location.href = "/"}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  fontWeight: "semibold",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
