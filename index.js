
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
  this.src = target(e.target);
  classes(this.src).add('dragging');
  this.emit('start', this.src);
};

/**
 * Dragenter handler.
 */

Dragdrop.prototype.ondragenter = function(e){
  e.preventDefault();
  e.stopPropagation();
  this.emit('enter', target(e.target));
};

/**
 * Dragover handler.
 */

Dragdrop.prototype.ondragover = function(e){
  e.preventDefault();
  e.stopPropagation();
  var target = target(e.target);
  this.drop = target;
  classes(target).add('over');
  this.emit('over', target);
};

/**
 * Dragleave handler.
 */

Dragdrop.prototype.ondragleave = function(e){
  e.preventDefault();
  e.stopPropagation();
  var target = target(e.target);
  classes(target).remove('over');
  this.emit('leave', target);
};

/**
 * Dragend handler.
 */

Dragdrop.prototype.ondragend = function(e){
  e.preventDefault();
  e.stopPropagation();
  if (this.src) classes(this.src).remove('dragging');
  this.emit('end', this.src);
};

/**
 * Drop handler.
 */

Dragdrop.prototype.ondrop = function(e){
  e.preventDefault();
  e.stopPropagation();
  var target = target(e.target);
  if (target) classes(target).remove('over');
  if (this.src) classes(this.src).remove('dragging').remove('over');
  this.emit('drop', this.src, this.drop);
};

/**
 * Finds draggable or droppable parent node.
 */

function target(el) {
  var p = el.parentNode;
  var parents = [];
  var drop;

  while (p !== null) {
    var n = p;
    parents.push(n);
    p = n.parentNode;
  }

  for (var i=0; i < parents.length; i++) {
    var node = parents[i];
    if ((node.draggable || node.droppable) && !drop) drop = node;
  }

  return drop || el;
}

