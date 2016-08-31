/**
 * Popover.js - Requires jQuery
 */

(function ($) {

	$.fn.wfPopover = function(options) {
		var $this = this;
		var zIndexParent = this.parent().css('z-index');
		var zIndexThis;
		if (zIndexParent != 'auto') {
			zIndexThis = zIndexParent+1;
		} else {
			zIndexThis = 1;
		}
		this.css('z-index', zIndexThis);
	    $arrow = $('<div class="popoverArrowUp" />');
	    this.append($arrow);
	    
	    $arrow.css('position', 'absolute');
	    $arrow.css('left', '20px');
	    $arrow.css('top', '-15px');
	    $arrow.css('z-index', zIndexThis+1);
	    
	    $closeIcon = $('<div class="popoverCloseIcon" />');
	    this.append($closeIcon);
	    
	    $closeIcon.css('position', 'absolute');
	    $closeIcon.css('right', '-15px');
	    $closeIcon.css('top', '-15px');
	    $closeIcon.css('z-index', zIndexThis+1);
	
	    $.fn.wfHidePopover = function() {
	    	this.hide();
	    	this.attr('aria-hidden', 'true');
	    }
	    
	    $.fn.wfShowPopover = function() {
	    	this.show();
	    	this.attr('aria-hidden', 'false');
	    }
	    
	    $closeIcon.on('click', function() { $this.wfHidePopover(); });
	    this.wfHidePopover();
	    return this;
	}
}( jQuery ));