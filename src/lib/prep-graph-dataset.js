export hierarchicToGraph = function (json){
  const nodeList = {};
  const nodeLinks = [];
  json.forEach( node => {
    nodeList[node.id] = node;
    if (node.children.length > 0) {
      [nodeLinks, nodeList] = recurseChildren(json, nodeLinks, nodeList)
    }
  })
  const graphLinks = nodeLinks.map( link => {
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

function recurseChildren(json, nodeLinks, nodeList) {
  // json.forEach(node => {
    nodeList[node.id] = node;
    nodeLinks.push(
      {parent: node.id, children: node.children} );
    if (node.children.length > 0){
      return recurseChildren(node.children, nodeLinks, nodeList)
    } else {
      return [nodeLinks, nodeList];
    }
  })
}
