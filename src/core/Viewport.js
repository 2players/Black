/**
 * Manages viewport, handles DOM container resize events and updates internal data.
 *
 * @cat core
 * @fires resize
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Viewport extends MessageDispatcher {
  /**
   * constructor
   * @param {HTMLElement} containerElement
   * @return {void}
   */
  constructor(containerElement) {
    super();

    /** @type {HTMLElement} */
    this.mContainerElement = containerElement;

    let style = this.mContainerElement.style;
    style.userSelect = 'none';
    style.touchAction = 'none';
    style.overflow = 'hidden';
    style.cursor = 'auto';
    style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)';

    let size = this.mContainerElement.getBoundingClientRect();

    /** @type {Rectangle} */
    this.mSize = new Rectangle(size.left, size.top, size.width, size.height);

    this.isTransperent = false;
    this.backgroundColor = 0x000000;

    window.addEventListener('resize', x => this.__onResize());
  }

  __onResize() {
    let size = this.mContainerElement.getBoundingClientRect();
    let newSize = new Rectangle(size.left, size.top, size.width, size.height);

    if (this.mSize.equals(newSize) === true)
      return;

    this.mSize = newSize;
    this.post('resize', this.mSize);
  }

  /**
   * size - Returns the size of a viewport.
   * @return {Rectangle}
   */
  get size() {
    return this.mSize;
  }

  /**
   * nativeDOM - Retruns the HTML container element the engine runs in.
   * @return {Element}
   */
  get nativeDOM() {
    return this.mContainerElement;
  }

  // TODO: dispose, remove resize event
}
