import userExists from "@/app/actions/getUser";
import FooterClient from "./footerClient";

export const Footer = async () => {
  const userInfo = await userExists();

  if (!userInfo?.user?.name) return null;
  if (!userInfo.user.image) return null;

  return <FooterClient user={userInfo.user.name} image={userInfo.user.image} />;
};
