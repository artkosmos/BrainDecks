import s from './Pagination.module.scss'

import { usePagination } from '@/hooks'

type Props = {
  siblingCount: number
  totalCount: number
  currentPage: number
  pageSize: number
  onChange: (value: number) => void
  className?: string
}
export const Pagination = (props: Props) => {
  const { currentPage, totalCount, siblingCount, pageSize, onChange, className } = props

  const paginationRange = usePagination(totalCount, pageSize, currentPage, siblingCount)

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onChange(currentPage + 1)
  }

  const onPrevious = () => {
    onChange(currentPage - 1)
  }

  // const getCurrenPageHandler = (event: MouseEventHandler<HTMLLIElement>) => {}

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={`${s.paginationContainer} ${className ? s[className] : ''}`}>
      <li
        className={`${s.paginationArrow} ${currentPage === 1 && s.disabled}`}
        onClick={onPrevious}
      >
        <div className={s.leftArrow} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === 'DOTS') {
          return (
            <li key={index} className={s.dots}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={index}
            className={`${s.paginationItem} ${pageNumber === currentPage && s.selected}`}
            onClick={() => onChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={`${s.paginationArrow} ${currentPage === lastPage && s.disabled}`}
        onClick={onNext}
      >
        <div className={s.rightArrow} />
      </li>
    </ul>
  )
}
