import { flow } from "fp-ts/function"   // fp-ts是typescript下的函数式编程框架
import { useI18n as _useI18n } from "vue-i18n"

export const useI18n = flow(_useI18n, (x) => x.t)

export const useFullI18n = _useI18n
