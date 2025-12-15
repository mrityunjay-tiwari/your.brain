import { getContentsByUserId } from "@/app/actions/content";
import userExists from "@/app/actions/getUser";
import ContentCard from "@/components/dashboard/card/card";
import { ContentType } from "@/lib/generated/prisma/enums";

interface CreateContentInput {
  id: string
  createdAt: Date
  link: string
  type: ContentType
  title: string
  description: string
  userId: string
}

export default async function DashboardPage() {
  const userInfo = await userExists();
  const userId = userInfo?.user?.id;
  
  if (!userId) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const userDashboardContents = await getContentsByUserId(userId); // Replace with actual data fetching logic

  return (
    <div className="flex flex-row gap-3.5 overflow-x-auto overflow-y-hidden p-0 thin-scrollbar">
      {/* <ContentCard /> */}
      {userDashboardContents?.map((content: CreateContentInput) => (
        <ContentCard
          key={content.id}
          id={content.id}
          title={content.title}
          description={content.description}
          link={content.link}
          type={content.type}
          createdAt={content.createdAt}
          userId={userId}
        />
      ))}
    </div>
  );
}
