"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// import { useSignIn } from "@clerk/nextjs";
// import type { OAuthStrategy } from "@clerk/types";

import { Button, useToast } from "@acme/ui";

// import * as Icons from "@acme/ui/src/icons";

export function OAuthSignIn() {
  // const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
  // const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { toast } = useToast();

  // const oauthSignIn = async (provider: OAuthStrategy) => {
  //   if (!signInLoaded) return null;
  //   try {
  //     setIsLoading(provider);
  //     await signIn.authenticateWithRedirect({
  //       strategy: provider,
  //       redirectUrl: "/sso-callback",
  //       redirectUrlComplete: "/dashboard",
  //     });
  //   } catch (cause) {
  //     console.error(cause);
  //     setIsLoading(null);
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "Something went wrong, please try again.",
  //     });
  //   }
  // };

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

    // <div className="flex flex-col gap-2">
    //   <Button
    //     variant="outline"
    //     className="bg-background"
    //     // onClick={() => oauthSignIn("oauth_github")}
    //   >
    //     {isLoading === "oauth_github" ? (
    //       <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
    //     ) : (
    //       <Icons.GitHub className="mr-2 h-4 w-4" />
    //     )}
    //     Github
    //   </Button>
    //   <Button
    //     variant="outline"
    //     className="bg-background"
    //     // onClick={() => oauthSignIn("oauth_google")}
    //   >
    //     {isLoading === "oauth_google" ? (
    //       <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
    //     ) : (
    //       <Icons.Google className="mr-2 h-4 w-4" />
    //     )}
    //     Google
    //   </Button>
    // </div>
  );
}
