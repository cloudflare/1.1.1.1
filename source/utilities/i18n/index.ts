import i18nInstance from './i18n'
import TranslationKeys from './keys'

declare namespace I18nTypes {
  export interface StringTranslator {
    (key: TranslationKeys): string
  }
}

export { TranslationKeys, I18nTypes }
