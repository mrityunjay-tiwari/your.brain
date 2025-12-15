"use server";

import { signOut } from "@/utils/auth";

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
