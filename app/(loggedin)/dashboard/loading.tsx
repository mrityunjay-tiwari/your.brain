// app/dashboard/[contentCategory]/loading.tsx

export default function LoadingCategoryPage() {
  return (
    <div className="flex h-full w-full items-center justify-left">
      <div className="flex gap-3">
        {[1, 2, 3,4,5,6,7].map((i) => (
          <div
            key={i}
            className="h-[550px] w-72 rounded-lg bg-zinc-200 dark:bg-zinc-700 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
