import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

interface Params {
  slug: string
}

export function Events() {
  const { slug } = useParams<keyof Params>()

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className="flex flex-1">
        {
          slug ? (
            <Video lessonSlug={ slug } />
          ) : <div className="flex-1" />
        }
        <Sidebar lessonSlug={ slug } />
      </main>
    </div>
  )
}
