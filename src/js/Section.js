class Section {
  constructor({ items, renderer }, classRender) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classRender);
  }
  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
export { Section };
