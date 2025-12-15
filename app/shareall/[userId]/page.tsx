import { CreateContentInput } from "@/app/(loggedin)/dashboard/page";
import {createAllShareLinkHashContent, getContentsByUserId, getIndividualContentById} from "@/app/actions/content";
import ContentCard from "@/components/dashboard/card/card";
import ShareOneCardPage from "@/components/dashboard/card/shareOneCard";

export default async function ShareAllPage({
  params,
}: {
  params: {userId: string};
}) {
  const {userId} = await params;
  const userDashboardContents = await getContentsByUserId(userId);

  if (!userDashboardContents) {
    return <div>Content not found</div>;
  }

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
