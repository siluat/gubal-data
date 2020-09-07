import { getRowsFromCSV } from '../file';
import { Row } from '../../types/common';
import useItemUICategory, { ItemUICategory } from './useItemUICategory';
import { validateKey, validateName } from '../../utils/filter';
import useClassJob from './useClassJob';
import useSalvage from './useSalvage';
import useClassJobCategory from './useClassJobCategory';
import useGrandCompany from './useGrandCompany';
import useItemSeries from './useItemSeries';
import useBaseParam, { parseBaseParam, BaseParamProps } from './useBaseParam';
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
  baseParams0?: BaseParamProps;
  baseParams1?: BaseParamProps;
  baseParams2?: BaseParamProps;
  baseParams3?: BaseParamProps;
  baseParams4?: BaseParamProps;
  baseParams5?: BaseParamProps;
  itemSpecialBonus: string;
  itemSpecialBonusParam: number;
  specialBaseParam0?: BaseParamProps;
  specialBaseParam1?: BaseParamProps;
  specialBaseParam2?: BaseParamProps;
  specialBaseParam3?: BaseParamProps;
  specialBaseParam4?: BaseParamProps;
  specialBaseParam5?: BaseParamProps;
  materializeType: number;
  materiaSlotCount: number;
  isAdvancedMeldingPermitted: boolean;
  isPvP: boolean;
  isGlamourous: boolean;
};

function parseBoolean(value: string): boolean {
  return value === 'True';
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

    const row36 = parseInt(row[37], 10);
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
      alwaysCollectable: parseBoolean(row[39]),
      aetherialReduce: parseInt(row[40]),
      equipLevel: parseInt(row[41], 10),
      equipRestriction: parseInt(row[43], 10),
      classJobCategory: classJobCategories[parseInt(row[44], 10)].name,
      grandCompany: grandCompanies[parseInt(row[45], 10)].name,
      itemSeries: itemSeriesList[parseInt(row[46], 10)].name,
      baseParamModifier: parseInt(row[47], 10),
      useClassJob: classJobs[parseInt(row[50], 10)].name,
      physDamage: parseInt(row[52], 10),
      magDamage: parseInt(row[53], 10),
      delay: parseInt(row[54], 10),
      blockRate: parseInt(row[56], 10),
      block: parseInt(row[57], 10),
      physDefense: parseInt(row[58], 10),
      magDefense: parseInt(row[59], 10),
      baseParam0: parseBaseParam(baseParams, row[60], row[61]),
      baseParam1: parseBaseParam(baseParams, row[62], row[63]),
      baseParam2: parseBaseParam(baseParams, row[64], row[65]),
      baseParam3: parseBaseParam(baseParams, row[66], row[67]),
      baseParam4: parseBaseParam(baseParams, row[68], row[69]),
      baseParam5: parseBaseParam(baseParams, row[70], row[71]),
      itemSpecialBonus: itemSpecialBonuses[parseInt(row[72], 10)].name,
      itemSpecialBonusParam: parseInt(row[73], 10),
      specialBaseParam0: parseBaseParam(baseParams, row[74], row[75]),
      specialBaseParam1: parseBaseParam(baseParams, row[76], row[77]),
      specialBaseParam2: parseBaseParam(baseParams, row[78], row[79]),
      specialBaseParam3: parseBaseParam(baseParams, row[80], row[81]),
      specialBaseParam4: parseBaseParam(baseParams, row[82], row[83]),
      specialBaseParam5: parseBaseParam(baseParams, row[84], row[85]),
      materializeType: parseInt(row[86], 10),
      materiaSlotCount: parseInt(row[87], 10),
      isAdvancedMeldingPermitted: parseBoolean(row[88]),
      isPvP: parseBoolean(row[89]),
      isGlamourous: parseBoolean(row[91]),
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
