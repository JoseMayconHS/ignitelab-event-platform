import { Link } from "react-router-dom"

interface LessonLinkProps {
  active: boolean
  to: string
  children?: any
  className?: string
}

export function LessonLink({ active, children, className = '', ...rest }: LessonLinkProps) {
  return active ? (
    <Link { ...rest } className={ className }>
      { children }
    </Link>
  ) : (
    <div className={ `${ className } pointer-events-none select-none` }>
      { children }
    </div>
  )
}
