import s from './Pagination.module.scss'

import { Selector } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { usePagination } from '@/hooks'

type Props = {
  options: string[]
  siblingCount?: number
  totalCount: number
  currentPage: number
  pageSize: number
  onChange: (value: number) => void
  className?: string
  selectFilterChange?: (value: number) => void
}
export const Pagination = (props: Props) => {
  const {
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    onChange,
    className,
    options,
    selectFilterChange,
  } = props

  const paginationRange = usePagination(totalCount, pageSize, currentPage, siblingCount)

  if (currentPage === 0 || paginationRange.length < 1) {
    return null
  }

  const nextPageHandler = () => {
    onChange(currentPage + 1)
  }

  const previousPageHandler = () => {
    onChange(currentPage - 1)
  }

  const changeSelectFilterHandler = (value: string) => {
    selectFilterChange?.(Number(value))
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  const paginationContainerClassName = `${s.paginationContainer} ${className ? s[className] : ''}`

  const paginationLeftArrowClassName = `${s.paginationArrow} ${currentPage === 1 && s.disabled}`

  const paginationRightArrowClassName = `${s.paginationArrow} ${
    currentPage === lastPage && s.disabled
  }`

  const mappedPages = paginationRange.map((page, index) => {
    const paginationItemClassName = `${s.paginationItem} ${page === currentPage && s.selected}`

    const typographyClassName = page === currentPage ? s.textColorDark : s.textColorLight

    if (page === 'DOTS') {
      return (
        <li key={index} className={s.dots}>
          &#8230;
        </li>
      )
    }

    return (
      <li key={index} className={paginationItemClassName} onClick={() => onChange(Number(page))}>
        <Typography variant={'body2'} className={typographyClassName}>
          {page}
        </Typography>
      </li>
    )
  })

  return (
    <ul className={paginationContainerClassName}>
      <li className={paginationLeftArrowClassName} onClick={previousPageHandler}>
        <div className={`${s.arrow} ${s.leftArrow}`} />
      </li>
      {mappedPages}
      <li className={paginationRightArrowClassName} onClick={nextPageHandler}>
        <div className={`${s.arrow} ${s.rightArrow}`} />
      </li>
      <div className={s.settings}>
        <Typography variant={'body2'} className={s.textColorLight}>
          Показать
        </Typography>
        <Selector
          triggerClassName={s.trigger}
          contentClassName={s.content}
          value={String(pageSize)}
          setSelectedValue={changeSelectFilterHandler}
          selectData={options}
        />
        <Typography variant={'body2'} className={s.textColorLight}>
          на странице
        </Typography>
      </div>
    </ul>
  )
}
