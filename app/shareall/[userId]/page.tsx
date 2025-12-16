import {CreateContentInput} from "@/app/(loggedin)/dashboard/page";
import {
  getAllBrainShareLinkHashContent,
  getContentsByUserId,
} from "@/app/actions/content";
import ShareCard from "@/components/dashboard/card/shareCard";

export default async function ShareAllPage({
  params,
}: {
  params: {userId: string};
}) {
  const {userId} = await params;
  const hash = await getAllBrainShareLinkHashContent(userId);

  if (!hash) {
    return <div>Content not found</div>;
  }

  const userDashboardContents = await getContentsByUserId(hash.userId);

  return (
    <div className="flex flex-row gap-3.5 overflow-x-auto overflow-y-hidden p-0 thin-scrollbar">
      {/* <ContentCard /> */}
      {userDashboardContents?.map((content: CreateContentInput) => (
        <ShareCard
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
