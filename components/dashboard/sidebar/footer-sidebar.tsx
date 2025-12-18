import userExists from "@/app/actions/getUser";
import FooterClient from "./footerClient";
import { NavUser } from "@/components/sidebar-check/nav-user";

export const Footer = async () => {
  const userInfo = await userExists();

  if (!userInfo?.user?.name) return null;
  if (!userInfo.user.image) return null;
  if (!userInfo.user.name) return null;
  if(!userInfo.user.email) return null;
  
  // return <FooterClient user={userInfo.user.name} image={userInfo.user.image} />;
  return <NavUser email={userInfo.user.email} image={userInfo.user.image} name={userInfo.user.name} />;
};
