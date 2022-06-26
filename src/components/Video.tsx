import { gql, useQuery } from "@apollo/client";
import { DefaultControls, DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, CircleNotch, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";

import '@vime/core/themes/default.css';
import '@vime/core/themes/light.css';
import { isPast } from "date-fns";
import { Navigate } from "react-router-dom";

const GET_LESSON_QUERY = gql`
  query LessonBySlug($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      availableAt
      teacher {
        avatarURL
        bio
        name
      }
    }
  }
`

type Teacher = {
  avatarURL: string
  bio: string
  name: string
}

interface GetLessonBySlugResponse {
  title: string
  videoId: string,
  description: string
  availableAt: Date
  teacher: Teacher
}

interface VideoProps {
  lessonSlug?: string
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<{ lesson: GetLessonBySlugResponse }>(GET_LESSON_QUERY, {
    variables: {
      slug: lessonSlug
    }
  })

  if (!data) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <CircleNotch size={ 80 } className='animate-spin' />
      </div>
    )
  }

  const { lesson: { title, description, videoId, teacher, availableAt } } = data

  if (!isPast(new Date(availableAt))) {
    return <Navigate to='/' replace />
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player
            theme="dark"
            // @ts-ignore
            style={{ '--vm-player-theme': '#29292E' }}
          >
            <Youtube key={ videoId } videoId={ videoId } />
            <DefaultUi noControls>
              <DefaultControls hideOnMouseLeave activeDuration={2000}  />
            </DefaultUi>
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              { title }
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              { description }
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={ teacher.avatarURL } alt="Avatar"
              />
              <div className="leading-relaxed">
                <strong
                  className="font-bold text-2xl block"
                >
                  { teacher.name }
                </strong>
                <span className="text-gray-200 text-sm block">
                  { teacher.bio }
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className={`
              p-4 text-sm bg-green-500 rounded font-bold uppercase gap-2
              flex items-center justify-center
              hover:bg-green-700 transition-colors
            `}>
              <DiscordLogo size={ 24 } />
              Comunidade no Discord
            </a>
            <a href="#" className={`
              p-4 text-sm border border-blue-500 text-blue-500
              rounded font-bold uppercase gap-2 flex items-center justify-center
              hover:bg-blue-500 hover:text-gray-900 transition-colors
            `}>
              <Lightning size={ 24 } />
              Acesse o desafio
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="#"
            className={`
              bg-gray-700 rounded overflow-hidden flex items-stretch gap-6
              hover:bg-gray-600 transition-colors
            `}
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={ 40 } />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200">
                Acesse o material complementar para acelerar seu progresso
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight />
            </div>
          </a>
          <a href="#"
            className={`
              bg-gray-700 rounded overflow-hidden flex items-stretch gap-6
              hover:bg-gray-600 transition-colors
            `}
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={ 40 } />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
