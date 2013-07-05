$(document).ready(function() {
  'use strict';

  /**
   * Creates TracksFlow Downloader class instance.
   *
   * @constructor
   * @param {Object} options Associative array of options.
   * @param {Object} options.i18n Associative array of localized strings.
   */
  function TFD(options) {
    this.i18n = options.i18n;

    this.init();
  }

  /**
   * Checks changes in site that will interfere with the stable extension work and throws exception.
   *
   * @private
   */
  TFD.prototype.checkChanges = function() {
    // TODO: Exceptions check will be here. https://trello.com/c/l7DhHioK
    /*this.$svgContainer = $('body svg.collapsed defs');
    if (this.$svgContainer.length == 0) {
      throw new {};
    }*/
  };

  /**
   * Makes object initialization.
   *
   * @private
   */
  TFD.prototype.init = function() {
    var t = this;
    var downloadIcon = 'M 368.00,224.00 L 240.00,352.00 L 112.00,224.00 L 192.00,224.00 L 192.00,32.00 ' +
      'L 288.00,32.00 L 288.00,224.00 Z M 240.00,352.00L0.00,352.00 l0.00,128.00 l 480.00,0.00 ' +
      'L 480.00,352.00 L 240.00,352.00 z M 448.00,416.00l-64.00,0.00 l0.00-32.00 l 64.00,0.00 L 448.00,416.00 z';

    this.checkChanges();

    // Add new icon geometry (download icon) to the list of icons.
    var clipPath = this.createSVG('clipPath', {id: 'tfd-download-path'});
    var path = this.createSVG('path', {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: downloadIcon
    });
    clipPath.appendChild(path);
    $('body svg.collapsed defs').append(clipPath);

    // Add icon to track line and click event on hover.
    $('#content').on('hover', '.track-line', function() {
      var $container = $('.icons-fork', $(this));
      if ($('.tfd-download-icon', $container).length == 0) {
        var $icon = $(
          '<div class="icon tfd-download-icon c-grey3-svg" id="$idAttribute" ' +
            'title="' + t.i18n.downloadButtonTitle + '">' +
            '<svg viewBox="0 0 512 512">' +
              '<rect width="512" height="512"></rect>' +
            '</svg>' +
          '</div>'
        ).insertAfter($('.social-icon', $container));

        $icon.click(function() {
          var track = t.getTrackFromDOM($(this).closest('.track-line'));
          window.player.getLink(track, {
            success: function(trackInfo) {
              var elem = $('<a>', {
                href: trackInfo.link,
                download: t.getTrackName(trackInfo),
                target: '_blank',
                id: 'tfd-download-link'
              });

              elem.get(0).click();
              elem.remove();
            },
            error: function() {
                t.showWarn(t.i18n.noLinkWarn);
            }
          });
        });
      }
    });
  };

  /**
   * Gets and returns track info from DOM track line.
   *
   * @param {Object} $trackLine jQuery track line DOM object.
   * @returns {Object} Track info.
   */
  TFD.prototype.getTrackFromDOM = function($trackLine) {
    //return window.player.get('collection').models[$trackLine.index()];
    var time = $('#time', $trackLine).text();
    time = (time.length > 0) ? this.timeCodeToSeconds(time) : null;

    return {
      artistName: $.trim($('.artistName a', $trackLine).text()),
      trackName: $.trim($('.trackName a name', $trackLine).text()),
      durationSec: time,
      getUrl: function() {return false;},
      get: function(key) {return this[key];},
      set: function(key, value) {this[key] = value;}
    };
  };

  /**
   * Shows warning notification popup.
   *
   * @private
   * @param {String} message Notification message.
   */
  TFD.prototype.showWarn = function(message) {
    window.utils.msg.warn(message);
  };

  /**
   * Converts time code ("0:10", "5:03", "4:12:32") to seconds.
   *
   * @param {String} timeCode Time code in "hh:mm:ss" or "mm:ss" formats.
   * @returns {number} time in seconds.
   */
  TFD.prototype.timeCodeToSeconds = function(timeCode) {
    var timeCodeArray = timeCode.split(':').reverse();
    var factor = [1, 60, 3600];
    var sec = 0;

    for (var i = 0; i < timeCodeArray.length; i++) {
      sec += parseInt(timeCodeArray[i]) * factor[i];
    }

    return sec;
  };

  /**
   * Returns nice track name in the following format: "Artist - Song.extension".
   *
   * @private
   * @param {Object} trackInfo Track info.
   * @param {String} trackInfo.link Download link.
   * @param {String} trackInfo.artistName Artist.
   * @param {String} trackInfo.trackName Track name.
   * @returns {string}
   */
  TFD.prototype.getTrackName = function(trackInfo) {
    // <a> tag parses url and divides it to object variables.
    var a = document.createElement('a');
    a.href = trackInfo.link;

    // Search in url path (omitting domain and query).
    var pos = a.pathname.lastIndexOf('.');
    var ext = 'mp3';
    if (pos >= 0) {
      var tmpExt = a.pathname.substr(pos + 1);
      if (tmpExt.length <= 4)
        ext = tmpExt;
    }

    return trackInfo.artistName + ' - ' + trackInfo.trackName + '.' + ext;
  };

  /**
   * Creates new SVG element and applies attributes to it.
   *
   * @private
   * @param {String} elem SVG element name.
   * @param {Object} [attr] Associative array of attributes.
   * @returns {HTMLElement}
   */
  TFD.prototype.createSVG = function(elem, attr) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', elem);
    for (var name in attr) {
      if (!attr.hasOwnProperty(name))
        continue;

      el.setAttribute(name, attr[name]);
    }

    return el;
  };
  var tfd = new TFD(tfdData);
});