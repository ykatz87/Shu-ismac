
import { PseudoVerb } from '../types';

export const PSEUDO_VERBS_DATA: PseudoVerb[] = [
  {
    id: 'biddi',
    baseHebrew: 'רוצה',
    baseTransliteration: 'בִּדְד-',
    conjugations: [
      { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'בִּדְדי', hebrew: 'אני רוצה' },
      { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'בִּדְדַּכּ', hebrew: 'אתה רוצה' },
      { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'בִּדְדֶּכּ', hebrew: 'את רוצה' },
      { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'בִּדְדּוֹ', hebrew: 'הוא רוצה' },
      { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'בִּדְדְּהַא', hebrew: 'היא רוצה' },
      { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'בִּדְדְּנַא', hebrew: 'אנחנו רוצים/ות' },
      { pronoun: 'אתם / אתן', arabicPronoun: 'אִנְתוּ', transliteration: 'בִּדְדְּכֹּם', hebrew: 'אתם/ן רוצים/ות' },
      { pronoun: 'הם / הן', arabicPronoun: 'הֻםְמֶ', transliteration: 'בִּדְדְּהֹם', hebrew: 'הם/ן רוצים/ות' },
    ]
  },
  {
    id: 'indi',
    baseHebrew: 'יש לי',
    baseTransliteration: 'עִנְד-',
    conjugations: [
      { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'עִנְדי', hebrew: 'יש לי' },
      { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'עִנְדַכּ', hebrew: 'יש לך (ז)' },
      { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'עִנְדֶכּ', hebrew: 'יש לך (נ)' },
      { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'עִנְדוֹ', hebrew: 'יש לו' },
      { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'עִנְדְהַא', hebrew: 'יש לה' },
      { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'עִנְדְנַא', hebrew: 'יש לנו' },
      { pronoun: 'אתם / אתן', arabicPronoun: 'אִנְתוּ', transliteration: 'עִנְדְכֹּם', hebrew: 'יש לכם/ן' },
      { pronoun: 'הם / הן', arabicPronoun: 'הֻםְמֶ', transliteration: 'עִנְדְהֹם', hebrew: 'יש להם/ן' },
    ]
  }
];
