let list = [5, 3, 4, 1, 2];

function tri(tab) {
  let min;
  let tabTri = [];

  while (tab.length > 0) {
    min = tab[0];
    for (let j = 0; j < tab.length; j++) {
      if (tab[j] < min) {
        min = tab[j];
      }
    }
    tabTri.push(min);
    let index = tab.indexOf(min);
    tab.splice(index, 1);
  }
  return tabTri;
}

console.log(tri(list));
