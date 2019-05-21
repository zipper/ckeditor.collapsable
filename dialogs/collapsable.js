CKEDITOR.dialog.add('collapsable', function(editor) {
	return {
		title: editor.lang.collapsable.title,
		minWidth: 500,
		minHeight: 100,
		contents: [
			{
				id: 'info',
				label: 'Text',
				elements: [
					{
						id: 'heading',
						type: 'text',
						label: editor.lang.collapsable.heading,
						setup: function(widget) {
							var heading = widget.editables.heading.getData();

							widget.setData('heading', heading);
							this.setValue(heading);
						},
						commit: function (widget) {
							widget.setData('heading', this.getValue());
						}
					},
					{
						id: 'content',
						type: 'textarea',
						label: editor.lang.collapsable.content,
						rows: 10,
						setup: function(widget) {
							var content = widget.editables.content.getData();

							widget.setData('content', content);
							this.setValue(content);
						},
						commit: function (widget) {
							widget.setData('content', this.getValue());
						}
					}
				]
			}
		]
	};
} );
