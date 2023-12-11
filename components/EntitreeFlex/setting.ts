import { Settings } from "entitree-flex/dist/Settings";
export const defaultSettings: Settings = {
    clone: false,
    enableFlex: true,
    firstDegreeSpacing: 50, // spacing in px between nodes belonging to the same source, eg children with same parent
    nextAfterAccessor: "spouses",
    nextAfterSpacing: 0,
    nextBeforeAccessor: "siblings",
    nextBeforeSpacing: 0,
    nodeHeight: 36,  // default node height in px
    nodeWidth: 172, // default node width in px
    orientation: "vertical",
    rootX: 0,
    rootY: 0,
    secondDegreeSpacing: 50, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
    sourcesAccessor: "parents",
    sourceTargetSpacing: 100, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
    targetsAccessor: "children",
    groupTargetsByNextAfters: false,
    idAccessor: ""
};