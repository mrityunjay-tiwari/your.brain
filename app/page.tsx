import {LandingPage} from "@/components/landing-page/main";
import {userIfExists} from "@/app/actions/getUser";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await userIfExists();
  if (session) {
    redirect("/dashboard");
  }
  return <LandingPage />;
}
