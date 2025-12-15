"use client";
import Link from "next/link";
import {Tweet} from "react-tweet";

export default function SampleTweet() {
  const id = "1998634644468568428";
  return (
    <>
      <Link
        href={`https://twitter.com/i/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer max-w-[400px]"
      >
        <Tweet id={id} />
      </Link>
    </>
  );
}
