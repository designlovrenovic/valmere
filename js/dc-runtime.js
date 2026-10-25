/*!
 * Maison Valmère: tiny template runtime (no dependencies).
 *
 * Renders <template id="app-tpl"> into the page. The template uses:
 *   {{path.to.value}}            text or attribute holes
 *   <sc-for list="{{x}}" as="y">  repeat children for each item in x
 *   <sc-if value="{{x}}">         render children while x is truthy
 *   onClick="{{h.fn}}"            native event listeners (any on* attribute)
 *   ref="{{h.setEl}}"             callback that receives the element
 * The component (js/app.js) is a class with React-style state:
 *   setState(patch), renderVals(), componentDidMount().
 */
(function () {
  'use strict';

  var HOLE = /\{\{\s*([\w$.]+)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([\w$.]+)\s*\}\}\s*$/;

  function get(scope, path) {
    var parts = path.split('.');
    var v = scope;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  function text(v) {
    return v == null || typeof v === 'boolean' ? '' : String(v);
  }

  // Returns a function(scope) -> string, or null when the string has no holes.
  function interp(s) {
    if (s.indexOf('{{') < 0) return null;
    var parts = [];
    var last = 0;
    var m;
    HOLE.lastIndex = 0;
    while ((m = HOLE.exec(s))) {
      parts.push(s.slice(last, m.index));
      parts.push({ p: m[1] });
      last = m.index + m[0].length;
    }
    parts.push(s.slice(last));
    return function (scope) {
      var out = '';
      for (var i = 0; i < parts.length; i++) {
        var x = parts[i];
        out += typeof x === 'string' ? x : text(get(scope, x.p));
      }
      return out;
    };
  }

  function wholePath(value) {
    var m = WHOLE.exec(value || '');
    return m ? m[1] : null;
  }

  function setAttr(el, name, v) {
    var stringy = name.indexOf('aria-') === 0 || name.indexOf('data-') === 0;
    if (v == null || (v === false && !stringy)) { el.removeAttribute(name); return; }
    if (v === true && !stringy) { el.setAttribute(name, ''); return; }
    if (name === 'style') { el.style.cssText = String(v); return; }
    el.setAttribute(name, String(v));
  }

  function bindAttr(el, attr, bindings) {
    var name = attr.name;
    var value = attr.value;
    if (name.indexOf('hint-') === 0) return;
    var path = wholePath(value);

    if (name === 'ref') {
      if (!path) return;
      var cur = null;
      bindings.push(function (scope) {
        var fn = get(scope, path);
        if (fn === cur) return;
        if (typeof cur === 'function') cur(null);
        cur = fn;
        if (typeof fn === 'function') fn(el);
      });
      return;
    }

    if (name.length > 2 && name.slice(0, 2) === 'on') {
      if (!path) return;
      var holder = { fn: null };
      el.addEventListener(name.slice(2).toLowerCase(), function (e) {
        if (typeof holder.fn === 'function') holder.fn(e);
      });
      bindings.push(function (scope) { holder.fn = get(scope, path); });
      return;
    }

    if (path) {
      var last;
      bindings.push(function (scope) {
        var v = get(scope, path);
        if (v === last) return;
        last = v;
        setAttr(el, name, v);
      });
      return;
    }

    var f = interp(value);
    if (f) {
      var prev = null;
      bindings.push(function (scope) {
        var s = f(scope);
        if (s === prev) return;
        prev = s;
        if (name === 'style') el.style.cssText = s;
        else el.setAttribute(name, s);
      });
      return;
    }

    if (attr.namespaceURI) el.setAttributeNS(attr.namespaceURI, name, value);
    else el.setAttribute(name, value);
  }

  function build(tplNodes, parent, bindings) {
    for (var i = 0; i < tplNodes.length; i++) {
      var t = tplNodes[i];
      if (t.nodeType === 3) {
        var f = interp(t.data);
        var tn = document.createTextNode(f ? '' : t.data);
        parent.appendChild(tn);
        if (f) bindings.push(textBinding(tn, f));
      } else if (t.nodeType === 1) {
        var tag = t.localName;
        if (tag === 'sc-for' || tag === 'sc-if') {
          var anchor = document.createComment(tag);
          parent.appendChild(anchor);
          bindings.push(tag === 'sc-for' ? listBinding(t, anchor) : ifBinding(t, anchor));
          continue;
        }
        var el = document.createElementNS(t.namespaceURI, tag);
        for (var a = 0; a < t.attributes.length; a++) bindAttr(el, t.attributes[a], bindings);
        parent.appendChild(el);
        build(t.childNodes, el, bindings);
      }
    }
  }

  function textBinding(tn, f) {
    var last = null;
    return function (scope) {
      var s = f(scope);
      if (s !== last) { tn.data = s; last = s; }
    };
  }

  function makeBlock(tplNodes) {
    var frag = document.createDocumentFragment();
    var start = document.createComment('');
    var end = document.createComment('');
    var bindings = [];
    frag.appendChild(start);
    build(tplNodes, frag, bindings);
    frag.appendChild(end);
    return {
      frag: frag,
      update: function (scope) {
        for (var i = 0; i < bindings.length; i++) bindings[i](scope);
      },
      remove: function () {
        var n = start;
        while (n) {
          var next = n.nextSibling;
          n.parentNode.removeChild(n);
          if (n === end) break;
          n = next;
        }
      }
    };
  }

  function listBinding(t, anchor) {
    var path = wholePath(t.getAttribute('list'));
    var as = t.getAttribute('as') || 'item';
    var kids = t.childNodes;
    var inst = [];
    return function (scope) {
      var arr = path ? get(scope, path) : null;
      if (!arr || typeof arr.length !== 'number') arr = [];
      for (var i = 0; i < arr.length; i++) {
        var sc = Object.create(scope);
        sc[as] = arr[i];
        if (!inst[i]) {
          inst[i] = makeBlock(kids);
          anchor.parentNode.insertBefore(inst[i].frag, anchor);
        }
        inst[i].update(sc);
      }
      while (inst.length > arr.length) inst.pop().remove();
    };
  }

  function ifBinding(t, anchor) {
    var path = wholePath(t.getAttribute('value'));
    var kids = t.childNodes;
    var blk = null;
    return function (scope) {
      var v = path ? get(scope, path) : false;
      if (v) {
        if (!blk) {
          blk = makeBlock(kids);
          anchor.parentNode.insertBefore(blk.frag, anchor);
        }
        blk.update(scope);
      } else if (blk) {
        blk.remove();
        blk = null;
      }
    };
  }

  // React-style base class: state updates are batched and applied before the next paint.
  function DCLogic(props) {
    this.props = props || {};
  }
  DCLogic.prototype.setState = function (patch) {
    if (typeof patch === 'function') patch = patch(Object.assign({}, this.state, this.__pending), this.props);
    if (!patch) return;
    this.__pending = Object.assign(this.__pending || {}, patch);
    if (this.__queued) return;
    this.__queued = true;
    var self = this;
    var flush = function () {
      self.__queued = false;
      var p = self.__pending;
      self.__pending = null;
      if (p) self.state = Object.assign({}, self.state, p);
      if (self.__render) self.__render();
    };
    if (typeof queueMicrotask === 'function') queueMicrotask(flush);
    else Promise.resolve().then(flush);
  };

  function mount(Comp, tpl, container, props) {
    var comp = new Comp(props);
    var root = makeBlock(tpl.content.childNodes);
    container.appendChild(root.frag);
    comp.__render = function () { root.update(comp.renderVals()); };
    comp.__render();
    if (typeof comp.componentDidMount === 'function') comp.componentDidMount();
    return comp;
  }

  window.DCLogic = DCLogic;
  window.DC = { mount: mount };
})();
