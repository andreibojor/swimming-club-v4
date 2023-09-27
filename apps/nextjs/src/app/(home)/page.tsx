import { marketingFeatures } from "@/app/config";
import { Balancer } from "react-wrap-balancer";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@acme/ui";

import { MultiStepForm } from "../multi-step-form/MultiStepForm";

// export const runtime = "edge";

// export const revalidate = 0;

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-48">
      <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>Crișan Swimming Club</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Suntem pasionați de apă, de înot și vrem o viață sănătoasă. Oferim
            cursuri de înot pentru toate vârstele în diferite locații.
          </Balancer>
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
        ></div>
      </div>

      {/* HOME CONTENT */}
      <div className="my-16 w-full max-w-screen-lg animate-fade-up gap-5 border-t p-5 xl:px-0">
        <h2 className="pt-4 text-center text-3xl font-bold md:text-4xl">
          What&apos;s included?
        </h2>

        <p className="pb-8 pt-4 text-center text-lg">
          <Balancer>
            This repo comes fully stacked with everything you need for your
            enterprise startup. Stop worrying about boilerplate integrations and
            start building your product today!
          </Balancer>
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {marketingFeatures.map((feature) => (
            <Card key={feature.title} className={cn("p-2")}>
              <CardHeader>{feature.icon}</CardHeader>
              <CardContent className="space-y-2">
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mt-2">
                  {feature.body}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
