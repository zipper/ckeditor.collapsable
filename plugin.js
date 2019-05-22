CKEDITOR.plugins.add('collapsable', {
	requires: 'widget',
	icons: 'collapsable',
	lang: ['en', 'cs', 'sk'],
	init: function (editor) {
		CKEDITOR.dtd.$editable['span'] = true;
		CKEDITOR.dtd.$removeEmpty['span'] = false;

		CKEDITOR.dialog.add('collapsable', this.path + 'dialogs/collapsable.js');

		/* Set default options */
		var options = editor.config.collapsable || {};
		var headingTag = typeof options.headingTag === 'string' && options.headingTag || 'h3';

		function getClassName(fromBem, element, defaultClass) {
			var context = fromBem ? 'bemClass' : 'additionalClass';
			var className = options[context] && options[context][element];

			if (typeof className === 'undefined') {
				className =  options[context] && options[context]['elements'] && options[context]['elements'][element];
			}

			if (typeof className === 'undefined') {
				className = defaultClass;
			}

			return className;
		}

		var bemClass = {
			block: getClassName(true, 'block', 'wysiwyg-collapsable'),
			elements: {
				heading:   getClassName(true, 'heading',   'wysiwyg-collapsable__heading'),
				link:      getClassName(true, 'link',      'wysiwyg-collapsable__link'),
				linkInner: getClassName(true, 'linkInner', 'wysiwyg-collapsable__link-inner'),
				box:       getClassName(true, 'box',       'wysiwyg-collapsable__box')
			}
		};

		var additionalClass = {
			block: getClassName(false, 'block', 'js-collapsable'),
			elements: {
				heading:   getClassName(false, 'heading',   'js-collapsable__control'),
				link:      getClassName(false, 'link',      ''),
				linkInner: getClassName(false, 'linkInner', ''),
				box:       getClassName(false, 'box',       'js-collapsable__box')
			}
		};

		/* Set CSS if required */
		if (options.useFallbackCSS) {
			CKEDITOR.addCss("" +
				"." + bemClass.block + " { margin:0 0 1em; padding:5px; }" +
				"." + bemClass.elements.heading + " { display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-align:center; -ms-flex-align:center; align-items:center; font-size:150%; }" +
				"." + bemClass.elements.heading + ":before { -webkit-box-flex:0; -ms-flex:0 0 auto; flex:0 0 auto; width:0; height:0; margin:0 .5em 0 0; border-style:solid; border-width: .33em .33em 0; border-color: currentColor transparent transparent; content:''; }" +
				"." + bemClass.elements.link + " { -webkit-box-flex:0; -ms-flex:0 1 100%; flex:0 1 100%; text-decoration:none; color:inherit; }" +
				"." + bemClass.elements.linkInner + " { display:block; }" +
				"." + bemClass.elements.box + " { margin-left:calc(1.5 * (.5em + .66em)); }"
			);
		}

		/* Create widget */
		editor.widgets.add('collapsable', {
			button: editor.lang.collapsable.title,
			dialog: 'collapsable',
			lang: ['en', 'cs', 'sk'],
			template:
				'<section class="' + bemClass.block + ' ' + additionalClass.block + '">\n' +
				'	<' + headingTag +' class="' + bemClass.elements.heading + ' ' + additionalClass.elements.heading + '">\n' +
				'		<a class="' + bemClass.elements.link + ' ' + additionalClass.elements.link + '" href="#">\n' +
				'			<span class="' + bemClass.elements.linkInner + ' ' + additionalClass.elements.linkInner + '">{heading}</span>\n' +
				'		</a>\n' +
				'	</' + headingTag + '>\n' +
				'	<div class="' + bemClass.elements.box + ' ' + additionalClass.elements.box + '">\n' +
				'		{content}\n' +
				'	</div>\n' +
				'</section>',

			editables: {
				heading: {
					selector: '.' + bemClass.elements.linkInner,
					allowedContent: 'br'
				},
				content: {
					selector: '.' + bemClass.elements.box,
					allowedContent: 'p ul ol li br strong em; img[!src,alt]; a[!href]'
				}
			},
			allowedContent: 'section(!' + bemClass.block + ', ' + additionalClass.block.split(' ').join(', ') + ');' +
				'' + headingTag + '(!' + bemClass.elements.heading + ', ' + additionalClass.elements.heading.split(' ').join(', ') + ');' +
				'a(!' + bemClass.elements.link + ', ' + additionalClass.elements.link.split(' ').join(', ') + ');' +
				'span(!' + bemClass.elements.linkInner + ', ' + additionalClass.elements.linkInner.split(' ').join(', ') + ');' +
				'div(!' + bemClass.elements.box + ', ' + additionalClass.elements.box.split(' ').join(', ') + ');',
			requiredContent: 'section(' + bemClass.block + ')',
			defaults: {
				heading: (options.defaults && options.defaults.heading || editor.lang.collapsable.heading),
				content: (options.defaults && options.defaults.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.')
			},
			upcast: function(element) {
				return element.name === 'section' && element.hasClass(bemClass.block);
			},
			init: function() {

				// editables
				for (var i in this.data) {
					if (this.data.hasOwnProperty(i) && i in this.editables) {
						this.setData(i, this.editables[i].getData());
					}
				}

			},
			data: function() {

				// editables
				for (var i in this.data) {
					if (this.data.hasOwnProperty(i) && i in this.editables) {
						this.editables[i].setData(this.data[i]);
					}
				}

			}
		});
	}
});
