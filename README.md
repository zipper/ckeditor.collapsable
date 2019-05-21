# ckeditor.collapsable
Plugin for CK Editor collapsable element, supposed to be used with https://github.com/zipper/jquery.collapsable at front-end.

## Usage
1. Download using npm, bower or whatever.
2. Add plugin to your CK Editor configuration.
	- Plugin name is `collapsable` (add to `extraPlugins`).
	- Plugin contains one button named `Collapsable` (add to `toolbar` definition).
3. Configure & use.

## Configuration

Below you can see default configuration of plugin.

```javascript
$('.js-wysiwyg').ckeditor({
    // ...
    
    collapsable: {
        useFallbackCSS: false,                               // Whether to use generic fallback CSS for CK editor
        bemClass: {
            block: 'wysiwyg-collapsable',                    // Main class assigned to block
            elements: {
                heading:   'wysiwyg-collapsable__heading',   // Main class assigned to heading
                link:      'wysiwyg-collapsable__link',      // Main class assigned to link
                linkInner: 'wysiwyg-collapsable__linkInner', // Main class assigned to span inside link
                box:       'wysiwyg-collapsable__box'        // Main class assigned to box
            }
        },
        additionalClass: {
            block: 'js-collapsable',                         // Additional class assigned to block
            elements: {
                heading:   'js-collapsable__control',        // Additional class assigned to heading
                link:      '',                               // Additional class assigned to link
                linkInner: '',                               // Additional class assigned to span inside link
                box:       'js-collapsable__box'             // Additional class assigned to box
            }
        }
    }

    // ...
});
```

### `useFallbackCSS`

Whether to use default fallback CSS defined by plugin. If you don't include your custom CSS into editor, you might want to set this to `true`. If you have your own CSS with styles for this component included, leave this as `false`.

### `bemClass`

You can use this option for setting your own BEM (not necessarily BEM) classes for all elements. These classes are then used for styling when [`useFallbackCSS`](#usefallbackcss) is set to `true`, therefore there should be only valid class string. These class are also used by plugin itself to recognize CK Editor widget.

### `additionalClass`

If you need more than one class on any element, use this option to set them. Multiple classes can be separated by space as this string is directly used for `class` attribute value.
