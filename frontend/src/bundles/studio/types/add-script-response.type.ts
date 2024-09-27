import { type Script, type SelectedItem } from './types.js';

type addScriptResponse = {
    script: Script;
    selectedItem: SelectedItem;
    rangeEnd: number;
};

export { type addScriptResponse };
