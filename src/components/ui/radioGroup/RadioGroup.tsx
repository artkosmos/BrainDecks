import { Label } from '@radix-ui/react-label'
import * as Radio from '@radix-ui/react-radio-group'

import style from './RadioGroup.module.scss'

import { Typography } from '@/components/ui/typography'

export const RadioGroup = () => {
  return (
    <Radio.Root className={style.root}>
      <Label className={style.label}>
        <Typography variant={'body2'} color={'light'}>
          First
        </Typography>
        <Radio.Item value={'first'} className={style.item}>
          <Radio.Indicator className={style.indicator} />
        </Radio.Item>
      </Label>
      <Label className={style.label}>
        <Typography variant={'body2'} color={'light'}>
          Second
        </Typography>
        <Radio.Item value={'second'} className={style.item}>
          <Radio.Indicator className={style.indicator} />
        </Radio.Item>
      </Label>
      <Label className={style.label}>
        <Typography variant={'body2'} color={'light'}>
          None
        </Typography>
        <Radio.Item value={'none'} className={style.item}>
          <Radio.Indicator className={style.indicator} />
        </Radio.Item>
      </Label>
    </Radio.Root>
  )
}
