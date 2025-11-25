import { ParticipleBinyan } from '../types';

export const PARTICIPLES_DATA: ParticipleBinyan[] = [
  {
    id: 'binyan1',
    name: 'בניין 1 (פַעַל)',
    explanation: 'בבניין הראשון, בינוני פועל נוצר בתבנית "פַאעֵל" (כמו כַּאתֵבּ), ובינוני פעול נוצר בתבנית "מַפְעוּל" (כמו מַכְּתוּבּ).',
    examples: [
      {
        id: 'p1-ktb',
        root: 'כ-ת-ב',
        verb: { transliteration: 'כַּתַבּ', hebrew: 'הוא כתב' },
        active: { transliteration: 'כַּאתֵבּ', hebrew: 'כותב' },
        passive: { transliteration: 'מַכְּתוּבּ', hebrew: 'כתוב' }
      },
      {
        id: 'p1-shrb',
        root: 'ש-ר-ב',
        verb: { transliteration: 'שִרֵבּ', hebrew: 'הוא שתה' },
        active: { transliteration: 'שַארֵבּ', hebrew: 'שותה' },
        passive: { transliteration: 'מַשְרוּבּ', hebrew: 'שתוי' }
      },
      {
        id: 'p1-akl',
        root: 'א-כ-ל',
        verb: { transliteration: 'אַכַּל', hebrew: 'הוא אכל' },
        active: { transliteration: 'אַאכֵּל', hebrew: 'אוכל' },
        passive: { transliteration: 'מַאְכּוּל', hebrew: 'אכול' }
      }
    ]
  },
  {
    id: 'binyan2',
    name: 'בניין 2 (פַעְעַל)',
    explanation: 'בבניין השני, גם בינוני פועל וגם בינוני פעול מתחילים ב-מ\'. בינוני פועל הוא בתבנית "מְפַעְעֵל" (כמו מְעַלְלֵם), ובינוני פעול בתבנית "מְפַעְעַל" (כמו מְעַלְלַם). ההבדל הוא בתנועה של העיצור השני.',
    examples: [
       {
        id: 'p2-alm',
        root: 'ע-ל-ם',
        verb: { transliteration: 'עַלְלַם', hebrew: 'הוא לימד' },
        active: { transliteration: 'מְעַלְלֵם', hebrew: 'מלמד' },
        passive: { transliteration: 'מְעַלְלַם', hebrew: 'נלמד / מלומד' }
      },
      {
        id: 'p2-skr',
        root: 'ס-כ-ר',
        verb: { transliteration: 'סַכְכַּר', hebrew: 'הוא סגר' },
        active: { transliteration: 'מְסַכְכֵּר', hebrew: 'סוגר' },
        passive: { transliteration: 'מְסַכְכַּר', hebrew: 'סגור' }
      }
    ]
  }
];