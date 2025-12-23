import {
  createIndividualShareLinkHashContent,
  getContentsByUserId,
  getWebsiteCategoryTypes,
} from "@/app/actions/content";
import userExists from "@/app/actions/getUser";
import ContentCard from "@/components/dashboard/card/card";
import { HeroHeader } from "@/components/dashboard/topbar/topbar";

export interface CreateContentInput {
  id: string;
  createdAt: Date;
  link: string;

  title: string;
  description: string;
  userId: string;
}

export default async function DashboardPage() {
  const userInfo = await userExists();
  const userId = userInfo?.user?.id;

  if (!userId) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const userDashboardContents = await getContentsByUserId(userId); // Replace with actual data fetching logic
  
  const websiteArray = await getWebsiteCategoryTypes(userId);
  console.log("websiteArray : ", websiteArray);
  
  return (
    <div className="flex flex-row gap-3.5 overflow-x-auto overflow-y-hidden p-0 thin-scrollbar">
      {/* <ContentCard /> */}
      {/* <HeroHeader userId={userId} /> */}
      {userDashboardContents?.map((content: CreateContentInput) => (
        <ContentCard
          key={content.id}
          id={content.id}
          title={content.title}
          description={content.description}
          link={content.link}
          createdAt={content.createdAt}
          userId={userId}
        />
      ))}
    </div>
  );
}
