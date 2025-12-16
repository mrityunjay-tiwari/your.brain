import {
  getIndividualContentById,
  getIndividualShareLinkHashContent,
} from "@/app/actions/content";
import ShareCard from "@/components/dashboard/card/shareCard";

export default async function ShareOnePage({
  params,
}: {
  params: {hashId: string};
}) {
  const {hashId} = await params;

  const hash = await getIndividualShareLinkHashContent(hashId);
  if (!hash) {
    return <div>Invalid or expired share link.</div>;
  }

  const contentId = hash.contentId;

  const data = await getIndividualContentById(contentId);
  if (!data) {
    return <div>Content not found.</div>;
  }

  return (
    <div className="max-w-screen justify-self-center">
      <ShareCard
        createdAt={data.createdAt}
        description={data.description}
        id={data.id}
        link={data.link}
        title={data.title}
        type={data.type}
        userId={data.userId}
        key={data.id}
      />
    </div>
  );
}
