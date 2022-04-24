# preview-code-control

A simple webcomponent that displays code preview via highlight.js and shows a preview of the created code in an iframe.

I'm using this on my website (ie [here](https://matthias-kainer.de/blog/posts/20-years-of-microfrontends/#widgets)), so it is a bit of a playground and the theme is supposed to work best there.

## Usage

```html
    <script type="module" src="https://unpkg.com/preview-code-control@latest?module"></script>
    <preview-code-control
        location="relative/path/to/code-snippets"
        show="code,html,preview"
        >
        Please wait while the code is being loaded...
    </preview-code-control>
```

See the [/docs](docs/index.html) for more information.

### Attributes

    * `location` - The location of the code snippets. See format for details
    * `show` - The elements to show, in the order they should be shown. The first is selected per default	

### Format

Every snippet is stored in a folder with the following (optional) files:

* `index.js` - The code to be executed. Has to be an ES6 module
* `index.html` - The page to be displayed. Has to be an HTML file