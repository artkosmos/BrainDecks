import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>
export const PlayCardIcon = ({ ...rest }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_23657_2616)">
        <path
          d="M8.00004 1.33334C6.6815 1.33334 5.39257 1.72434 4.29624 2.45688C3.19991 3.18942 2.34543 4.23061 1.84085 5.44879C1.33626 6.66696 1.20424 8.00741 1.46148 9.30061C1.71871 10.5938 2.35365 11.7817 3.286 12.7141C4.21835 13.6464 5.40624 14.2813 6.69944 14.5386C7.99265 14.7958 9.33309 14.6638 10.5513 14.1592C11.7694 13.6546 12.8106 12.8001 13.5432 11.7038C14.2757 10.6075 14.6667 9.31855 14.6667 8.00001C14.6667 7.12453 14.4943 6.25762 14.1592 5.44879C13.8242 4.63995 13.3331 3.90502 12.7141 3.28596C12.095 2.66691 11.3601 2.17584 10.5513 1.84081C9.74243 1.50578 8.87552 1.33334 8.00004 1.33334ZM8.00004 13.3333C6.94521 13.3333 5.91406 13.0205 5.037 12.4345C4.15994 11.8485 3.47635 11.0155 3.07269 10.041C2.66902 9.06645 2.5634 7.99409 2.76919 6.95953C2.97498 5.92496 3.48293 4.97465 4.22881 4.22877C4.97469 3.48289 5.925 2.97494 6.95956 2.76916C7.99413 2.56337 9.06648 2.66899 10.041 3.07265C11.0156 3.47632 11.8485 4.15991 12.4345 5.03697C13.0206 5.91403 13.3334 6.94518 13.3334 8.00001C13.3334 9.4145 12.7715 10.7711 11.7713 11.7712C10.7711 12.7714 9.41453 13.3333 8.00004 13.3333Z"
          fill="white"
        />
        <path
          d="M8.22666 4.96667C8.06331 4.81613 7.85932 4.71692 7.64004 4.68136C7.42077 4.6458 7.19588 4.67547 6.99333 4.76667C6.7967 4.84621 6.62825 4.98257 6.5095 5.15832C6.39075 5.33407 6.32709 5.54123 6.32666 5.75334V10.2467C6.32709 10.4588 6.39075 10.6659 6.5095 10.8417C6.62825 11.0174 6.7967 11.1538 6.99333 11.2333C7.13784 11.2989 7.29464 11.333 7.45333 11.3333C7.73927 11.3321 8.01467 11.2252 8.22666 11.0333L10.6667 8.78667C10.7758 8.68674 10.8629 8.56519 10.9226 8.42976C10.9822 8.29433 11.013 8.14798 11.013 8C11.013 7.85203 10.9822 7.70568 10.9226 7.57025C10.8629 7.43482 10.7758 7.31327 10.6667 7.21334L8.22666 4.96667ZM7.66666 9.73334V6.26667L9.53999 8L7.66666 9.73334Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_23657_2616">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
