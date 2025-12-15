import {getIndividualContentById} from "@/app/actions/content";
import ShareOneCardPage from "@/components/dashboard/card/shareOneCard";

export default async function ShareOnePage({
  params,
}: {
  params: {contentId: string};
}) {
  const {contentId} = await params;
  const data = await getIndividualContentById(contentId);

  if (!data) {
    return <div>Content not found</div>;
  }

  return (
    <div className="max-w-screen justify-self-center">
      <ShareOneCardPage
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
