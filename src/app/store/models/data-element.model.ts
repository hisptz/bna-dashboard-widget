export interface DataElement {
  name: string;
  id: string;
  valueType: string;
  optionSetValue: boolean;
  isHidden?: boolean;
  parentId?: string;
  associatedId?: string;
  optionSet?: {
    option: Array<{
      id: string;
      name: string;
      code: number;
    }>;
  };
  categoryCombo?: {
    id: string;
    name: string;
    categoryOptionCombos: Array<{
      id: string;
      name: string;
    }>;
  };
}
