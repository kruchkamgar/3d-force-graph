const hierarchicToGraph = function (json){
  const nodeObj = {
    "nodeList": {},
    "descendants": []
  }
  // buildNodeArrays(json, nodeList, descendants);

  iterateChildren (json, nodeObj);
  const graphLinks =
  nodeObj.descendants.map( relations => {
    return relations.children.map( child => {
      return {
        source: relations.parent,
        target: child.id };
    });
  }).flat();

  return {
    'nodes': Object.entries(nodeObj.nodeList)
              .map( objArray => objArray[1] ),
    'links': graphLinks
  }
}

function buildNodeArrays (json, nodeObj) {}
function iterateChildren (jsonNodes, nodeObj) {
  jsonNodes.forEach( node => {
    ingestNode(node, nodeObj);
  });
}
function ingestNode(node, nodeObj) {
// json.forEach(node => {
  nodeObj.nodeList[node.id] = node;
  const children =
    node.children && node.children.length > 0 ?
      node.children : false;

  nodeObj.descendants.push(
    {parent: node.id, children: (node.children || []) } );
  if (children){
    iterateChildren(children, nodeObj)
  }
  else { return true; }
}
