/* =============================================== *
 * Scrolling fixed backgrounds
 * =============================================== *
 * Author: Rolf van der Kaaden
 *
 * Creates a simple paralex like scrolling effect
 * by stacking fixed backgrounds on top of each
 * other and using content blocks to partially
 * hide or show the fixed backgrounds.
 */

var sfb = new function(){

	var self = this;
	var windowHeight;

	this.parallaxContainer = ".picture";
	this.overlayContainer = ".overlay";
  
	/*
	 * Find and prepare all paralex containers
	 * using the self.paralexContainer selector.
	 *
	 * @return Void 
	 */
	this.init = function(){
		
		var counter = 1; //z-index counter
		windowHeight = $(window).height();
		
		$(self.parallaxContainer).each( function(){ //Iterrate over all paralex containers
			var container = this; //Make a reference point to current object
			$(this).height(windowHeight); //Set height of container to window height
			verticalAlign(this); //Align "catchphrase" container in the middle

			var fixedBg = fixBackground(this);
			$(fixedBg).css( "zIndex", "-"+counter); //Order overlapping
			$(this).append(fixedBg); //Append to dom
			
			$(window).scroll(function() { //Create an event handler for the window scroll event
				var offset = $(container).next().offset().top - $(window).scrollTop() - windowHeight;
				var height = windowHeight + offset + 100;
				
				if(offset > 0){
					$(fixedBg).css( "height", "100%" );
				} else {
					$(fixedBg).css( "height", height+"px" );
				}
			});

			counter = counter+1;
		});
	}

	/*
	 * Creates a div element with an class and
	 * css styles.
	 *
	 * @return element 
	 */
	var createDiv = function(elementClass, elementStyle){
		var element = document.createElement("div"); //Create the div
		if (typeof elementClass !== 'undefined') { //If class variable is set, add class to div
			$(element).addClass(elementClass);
		}
		if (typeof elementStyle !== 'undefined') { //If style variable is set, add style to div
			$(element).css(elementStyle);
		}
		return element; //Return the created div
	}

	/*
	 * Vertically aligns a div within a parent
	 * with a 100% height by adding padding to
	 * the top of the element.
	 *
	 * @return Void 
	 */
	var verticalAlign = function(selector){
		var object = $(selector).find(self.overlayContainer);
		var object_height = $(object).height();
		var margin = (self.window_height/2)-(object_height/2);
		$(object).css("marginTop", margin+"px" );
	}

	/*
	 * Create the fixed background container
	 * to make it possible to slide them
	 * over one and other.
	 *
	 * @return Fixed background container
	 */
	var fixBackground = function(parallaxContainer){
		//Find and hide image
		var image = $(parallaxContainer).find("img");
		image.hide();
		//Create the paralex containers
		var fixed_image = createDiv("fixed_image", {
			position: "fixed",
			top: "0px",
			left: "0px",
			width: "100%",
			height: "100%",
			overflow: "hidden"
		});
		var fixed_content = createDiv("fixed_content", {
			position: "absolute",
			top: "0px",
			left: "0px",
			width: "100%",
			height: "100%",
			background: "url("+image.attr("src")+") no-repeat top center fixed",
			backgroundSize: "cover"
		});

		$(fixed_image).append(fixed_content);
		return fixed_image;
	}

	
}