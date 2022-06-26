import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

interface Params {
  slug: string
}

export function Events() {
  const { slug } = useParams<keyof Params>()

  return (
    <>
      {
        slug ? (
          <Video lessonSlug={ slug } />
        ) : <div className="flex-1" />
      }
      <Sidebar />
    </>
  )
}
