
"use client";

import { googleLogin } from "@/src/services/auth/auth.api";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function GoogleLoginButton() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) {
      setError("Google authentication failed.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await googleLogin({
        credential: credentialResponse.credential,
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Google login error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Google login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        {loading ? (
          <div className="flex h-10 w-full items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">
            Signing in with Google...
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setError("Google login failed.");
            }}
            theme="outline"
            size="large"
            width="100%"
          />
        )}
      </div>

      {error && (
        <p className="text-center text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
