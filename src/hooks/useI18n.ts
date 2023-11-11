import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useI18N = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en'

    setCurrentLanguage(newLanguage)
    changeLanguage(newLanguage).catch(console.log)
  }

  return { handleChangeLanguage, t }
}
