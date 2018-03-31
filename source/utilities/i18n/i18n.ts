import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
// import enUS from './lang/en-US'

export default i18n
  .use(LanguageDetector)
  .init({
    lng: 'en-US',
    debug: process.env.NODE_DEBUG === 'true',
    ns: ['sable'],
    defaultNS: 'sable',
    react: {
      wait: true
    },
    // resources: {
    //   ...enUS
    // }
  })
