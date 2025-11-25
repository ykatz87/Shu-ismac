import { Binyan } from '../types';

export const VERBS_DATA: Binyan[] = [
  {
    id: 'binyan1',
    name: 'בניין 1',
    patterns: [
      {
        id: 'p1-faal',
        name: 'תבנית פַעַל (כמו כַּתַבּ)',
        verbs: [
          {
            id: 'v1-katab',
            infinitive: 'כַּתַבּ',
            root: 'כ-ת-ב',
            conjugations: {
              past: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'כַּתַבְּת', hebrew: 'כתבתי' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'כַּתַבְּת', hebrew: 'כתבת' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'כַּתַבְּתי', hebrew: 'כתבת' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'כַּתַבּ', hebrew: 'כתב' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'כַּתְבַּת', hebrew: 'כתבה' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'כַּתַבְּנַא', hebrew: 'כתבנו' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'כַּתַבְּתוּ', hebrew: 'כתבתם/ן' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'כַּתַבּוּ', hebrew: 'כתבו' },
                ],
              },
              present: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'בַּכְּתֹבּ', hebrew: 'כותב/ת' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'בִּתֻכְּתֹבּ', hebrew: 'כותב' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'בִּתֻכְּתְבּי', hebrew: 'כותבת' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'בִּיֻכְּתֹבּ', hebrew: 'כותב' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'בִּתֻכְּתֹבּ', hebrew: 'כותבת' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'בִּנֻכְּתֹבּ', hebrew: 'כותבים/ות' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'בִּתֻכְּתְבּוּ', hebrew: 'כותבים/ות' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'בִּיֻכְּתְבּוּ', hebrew: 'כותבים/ות' },
                ],
              },
              future: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'רַח אַכְּתֹבּ', hebrew: 'אכתוב' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'רַח תֻכְּתֹבּ', hebrew: 'תכתוב' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'רַח תֻכְּתְבּי', hebrew: 'תכתבי' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'רַח יֻכְּתֹבּ', hebrew: 'יכתוב' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'רַח תֻכְּתֹבּ', hebrew: 'תכתוב' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'רַח נֻכְּתֹבּ', hebrew: 'נכתוב' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'רַח תֻכְּתְבּוּ', hebrew: 'תכתבו' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'רַח יֻכְּתְבּוּ', hebrew: 'יכתבו' },
                ],
              },
              imperative: {
                conjugations: [
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'אֻכְּתֹבּ', hebrew: 'כתוב!' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'אֻכְּתְבּי', hebrew: 'כתבי!' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'אֻכְּתְבּוּ', hebrew: 'כתבו!' },
                ],
              },
            },
          },
          {
            id: 'v1-akal',
            infinitive: 'אַכַּל',
            root: 'א-כ-ל',
            conjugations: {
              past: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'אַכַּלְת', hebrew: 'אכלתי' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'אַכַּלְת', hebrew: 'אכלת' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'אַכַּלְתי', hebrew: 'אכלת' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'אַכַּל', hebrew: 'אכל' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'אַכְּלַת', hebrew: 'אכלה' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'אַכַּלְנַא', hebrew: 'אכלנו' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'אַכַּלְתוּ', hebrew: 'אכלתם/ן' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'אַכַּלוּ', hebrew: 'אכלו' },
                ],
              },
              present: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'בַּאכֹּל', hebrew: 'אוכל/ת' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'בְּתַאכֹּל', hebrew: 'אוכל' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'בְּתַאכְּלי', hebrew: 'אוכלת' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'בְּיַאכֹּל', hebrew: 'אוכל' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'בְּתַאכֹּל', hebrew: 'אוכלת' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'בְּנַאכֹּל', hebrew: 'אוכלים/ות' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'בְּתַאכְּלוּ', hebrew: 'אוכלים/ות' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'בְּיַאכְּלוּ', hebrew: 'אוכלים/ות' },
                ],
              },
              future: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'רַח אַאכֹּל', hebrew: 'אֹכַל' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'רַח תַאכֹּל', hebrew: 'תֹאכַל' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'רַח תַאכְּלי', hebrew: 'תֹאכְלי' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'רַח יַאכֹּל', hebrew: 'יֹאכַל' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'רַח תַאכֹּל', hebrew: 'תֹאכַל' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'רַח נַאכֹּל', hebrew: 'נֹאכַל' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'רַח תַאכְּלוּ', hebrew: 'תֹאכְלו' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'רַח יַאכְּלוּ', hebrew: 'יֹאכְלו' },
                ],
              },
              imperative: {
                conjugations: [
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'כֹּל', hebrew: 'אֱכוֹל!' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'כֹּלי', hebrew: 'אִכְלי!' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'כֹּלוּ', hebrew: 'אִכְלו!' },
                ],
              },
            },
          },
        ],
      },
      {
        id: 'p1-fiil',
        name: 'תבנית פִעֵל (כמו שִרֵבּ)',
        verbs: [
           {
            id: 'v1-shirib',
            infinitive: 'שִרֵבּ',
            root: 'ש-ר-ב',
            conjugations: {
              past: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'שְרִבְּת', hebrew: 'שתיתי' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'שְרִבְּת', hebrew: 'שתית' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'שְרִבְּתי', hebrew: 'שתית' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'שִרֵבּ', hebrew: 'שתה' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'שִרְבַּת', hebrew: 'שתתה' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'שְרִבְּנַא', hebrew: 'שתינו' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'שְרִבְּתוּ', hebrew: 'שתיתם/ן' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'שִרְבּוּ', hebrew: 'שתו' },
                ],
              },
              present: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'בַּשְרַבּ', hebrew: 'שותה' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'בִּתִשְרַבּ', hebrew: 'שותה' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'בִּתִשְרַבּי', hebrew: 'שותה' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'בִּיִשְרַבּ', hebrew: 'שותה' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'בִּתִשְרַבּ', hebrew: 'שותה' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'בִּנִשְרַבּ', hebrew: 'שותים/ות' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'בִּתִשְרַבּוּ', hebrew: 'שותים/ות' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'בִּיִשְרַבּוּ', hebrew: 'שותים/ות' },
                ],
              },
              future: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'רַח אַשְרַבּ', hebrew: 'אשתה' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'רַח תִשְרַבּ', hebrew: 'תשתה' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'רַח תִשְרַבּי', hebrew: 'תשתי' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'רַח יִשְרַבּ', hebrew: 'ישתה' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'רַח תִשְרַבּ', hebrew: 'תשתה' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'רַח נִשְרַבּ', hebrew: 'נשתה' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'רַח תִשְרַבּוּ', hebrew: 'תשתו' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'רַח יִשְרַבּוּ', hebrew: 'ישתו' },
                ],
              },
              imperative: {
                conjugations: [
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'אִשְרַבּ', hebrew: 'שתה!' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'אִשְרַבּי', hebrew: 'שתי!' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'אִשְרַבּוּ', hebrew: 'שתו!' },
                ],
              },
            },
          },
        ]
      }
    ],
  },
  {
    id: 'binyan2',
    name: 'בניין 2',
    patterns: [
      {
        id: 'p2-faal',
        name: 'תבנית פַעְעַל (כמו עַלְלַם)',
        verbs: [
          {
            id: 'v2-allam',
            infinitive: 'עַלְלַם',
            root: 'ע-ל-ם',
            conjugations: {
              past: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'עַלְלַמְת', hebrew: 'לימדתי' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'עַלְלַמְת', hebrew: 'לימדת' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'עַלְלַמְתי', hebrew: 'לימדת' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'עַלְלַם', hebrew: 'לימד' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'עַלְלַמַת', hebrew: 'לימדה' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'עַלְלַמְנַא', hebrew: 'לימדנו' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'עַלְלַמְתוּ', hebrew: 'לימדתם/ן' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'עַלְלַמוּ', hebrew: 'לימדו' },
                ],
              },
              present: {
                conjugations: [
                  { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'בַּעַלְלֵם', hebrew: 'מלמד/ת' },
                  { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'בִּתְעַלְלֵם', hebrew: 'מלמד' },
                  { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'בִּתְעַלְלְמי', hebrew: 'מלמדת' },
                  { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'בִּיעַלְלֵם', hebrew: 'מלמד' },
                  { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'בִּתְעַלְלֵם', hebrew: 'מלמדת' },
                  { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'בִּנְעַלְלֵם', hebrew: 'מלמדים/ות' },
                  { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'בִּתְעַלְלְמוּ', hebrew: 'מלמדים/ות' },
                  { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'בִּיעַלְלְמוּ', hebrew: 'מלמדים/ות' },
                ]
              },
            },
          },
          {
            id: 'v2-sakkar',
            infinitive: 'סַכְכַּר',
            root: 'ס-כ-ר',
            conjugations: {
                past: {
                    conjugations: [
                        { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'סַכְכַּרְת', hebrew: 'סגרתי' },
                        { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'סַכְכַּרְת', hebrew: 'סגרת' },
                        { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'סַכְכַּרְתי', hebrew: 'סגרת' },
                        { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'סַכְכַּר', hebrew: 'סגר' },
                        { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'סַכְכַּרַת', hebrew: 'סגרה' },
                        { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'סַכְכַּרְנַא', hebrew: 'סגרנו' },
                        { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'סַכְכַּרְתוּ', hebrew: 'סגרתם/ן' },
                        { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'סַכְכַּרוּ', hebrew: 'סגרו' },
                    ],
                },
                present: {
                    conjugations: [
                        { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'בַּסַכְכֵּר', hebrew: 'סוגר/ת' },
                        { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'בִּתְסַכְכֵּר', hebrew: 'סוגר' },
                        { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'בִּתְסַכְכְּרי', hebrew: 'סוגרת' },
                        { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'בִּיסַכְכֵּר', hebrew: 'סוגר' },
                        { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'בִּתְסַכְכֵּר', hebrew: 'סוגרת' },
                        { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'בִּנְסַכְכֵּר', hebrew: 'סוגרים/ות' },
                        { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'בִּתְסַכְכְּרוּ', hebrew: 'סוגרים/ות' },
                        { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'בִּיסַכְכְּרוּ', hebrew: 'סוגרים/ות' },
                    ],
                },
                future: {
                    conjugations: [
                        { pronoun: 'אני', arabicPronoun: 'אַנַא', transliteration: 'רַח אַסַכְכֵּר', hebrew: 'אסגור' },
                        { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'רַח תְסַכְכֵּר', hebrew: 'תסגור' },
                        { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'רַח תְסַכְכְּרי', hebrew: 'תסגרי' },
                        { pronoun: 'הוא', arabicPronoun: 'הֻוְוֶ', transliteration: 'רַח יְסַכְכֵּר', hebrew: 'יסגור' },
                        { pronoun: 'היא', arabicPronoun: 'הִיְיֶ', transliteration: 'רַח תְסַכְכֵּר', hebrew: 'תסגור' },
                        { pronoun: 'אנחנו', arabicPronoun: 'אִחְנַא', transliteration: 'רַח נְסַכְכֵּר', hebrew: 'נסגור' },
                        { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'רַח תְסַכְכְּרוּ', hebrew: 'תסגרו' },
                        { pronoun: 'הם/ן', arabicPronoun: 'הֻםְמֶ', transliteration: 'רַח יְסַכְכְּרוּ', hebrew: 'יסגרו' },
                    ],
                },
                imperative: {
                    conjugations: [
                        { pronoun: 'אתה', arabicPronoun: 'אִנְתֶ', transliteration: 'סַכְכֵּר', hebrew: 'סגור!' },
                        { pronoun: 'את', arabicPronoun: 'אִנְתי', transliteration: 'סַכְכְּרי', hebrew: 'סגרי!' },
                        { pronoun: 'אתם/ן', arabicPronoun: 'אִנְתוּ', transliteration: 'סַכְכְּרוּ', hebrew: 'סגרו!' },
                    ],
                },
            },
          },
        ]
      }
    ],
  },
];