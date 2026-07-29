const sorting = require('../../app.js');

describe("Books names test suit", () => {

  it("Books names should be sorted in ascending order", () => {
    const input = ['Гарри Поттер', 'Властелин Колец', 'Волшебник изумрудного города'];
    
    expect(sorting.sortByName(input)).toEqual(['Властелин Колец', 'Волшебник изумрудного города', 'Гарри Поттер']);
  });

  it("Should keep items in place when names are equal case-insensitively (covers return 0)", () => {
   
    const input = ['apple', 'Apple'];
    expect(sorting.sortByName(input)).toEqual(['apple', 'Apple']);
  });

});
