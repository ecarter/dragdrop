
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
  this.src = e.target;
  classes(this.src).add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.src.innerHTML);
};

/**
 * Dragenter handler.
 */

Dragdrop.prototype.ondragenter = function(e){
};

/**
 * Dragover handler.
 */

Dragdrop.prototype.ondragover = function(e){
  e.preventDefault();
  classes(e.target).add('over');
};

/**
 * Dragleave handler.
 */

Dragdrop.prototype.ondragleave = function(e){
  e.preventDefault();
  classes(e.target).remove('over');
};

/**
 * Dragend handler.
 */

Dragdrop.prototype.ondragend = function(e){
  e.preventDefault();
  e.stopPropagation();
  classes(this.src).remove('dragging');
};

/**
 * Drop handler.
 */

Dragdrop.prototype.ondrop = function(e){
  e.preventDefault();
  e.stopPropagation();

  if (this.src != e.target && e.target.parentNode == this.el) {
    this.src.innerHTML = e.target.innerHTML;
    e.target.innerHTML = e.dataTransfer.getData('text/html');
    classes(e.target).remove('over');
  }
};

