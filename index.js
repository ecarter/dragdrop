
/**
 * Module Dependencies
 */

var classes = require('classes')
  , Emitter = require('emitter')
  , events = require('events');

/**
 * Expose `Dragdrop`.
 */

module.exports = Dragdrop;

/**
 * Initialize a new `Dragdrop`.
 */

function Dragdrop(el, opts){
  if (!(this instanceof Dragdrop)) return new Dragdrop(el, opts);
  Emitter.call(this);
  this.el = el;
  this.classes = classes(el);
  this.events = events(el, this);
  this.events.bind('drop');
  this.events.bind('dragstart');
  this.events.bind('dragenter');
  this.events.bind('dragover');
  this.events.bind('dragleave');
  this.events.bind('dragend');
}

/**
 * Inherits `Emitter`.
 */

Emitter(Dragdrop.prototype);

/**
 * Dragstart handler.
 */

Dragdrop.prototype.ondragstart = function(e){
  console.log('drag start');
  this.src = e.target;
  //e.dataTransfer.effectAllowed = 'move';
  //e.dataTransfer.setData('text/html', this.src);
  console.log('dragstart src', this.src);
};

/**
 * Dragenter handler.
 */

Dragdrop.prototype.ondragenter = function(e){
  console.log('drag enter');
};

/**
 * Dragover handler.
 */

Dragdrop.prototype.ondragover = function(e){
  console.log('drag over');
};

/**
 * Dragleave handler.
 */

Dragdrop.prototype.ondragleave = function(e){
  console.log('drag leave');
};

/**
 * Dragend handler.
 */

Dragdrop.prototype.ondragend = function(e){
  console.log('drag end', this);
  e.preventDefault();
  e.stopPropagation();
  this.src.innerHTML = this.innerHTML;
  this.innerHTML = e.dataTransfer.getData('text/html');
};

/**
 * Drop handler.
 */

Dragdrop.prototype.ondrop = function(e){
  console.log('drop src', this);
  e.preventDefault();
  e.stopPropagation();
  this.src.innerHTML = this.innerHTML;
  this.innerHTML = e.dataTransfer.getData('text/html');
};

