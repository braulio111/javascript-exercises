function includes(keyword) {
  const sanitizedKeyword = keyword.toLowerCase();

  return function(item) {
    return item.toLowerCase().includes(sanitizedKeyword);
  }
}

class SearchEngine {
  constructor (items) {
    this._items = items;
  }

  filter (keyword) {
    return this._items.filter(includes(keyword));
  }
};

class ResultsList {
  constructor (domElement) {
    this._results = domElement;
  }

  show (items) {
    this.clearItems();
    items.forEach(item => {
      const element = this.createItem(item)

      this.addItemToList(element);
    })
  }

  clearItems () {
    this._results.innerHTML = '';
  }

  createItem (text) {
    const item = document.createElement('P');
    const textNode = document.createTextNode(text);

    item.appendChild(textNode);

    return item;
  }

  addItemToList (item) {
    this._results.appendChild(item);
  }

  getItems () {
    const items = [];

    for (var item of this._results.children) {
      items.push(item.textContent);
    }

    return items;
  }
}

class SearchBar {
  constructor ({ input, results, searchItems }) {
    const resultsList = new ResultsList(results);
    const searchEngine = new SearchEngine(searchItems);
    this._domElement = input;

    this._domElement.addEventListener('input', () => {
      const keyword = this.getInputValue();

      const results = searchEngine.filter(keyword);

      resultsList.show(results)
    });
  }

  getInputValue () {
    return this._domElement.value;
  }
}

const pokemonSearch = new SearchBar({
  input: document.querySelector('#pokemon-input'),
  results: document.querySelector('#pokemon-results'),
  searchItems: ['pikachu', 'charmaleon'],
});