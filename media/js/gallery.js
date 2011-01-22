jQuery.fn.gallery = function(timeout, tag) {

	timeout = timeout || 10000;
	tag = tag || 'img';
	//console.log('timeout: '+timeout);
	//console.log('tag: '+tag);

	return this.each(function() {
		$(this)
			.find(tag+':not(:first)')
				.css('opacity', 0)
			.end()
			.find(tag)
				.css({
					'position': 'absolute',
					'top': 0,
					'left': 0
				})
				.bind('fade', {}, function() {
					$(this).animate({opacity: 0}, timeout);
					(($(this).next(tag).length == 0) ? $(this).siblings(tag+':first') : $(this).next(tag))
						.animate({opacity: 1}, timeout, function() {
							$(this).trigger('fade');
						});
				})
			.end()
			.find(tag+':first')
				.load(function() {
					$(this).trigger('fade');
				});
	});

};
