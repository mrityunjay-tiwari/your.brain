interface BlogPageProps {
  params: Promise<{
    blogId: string;
  }>;
}
export default async function BlogPageTSX({params}: BlogPageProps) {
  const {blogId} = await params;
  
  return (
    <div className="p-4">
      Hii this is [blogId] page tsx file
      <h1>BlogId : {blogId} </h1>
    </div>
);
}