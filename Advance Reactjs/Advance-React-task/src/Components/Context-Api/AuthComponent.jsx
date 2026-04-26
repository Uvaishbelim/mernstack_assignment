import { useState } from "react";
import { useAuth } from "./AuthContext";

const AuthComponent = () => {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(username, password);
    setIsLoading(false);

    if (success) {
      setUsername("");
      setPassword("");
    } else {
      setError("Login failed. Please try again.");
    }
  };

  // ── Styles ──
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: user
      ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
      : "linear-gradient(135deg, #0c0118 0%, #1a0533 40%, #0d1b2a 100%)",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    padding: "20px",
    transition: "background 0.6s ease",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "440px",
    boxShadow:
      "0 25px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(139, 92, 246, 0.06)",
    position: "relative",
    overflow: "hidden",
  };

  const glowStyle = {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: user
      ? "radial-gradient(circle at 60% 60%, rgba(34, 197, 94, 0.06) 0%, transparent 60%)"
      : "radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
    pointerEvents: "none",
    transition: "background 0.6s ease",
  };

  const iconContainerStyle = {
    width: "72px",
    height: "72px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    background: user
      ? "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.1))"
      : "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.15))",
    border: user
      ? "1px solid rgba(34, 197, 94, 0.2)"
      : "1px solid rgba(139, 92, 246, 0.2)",
    fontSize: "32px",
    transition: "all 0.4s ease",
  };

  const headingStyle = {
    color: "#f1f5f9",
    fontSize: "26px",
    fontWeight: 700,
    textAlign: "center",
    margin: "0 0 8px",
    letterSpacing: "-0.02em",
  };

  const subtitleStyle = {
    color: "#94a3b8",
    fontSize: "14px",
    textAlign: "center",
    margin: "0 0 32px",
    lineHeight: 1.5,
  };

  const inputGroupStyle = {
    marginBottom: "18px",
    position: "relative",
  };

  const labelStyle = {
    display: "block",
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#f1f5f9",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const inputFocusHandler = (e) => {
    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.1)";
  };

  const inputBlurHandler = (e) => {
    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
    e.target.style.boxShadow = "none";
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: isLoading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    letterSpacing: "0.01em",
    marginTop: "8px",
  };

  const loginButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    color: "#fff",
    opacity: isLoading ? 0.7 : 1,
    boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    background: "rgba(239, 68, 68, 0.1)",
    color: "#f87171",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  };

  const errorStyle = {
    background: "rgba(239, 68, 68, 0.08)",
    border: "1px solid rgba(239, 68, 68, 0.15)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#f87171",
    fontSize: "13px",
    marginBottom: "18px",
    textAlign: "center",
  };

  const welcomeNameStyle = {
    background: "linear-gradient(135deg, #22c55e, #10b981)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "32px",
    fontWeight: 700,
    textAlign: "center",
    margin: "16px 0 8px",
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.15)",
    borderRadius: "20px",
    padding: "6px 14px",
    color: "#4ade80",
    fontSize: "12px",
    fontWeight: 500,
    margin: "0 auto 24px",
  };

  const dividerStyle = {
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
    margin: "24px 0",
  };

  const infoRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    color: "#94a3b8",
    fontSize: "13px",
  };

  // ── Logged-in View ──
  if (user) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={glowStyle} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={iconContainerStyle}>✓</div>

            <h1 style={headingStyle}>Welcome back!</h1>
            <p style={welcomeNameStyle}>{user.username}</p>

            <div style={{ textAlign: "center" }}>
              <div style={badgeStyle}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "inline-block",
                  }}
                />
                Authenticated
              </div>
            </div>

            <div style={dividerStyle} />

            <div style={infoRowStyle}>
              <span>Status</span>
              <span style={{ color: "#4ade80" }}>● Online</span>
            </div>
            <div style={infoRowStyle}>
              <span>Logged in at</span>
              <span style={{ color: "#e2e8f0" }}>{user.loginTime}</span>
            </div>
            <div style={infoRowStyle}>
              <span>Session</span>
              <span style={{ color: "#e2e8f0" }}>Active</span>
            </div>

            <div style={dividerStyle} />

            <button
              style={logoutButtonStyle}
              onClick={logout}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(239, 68, 68, 0.15)";
                e.target.style.borderColor = "rgba(239, 68, 68, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(239, 68, 68, 0.1)";
                e.target.style.borderColor = "rgba(239, 68, 68, 0.2)";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Login View ──
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={glowStyle} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={iconContainerStyle}>🔒</div>

          <h1 style={headingStyle}>Sign In</h1>
          <p style={subtitleStyle}>
            Enter your credentials to access your account
          </p>

          {error && <div style={errorStyle}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                style={inputStyle}
                disabled={isLoading}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                style={inputStyle}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              style={loginButtonStyle}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.boxShadow =
                    "0 6px 30px rgba(139, 92, 246, 0.45)";
                  e.target.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow =
                  "0 4px 20px rgba(139, 92, 246, 0.3)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "12px",
              marginTop: "24px",
            }}
          >
            Context API Authentication Demo
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;