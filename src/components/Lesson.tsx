import { CheckCircle, Lock } from "phosphor-react"
import { format, isPast } from 'date-fns'
import { Link } from "react-router-dom"
import classNames from 'classnames'

import pt from "date-fns/locale/pt/index"

export type LessonType = 'live' | 'class'

interface Lesson {
  title: string
  slug: string
  availableAt: Date
  type: LessonType
}

interface LessonProps {
  slugActive?: string,
  lesson: Lesson
}

export function Lesson({ slugActive, lesson: { title, slug, availableAt, type }}: LessonProps) {
  const isLessonAvailable = isPast(availableAt)
  const availableDateFormatted = format(availableAt, `EEEE' • 'd' de 'MMMM' • 'k'h'mm`, {
    locale: pt
  })

  const isMe = slugActive === slug

  return (
    <Link to={`/event/lesson/${ slug }`}  className="group">
      <span className="text-gray-300">
        { availableDateFormatted }
      </span>
      <div className={ classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
        'bg-green-500': isMe
      }) }>
        <header className="flex items-center justify-between">
          {
            isLessonAvailable ? (
              <span className={classNames('flex items-center gap-2 text-sm font-medium', {
                'text-white': isMe,
                'text-blue-500': !isMe
              })}>
                <CheckCircle size={ 20 } />
                Conteúdo liberado
              </span>

            ) : (
              <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                <Lock size={ 20 } />
                Em breve
              </span>
            )
          }
          <span className={ classNames('text-xs rounded py-[0.125rem] px-2 text-white border font-bold uppercase', {
            'border-white': isMe,
            'border-green-300': !isMe
          }) }>
            {
              (type === 'live') ? 'ao vivo' : 'aula prática'
            }
          </span>
        </header>
        <strong className={classNames('mt-5 block', {
          'text-white': isMe,
          'text-gray-200': !isMe
        })}>
          { title }
        </strong>
      </div>
    </Link>
  )
}
