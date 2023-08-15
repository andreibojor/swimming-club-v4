import { marketingFeatures, siteConfig } from "@/app/config";
import Balancer from "react-wrap-balancer";

import {
  Avatar,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  buttonVariants,
  cn,
} from "@acme/ui";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <Avatar className="h-[80px] w-[80px]">
        <AvatarImage src="/rick-bro.JPG" alt="rick" />
      </Avatar>
      <div className="w-full max-w-screen-lg animate-fade-up gap-5 p-5 xl:px-0">
        <h2 className="pt-4 text-center text-3xl font-bold md:text-4xl">
          Rick & Morty
        </h2>
        <p className="pb-8 pt-4 text-center text-lg">prezente</p>
        <p className="pb-8 pt-4 text-center text-lg">
          <Balancer>daca e parinte sa poata sa vada copiii</Balancer>
        </p>
        <p className="pb-8 pt-4 text-center text-lg">
          sa poata sa adauge copii
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
