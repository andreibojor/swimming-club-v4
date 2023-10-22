import Image from "next/image";
import { marketingFeatures } from "@/app/config";
import { Balancer } from "react-wrap-balancer";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Switch,
  cn,
} from "@acme/ui";

import beginnerSwimming from "/apps/nextjs/public/beginnerSwimming.webp";

// export const runtime = "edge";

// export const revalidate = 0;

export default function Home() {
  return (
    <>
      <div className="z-10 min-h-[50vh] w-full bg-[url('/swimming-pool-homepage.webp')] bg-scroll px-5 xl:px-0 ">
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
      <div className="my-16 flex w-full max-w-screen-lg animate-fade-up flex-col items-center gap-5 border-t p-5 xl:px-0">
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
        <div className="z-10 flex min-h-[50vh] w-full max-w-4xl flex-col justify-between gap-4 px-5 md:flex-row xl:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Cookie Settings</CardTitle>
              <CardDescription>
                Manage your cookie settings here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span>Strictly Necessary</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
                <Switch id="necessary" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="functional" className="flex flex-col space-y-1">
                  <span>Functional Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies allow the website to provide personalized
                    functionality.
                  </span>
                </Label>
                <Switch id="functional" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="performance"
                  className="flex flex-col space-y-1"
                >
                  <span>Performance Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies help to improve the performance of the
                    website.
                  </span>
                </Label>
                <Switch id="performance" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save preferences
              </Button>
            </CardFooter>
          </Card>

          {/* <Image
            alt="Child swimming"
            src={beginnerSwimming}
            style={{ maxWidth: "100%", height: "auto" }}
          /> */}
          {/* <Card
            style={{
              backgroundImage: `url('/beginner-lessons-swimming.webp')`,
            }}
          >
            <CardHeader>
              <CardTitle>Cookie Settings</CardTitle>
              <CardDescription>
                Manage your cookie settings here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span>Strictly Necessary</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
                <Switch id="necessary" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="functional" className="flex flex-col space-y-1">
                  <span>Functional Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies allow the website to provide personalized
                    functionality.
                  </span>
                </Label>
                <Switch id="functional" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="performance"
                  className="flex flex-col space-y-1"
                >
                  <span>Performance Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies help to improve the performance of the
                    website.
                  </span>
                </Label>
                <Switch id="performance" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save preferences
              </Button>
            </CardFooter>
          </Card> */}
        </div>

        <div className="z-10 flex min-h-[50vh] w-full max-w-4xl flex-col justify-between gap-4 px-5 md:flex-row xl:px-0">
          <Card
            style={{
              backgroundImage: `url('/advanced-lessons-swimming.webp')`,
            }}
          >
            <CardHeader>
              <CardTitle>Cookie Settings</CardTitle>
              <CardDescription>
                Manage your cookie settings here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span>Strictly Necessary</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
                <Switch id="necessary" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="functional" className="flex flex-col space-y-1">
                  <span>Functional Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies allow the website to provide personalized
                    functionality.
                  </span>
                </Label>
                <Switch id="functional" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="performance"
                  className="flex flex-col space-y-1"
                >
                  <span>Performance Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies help to improve the performance of the
                    website.
                  </span>
                </Label>
                <Switch id="performance" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save preferences
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cookie Settings</CardTitle>
              <CardDescription>
                Manage your cookie settings here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span>Strictly Necessary</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
                <Switch id="necessary" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="functional" className="flex flex-col space-y-1">
                  <span>Functional Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies allow the website to provide personalized
                    functionality.
                  </span>
                </Label>
                <Switch id="functional" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="performance"
                  className="flex flex-col space-y-1"
                >
                  <span>Performance Cookies</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies help to improve the performance of the
                    website.
                  </span>
                </Label>
                <Switch id="performance" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
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
    </>
  );
}
