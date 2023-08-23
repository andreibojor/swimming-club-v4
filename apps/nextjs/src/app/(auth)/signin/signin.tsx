"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useToast } from "@acme/ui";

export function OAuthSignIn() {
  const { toast } = useToast();

  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { sesison } = useSessionContext();

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
