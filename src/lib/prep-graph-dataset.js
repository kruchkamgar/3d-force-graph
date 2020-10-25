const hierarchicToGraph = function (json){
  const nodeList = {};
  const nodeLinks = [];
  // buildNodeArrays(json, nodeList, nodeLinks);
  json.forEach( node => {
    nodeList[node.id] = node;
    if (node.children && node.children.length > 0) {
      recurseChildren(node, nodeLinks, nodeList);
    }
  });

  const graphLinks = nodeLinks.map( link => {
    debugger;
    return link.map( relations => {
      relations.children.map( child => {
        return {source: relations.parent, target: child};
      })
    })
  }).flat();

  return {
    'nodes': Object.entries(nodeList)
              .map( objArray => objArray[1] ),
    'links': graphLinks
  }
}

function buildNodeArrays (json, nodeList, nodeLinks){}
function recurseChildren(node, nodeLinks, nodeList) {
  // json.forEach(node => {
    nodeList[node.id] = node;
    nodeLinks.push(
      {parent: node.id, children: node.children} );
    if (node.children && node.children.length > 0){
      return recurseChildren(node.children, nodeLinks, nodeList)
    } else {
      return [nodeLinks, nodeList];
    }
  }
