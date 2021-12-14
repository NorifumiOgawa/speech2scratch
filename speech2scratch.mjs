function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/**
 * Types of block
 * @enum {string}
 */
var BlockType = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',

  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',

  /**
   * Command block
   */
  COMMAND: 'command',

  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',

  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',

  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',

  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',

  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType;

var blockIconURI = 'data:image/png;base64,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';
/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */

var extensionURL = 'https://champierre.github.io/speech2scratch/speech2scratch.mjs';

var Scratch3Speech2Scratch = /*#__PURE__*/function () {
  function Scratch3Speech2Scratch(runtime) {
    _classCallCheck(this, Scratch3Speech2Scratch);

    this.runtime = runtime;
    this.speech = '';
  }

  _createClass(Scratch3Speech2Scratch, [{
    key: "getInfo",
    value: function getInfo() {
      return {
        id: Scratch3Speech2Scratch.EXTENSION_ID,
        name: Scratch3Speech2Scratch.EXTENSION_NAME,
        extensionURL: Scratch3Speech2Scratch.extensionURL,
        blockIconURI: blockIconURI,
        blocks: [{
          opcode: 'startRecognition',
          blockType: blockType.COMMAND,
          text: '音声認識開始'
        }, {
          opcode: 'getSpeech',
          blockType: blockType.REPORTER,
          text: '音声'
        }],
        menus: {}
      };
    }
  }, {
    key: "startRecognition",
    value: function startRecognition() {
      var _this = this;

      SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
      var recognition = new SpeechRecognition();

      recognition.onresult = function (event) {
        _this.speech = event.results[0][0].transcript;
      };

      recognition.start();
    }
  }, {
    key: "getSpeech",
    value: function getSpeech() {
      return this.speech;
    }
  }], [{
    key: "EXTENSION_NAME",
    get:
    /**
     * @return {string} - the name of this extension.
     */
    function get() {
      return 'Speech2Scratch';
    }
    /**
     * @return {string} - the ID of this extension.
     */

  }, {
    key: "EXTENSION_ID",
    get: function get() {
      return 'speech2scratch';
    }
    /**
     * URL to get this extension.
     * @type {string}
     */

  }, {
    key: "extensionURL",
    get: function get() {
      return extensionURL;
    }
    /**
     * Set URL to get this extension.
     * extensionURL will be reset when the module is loaded from the web.
     * @param {string} url - URL
     */
    ,
    set: function set(url) {
      extensionURL = url;
    }
  }]);

  return Scratch3Speech2Scratch;
}();

var blockClass = Scratch3Speech2Scratch; // loadable-extension needs this line.

var _speech2scratch = Scratch3Speech2Scratch;
_speech2scratch.blockClass = blockClass;

export { _speech2scratch as __moduleExports, blockClass };
