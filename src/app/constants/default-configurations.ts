import * as helper from '../helpers/';

const bottleneckId = helper.generateUid();
const indicatorId = helper.generateUid();

export const defaultDataSetElementDetails = [
  {
    name: 'OrgUnit',
    id: helper.generateUid(),
    valueType: 'AUTO_FILLED',
    routerParam: { key: 'name', namespace: 'orgUnit' },
    optionSetValue: false
  },
  {
    id: helper.generateUid(),
    name: 'orgUnitId',
    isHidden: true,
    valueType: 'AUTO_FILLED',
    routerParam: {
      key: 'id',
      namespace: 'orgUnit'
    },
    optionSetValue: false
  },
  {
    name: 'Period',
    id: helper.generateUid(),
    valueType: 'AUTO_FILLED',
    routerParam: {
      key: 'name',
      namespace: 'period'
    },
    optionSetValue: false
  },
  {
    id: helper.generateUid(),
    name: 'periodId',
    isHidden: true,
    valueType: 'AUTO_FILLED',
    routerParam: {
      key: 'id',
      namespace: 'period'
    },
    optionSetValue: false
  },
  {
    name: 'Intervention',
    id: helper.generateUid(),
    valueType: 'AUTO_FILLED',
    optionSetValue: false,
    routerParam: {
      key: 'name',
      namespace: 'dashboard'
    }
  },
  {
    id: helper.generateUid(),
    name: 'interventionId',
    isHidden: true,
    valueType: 'AUTO_FILLED',
    routerParam: {
      key: 'id',
      namespace: 'dashboard'
    },
    optionSetValue: false
  },
  {
    name: 'Bottleneck',
    id: helper.generateUid(),
    valueType: 'TEXT',
    optionSetValue: true,
    associatedId: bottleneckId
  },
  {
    id: bottleneckId,
    name: 'bottleneckId',
    isGroup: true,
    isHidden: true,
    valueType: 'TEXT',
    optionSetValue: true
  },
  {
    name: 'Indicator',
    id: helper.generateUid(),
    valueType: 'TEXT',
    parentId: bottleneckId,
    associatedId: indicatorId,
    optionSetValue: true
  },
  {
    id: indicatorId,
    name: 'indicatorId',
    isHidden: true,
    parentId: bottleneckId,
    valueType: 'TEXT',
    optionSetValue: true
  },
  {
    name: 'Root cause',
    id: helper.generateUid(),
    valueType: 'TEXT',
    optionSetValue: false
  },
  {
    name: 'Solution',
    id: helper.generateUid(),
    valueType: 'TEXT',
    optionSetValue: false
  }
];
