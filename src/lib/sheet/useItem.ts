import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';
import useItemUICategory, { ItemUICategory } from './useItemUICategory';
import { validateKey, validateName } from '../../utils/filter';
import useClassJob from './useClassJob';
import useSalvage from './useSalvage';
import useClassJobCategory from './useClassJobCategory';
import useGrandCompany from './useGrandCompany';
import useItemSeries from './useItemSeries';
import useBaseParam, {
  parseBaseParam,
  parseBaseParamValue,
} from './useBaseParam';
import useItemSpecialBonus from './useItemSpecialBonus';

export type Item = {
  id: number;
  description: string;
  name: string;
  icon: string;
  itemLevel: number;
  rarity: number;
  itemUICategory: ItemUICategory;
  stackSize: number;
  isUnique: boolean;
  isUntradable: boolean;
  isIndisposable: boolean;
  lot: boolean;
  midPrice: number;
  lowPrice: number;
  canBeHq: boolean;
  isDyeable: boolean;
  isCrestWorthy: boolean;
  cooldown: number;
  repairClassJob: string | null;
  repairItem: string | null;
  glamourItem: string | null;
  salvage: number | null;
  isCollectable: boolean;
  alwaysCollectable: boolean;
  aetherialReduce: number;
  equipLevel: number;
  equipRestriction: number;
  classJobCategory: string;
  grandCompany: string;
  itemSeries: string;
  baseParamModifier: number;
  useClassJob: string;
  physDamage: number;
  magDamage: number;
  delay: number;
  blockRate: number;
  block: number;
  physDefense: number;
  magDefense: number;
  baseParam0?: string;
  baseParamValue0?: number;
  baseParam1?: string;
  baseParamValue1?: number;
  baseParam2?: string;
  baseParamValue2?: number;
  baseParam3?: string;
  baseParamValue3?: number;
  baseParam4?: string;
  baseParamValue4?: number;
  baseParam5?: string;
  baseParamValue5?: number;
  itemSpecialBonus: string;
  itemSpecialBonusParam: number;
  specialBaseParam0?: string;
  specialBaseParamValue0?: number;
  specialBaseParam1?: string;
  specialBaseParamValue1?: number;
  specialBaseParam2?: string;
  specialBaseParamValue2?: number;
  specialBaseParam3?: string;
  specialBaseParamValue3?: number;
  specialBaseParam4?: string;
  specialBaseParamValue4?: number;
  specialBaseParam5?: string;
  specialBaseParamValue5?: number;
  materializeType: number;
  materiaSlotCount: number;
  isAdvancedMeldingPermitted: boolean;
  isPvP: boolean;
  isGramourous: boolean;
};

function parseBoolean(value: string): boolean {
  return value === 'TRUE';
}

