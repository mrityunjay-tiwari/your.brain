import {AuthButton, AuthButtonGithub} from "@/components/signin/custombuttons";
import {signIn} from "@/utils/auth";
import {GitBranch} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="max-w-92 m-auto h-fit w-full">
        <div className="p-6">
          <div>
            <Link href="/" aria-label="go home">
              <Image
                src={
                  "https://ik.imagekit.io/mrityunjay/your_brain__3_-removebg-preview.png?updatedAt=1763637324508"
                }
                alt=""
                width={75}
                height={50}
                className="block dark:hidden"
              />
              <Image
                src="https://ik.imagekit.io/mrityunjay/1k_+-removebg-preview.png"
                alt="logo-dark"
                width={100}
                height={50}
                className="hidden dark:block"
              />
            </Link>
            <h1 className="mb-0.5 mt-4 text-xl font-medium">
              Welcome to yourBrain!
            </h1>
            <p className="text-gray-700 dark:text-inherit">Login to get started</p>
          </div>

          <form
            action={async () => {
              "use server";
              await signIn("google", {redirectTo: "/dashboard"});
            }}
            className="mt-6"
          >
            <AuthButton />
          </form>
          {/* <form
            action={async () => {
              "use server";
              await signIn("github", {redirectTo: "/dashboard"});
            }}
            className="mt-6"
          >
            <AuthButtonGithub />
          </form> */}
        </div>
      </div>
    </section>
  );
}
