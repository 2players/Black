/**
 * Sets particle's texture.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class RandomTexture extends Initializer {
  /**
   * Creates new RandomTexture instance.
   *
   * @param {FloatScatter} floatScatter
   */
  constructor(floatScatter) {
    super();

    /**
     * The float scatter defines the index of the texture. All values will be
     * rounded.
     *
     * @see {Particle.textureIndex}
     * @type {FloatScatter}
     */
    this.scatter = floatScatter;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.textureIndex = Math.round(this.scatter.getValue());
  }
}
