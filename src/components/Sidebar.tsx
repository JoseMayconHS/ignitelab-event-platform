import { gql, useQuery } from "@apollo/client";
import { Lesson, LessonType } from "./Lesson";

const GET_LESSONS_QUERY = gql`
  query MyQuery {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      slug
      title
    }
  }
`

interface GetLessonsQueryResponse {
  lessons: {
    availableAt: Date
    id: string
    lessonType: LessonType
    slug: string
    title: string
  }[]
}

interface SidebarProps {
  lessonSlug?: string
}

export function Sidebar({ lessonSlug }: SidebarProps) {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>
      <div className="flex flex-col gap-8">
        {
          data?.lessons.map(({ id, availableAt, lessonType, slug, title }) => (
            <Lesson
              key={ id }
              slugActive={ lessonSlug }
              lesson={{
                title, slug, type: lessonType, availableAt: new Date(availableAt)
              }}
            />
          ))
        }
      </div>
    </aside>
  )
}
