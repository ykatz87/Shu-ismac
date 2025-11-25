import { AdjectiveCategory } from '../types';

export const ADJECTIVES_DATA: AdjectiveCategory[] = [
  {
    id: 'colors',
    name: 'צבעים',
    adjectives: [
      { id: 'ad1', hebrew: 'אדום', masculine: 'אַחְמַר', feminine: 'חַמְרַא', plural: 'חֻמֹר' },
      { id: 'ad2', hebrew: 'כחול', masculine: 'אַזְרַק', feminine: 'זַרְקַא', plural: 'זֻרֹק' },
      { id: 'ad3', hebrew: 'ירוק', masculine: 'אַחְ׳צַ׳ר', feminine: 'חַ׳צְ׳רַא', plural: 'חֻ׳צֹ׳ר' },
      { id: 'ad4', hebrew: 'צהוב', masculine: 'אַצְפַר', feminine: 'צַפְרַא', plural: 'צֻפֹר' },
      { id: 'ad5', hebrew: 'לבן', masculine: 'אַבְּיַצ׳', feminine: 'בֵּיצַ׳א', plural: 'בִּיצ׳' },
      { id: 'ad6', hebrew: 'שחור', masculine: 'אַסְוַד', feminine: 'סוֹדַא', plural: 'סוּד' },
    ],
  },
  {
    id: 'sizes',
    name: 'גדלים ומצבים',
    adjectives: [
      { id: 'ad7', hebrew: 'גדול', masculine: 'כְּבִּיר', feminine: 'כְּבִּירֶה', plural: 'כְּבַּאר' },
      { id: 'ad8', hebrew: 'קטן', masculine: 'זְעִ׳יר', feminine: 'זְעִ׳ירֶה', plural: 'זְעַ׳אר' },
      { id: 'ad9', hebrew: 'ארוך/גבוה', masculine: 'טַוִיל', feminine: 'טַוִילֶה', plural: 'טְוַאל' },
      { id: 'ad10', hebrew: 'קצר/נמוך', masculine: 'קַצִיר', feminine: 'קַצִירֶה', plural: 'קְצַאר' },
      { id: 'ad11', hebrew: 'חדש', masculine: 'גְ׳דִיד', feminine: 'גְ׳דִידֶה', plural: 'גְ׳דַאד' },
      { id: 'ad12', hebrew: 'ישן', masculine: 'קַדִים', feminine: 'קַדִימֶה', plural: 'קֻדַאם' },
      { id: 'ad24', hebrew: 'רחב', masculine: 'וַאסֵע', feminine: 'וַאסְעַה', plural: 'וַאסְעִין' },
      { id: 'ad25', hebrew: 'צר', masculine: 'צַ׳יְיֵק', feminine: 'צַ׳יְיְקַה', plural: 'צַ׳יְיְקִין' },
    ],
  },
  {
    id: 'feelings',
    name: 'תחושות ורגשות',
    adjectives: [
      { id: 'ad13', hebrew: 'שמח', masculine: 'מַבְּסוּט', feminine: 'מַבְּסוּטַה', plural: 'מַבְּסוּטִין' },
      { id: 'ad14', hebrew: 'עצוב/כועס', masculine: 'זַעְלַאן', feminine: 'זַעְלַאנֶה', plural: 'זַעְלַאנִין' },
      { id: 'ad15', hebrew: 'עייף', masculine: 'תַעְבַּאן', feminine: 'תַעְבַּאנֶה', plural: 'תַעְבַּאנִין' },
      { id: 'ad16', hebrew: 'רעב', masculine: 'ג׳וֹעַאן', feminine: 'ג׳וֹעַאנֶה', plural: 'ג׳וֹעַאנִין' },
      { id: 'ad17', hebrew: 'צמא', masculine: 'עַטְשַאן', feminine: 'עַטְשַאנֶה', plural: 'עַטְשַאנִין' },
    ],
  },
  {
    id: 'general',
    name: 'תכונות כלליות',
    adjectives: [
      { id: 'ad18', hebrew: 'טוב', masculine: 'מְנִיח', feminine: 'מְנִיחַה', plural: 'מְנַאח' },
      { id: 'ad19', hebrew: 'רע', masculine: 'עַאטֵל', feminine: 'עַאטְלֶה', plural: 'עַאטְלִין' },
      { id: 'ad20', hebrew: 'יפה', masculine: 'חִלוּ', feminine: 'חִלְוֶה', plural: 'חִלְוִין' },
      { id: 'ad21', hebrew: 'מכוער', masculine: 'בִּשֵע', feminine: 'בִּשְעַה', plural: 'בִּשְעִין' },
      { id: 'ad22', hebrew: 'נקי', masculine: 'נְצִ׳יף', feminine: 'נְצִ׳יפֶה', plural: 'נְצַ׳אף' },
      { id: 'ad23', hebrew: 'מלוכלך', masculine: 'וִסֵח׳', feminine: 'וִסְחַ׳ה', plural: 'וִסְחִ׳ין' },
      { id: 'ad26', hebrew: 'טעים', masculine: 'זַאכִּי', feminine: 'זַאכְּיֶה', plural: 'זַאכְּיִין' },
      { id: 'ad27', hebrew: 'חשוב', masculine: 'מֻהֵםְם', feminine: 'מֻהֵםְמֶה', plural: 'מֻהֵםְמִין' },
      { id: 'ad28', hebrew: 'נכון', masculine: 'צַחְח', feminine: 'צַחְח', plural: 'צַחְח' },
      { id: 'ad29', hebrew: 'לא נכון', masculine: 'עַ׳לַט', feminine: 'עַ׳לַט', plural: 'עַ׳לַט' },
    ],
  },
];