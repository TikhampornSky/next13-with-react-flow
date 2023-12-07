export const defaultSettings = {
    clone: false, // returns a copy of the input, if your application does not allow editing the original object
    enableFlex: true, // has slightly better perfomance if turned off (node.width, node.height will not be read)
    firstDegreeSpacing: 15, // spacing in px between nodes belonging to the same source, eg children with same parent
    nextAfterAccessor: "spouses", // the side node prop used to go sideways, AFTER the current node
    nextAfterSpacing: 10, // the spacing of the "side" nodes AFTER the current node
    nextBeforeAccessor: "siblings", // the side node prop used to go sideways, BEFORE the current node
    nextBeforeSpacing: 10, // the spacing of the "side" nodes BEFORE the current node
    nodeHeight: 40, // default node height in px
    nodeWidth: 40, // default node width in px
    orientation: "vertical", // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
    rootX: 0, // set root position if other than 0
    rootY: 0, // set root position if other than 0
    secondDegreeSpacing: 20, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
    sourcesAccessor: "parents", // the prop used as the array of ancestors ids
    sourceTargetSpacing: 10, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
    targetsAccessor: "children", // the prop used as the array of children ids
};