"use client";

import * as React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export function OAuthSignIn() {
  const supabaseClient = useSupabaseClient();

  return (
    // TODO: set icons from left to right

    <Auth
      supabaseClient={supabaseClient}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#404040",
              brandAccent: "#22c55e",
            },
          },
        },
      }}
      providers={["google", "facebook"]}
    />
  );
}