async function createItem(rows: Row[]): Promise<Item[]> {
  const itemUICategories = await useItemUICategory();
  const classJobs = await useClassJob();
  const salvages = await useSalvage();
  const classJobCategories = await useClassJobCategory();
  const grandCompanies = await useGrandCompany();
  const itemSeriesList = await useItemSeries();
  const baseParams = await useBaseParam();
  const itemSpecialBonuses = await useItemSpecialBonus();

  const items = rows.map((row) => {
    const row33 = parseInt(row[33], 10);
    const repairClassJob = row33 !== 0 ? classJobs[row33].name : null;

    const row34 = parseInt(row[34], 10);
    const repairItem = row34 ? rows[row34][10] : null;

    const row35 = parseInt(row[35], 10);
    const glamourItem = row35 ? rows[row35][10] : null;

    const row36 = parseInt(row[36], 10);
    const salvage = row36 ? salvages[row36].optimalSkill : null;

    return {
      id: parseInt(row[0], 10),
      description: row[9],
      name: row[10],
      icon: row[11],
      itemLevel: parseInt(row[12], 10),
      rarity: parseInt(row[13], 10),
      itemUICategory: itemUICategories[parseInt(row[16], 10)],
      stackSize: parseInt(row[20]),
      isUnique: parseBoolean(row[21]),
      isUntradable: parseBoolean(row[22]),
      isIndisposable: parseBoolean(row[23]),
      lot: parseBoolean(row[24]),
      midPrice: parseInt(row[25], 10),
      lowPrice: parseInt(row[26], 10),
      canBeHq: parseBoolean(row[27]),
      isDyeable: parseBoolean(row[28]),
      isCrestWorthy: parseBoolean(row[29]),
      cooldown: parseInt(row[32], 10),
      repairClassJob,
      repairItem,
      glamourItem,
      salvage,
      isCollectable: parseBoolean(row[37]),
      alwaysCollectable: parseBoolean(row[38]),
      aetherialReduce: parseInt(row[39]),
      equipLevel: parseInt(row[40], 10),
      equipRestriction: parseInt(row[42], 10),
      classJobCategory: classJobCategories[parseInt(row[43], 10)].name,
      grandCompany: grandCompanies[parseInt(row[44], 10)].name,
      itemSeries: itemSeriesList[parseInt(row[45], 10)].name,
      baseParamModifier: parseInt(row[46], 10),
      useClassJob: classJobs[parseInt(row[49], 10)].name,
      physDamage: parseInt(row[51], 10),
      magDamage: parseInt(row[52], 10),
      delay: parseInt(row[53], 10),
      blockRate: parseInt(row[55], 10),
      block: parseInt(row[56], 10),
      physDefense: parseInt(row[57], 10),
      magDefense: parseInt(row[58], 10),
      baseParam0: parseBaseParam(baseParams, row[59]),
      baseParamValue0: parseBaseParamValue(row[59], row[60]),
      baseParam1: parseBaseParam(baseParams, row[61]),
      baseParamValue1: parseBaseParamValue(row[61], row[62]),
      baseParam2: parseBaseParam(baseParams, row[63]),
      baseParamValue2: parseBaseParamValue(row[63], row[64]),
      baseParam3: parseBaseParam(baseParams, row[65]),
      baseParamValue3: parseBaseParamValue(row[65], row[66]),
      baseParam4: parseBaseParam(baseParams, row[67]),
      baseParamValue4: parseBaseParamValue(row[67], row[68]),
      baseParam5: parseBaseParam(baseParams, row[69]),
      baseParamValue5: parseBaseParamValue(row[69], row[70]),
      itemSpecialBonus: itemSpecialBonuses[parseInt(row[71], 10)].name,
      itemSpecialBonusParam: parseInt(row[72], 10),
      specialBaseParam0: parseBaseParam(baseParams, row[73]),
      specialBaseParamValue0: parseBaseParamValue(row[73], row[74]),
      specialBaseParam1: parseBaseParam(baseParams, row[75]),
      specialBaseParamValue1: parseBaseParamValue(row[75], row[76]),
      specialBaseParam2: parseBaseParam(baseParams, row[77]),
      specialBaseParamValue2: parseBaseParamValue(row[77], row[78]),
      specialBaseParam3: parseBaseParam(baseParams, row[79]),
      specialBaseParamValue3: parseBaseParamValue(row[79], row[80]),
      specialBaseParam4: parseBaseParam(baseParams, row[81]),
      specialBaseParamValue4: parseBaseParamValue(row[81], row[82]),
      specialBaseParam5: parseBaseParam(baseParams, row[83]),
      specialBaseParamValue5: parseBaseParamValue(row[83], row[74]),
      materializeType: parseInt(row[85], 10),
      materiaSlotCount: parseInt(row[86], 10),
      isAdvancedMeldingPermitted: parseBoolean(row[87]),
      isPvP: parseBoolean(row[88]),
      isGramourous: parseBoolean(row[90]),
    };
  });

  return items;
}

export default async function useItem(): Promise<Item[]> {
  const rows = await getRowsFromCSV('./csv/Item.csv');
  const items = (await createItem(rows))
    .filter(validateKey)
    .filter(validateName);
  return items;
}
