smoothScroll
============

A teeny tiny, standard compliant, smooth scroll script with ease-in-out effect and no dependancy.

smoothScroll will tie all your internal links to a handler that will produce a smooth scroll to their target instead of an instant jump. It also returns an API that you can use to call a smooth scroll yourself.

This works in Firefox, Chrome, IE10, Opera and Safari.
Unsupported browsers would just use the normal internal link behaviour.


How to use
-
Just include smoothscroll inside your page, like this:

    <script type="text/javascript" src="path/to/smoothscroll.min.js"></script>

All your internal links will be tied to a smooth scroll.
If you want to call a smooth scroll from your code, you can now use the API by calling:

`window.smoothScroll(target, duration, callback, context)`

where:
* `target` is a `HTMLElement Object` from your document that you want to scroll to, or a numeric position on the page
* `duration` is the total duration of the scroll (optional, defaults to 500ms)
* `callback` is a function to be executed when the scrolling is over (optional)
* `context` is the scrolling context (optional, defaults to window, can be any `HTMLElement Object`)

Alternatively, you can install smoothscroll as a dependency using npm:

```
npm install --save smoothscroll
```

Example usage as a module, binding to a custom element:

```javascript
var smoothScroll = require('smoothscroll');

var exampleBtn = document.querySelector('.example-button');
var exampleDestination = document.querySelector('.example-destination');

// This function can easily be an onClick handler in React components
var handleClick = function(event) {
  event.preventDefault();

  smoothScroll(exampleDestination);
};

exampleBtn.addEventListener('click', handleClick);
```

smoothscroll.js
-
Here are some indications if you want to tweak the code to fit your needs:

There is an ease-in-out type timing function. You can change it quite easily in the code. Here is where I found the one I use:
- http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/

You can also change the default duration of a scroll, which is 500ms by default.

My code is **heavily** commented so you shoudn't lose yourself too much.

Example
-
The example.html file is basically the script applied to a w3c page. I just changed the style so the table of content is fixed to the left.

Check out the result. Wouldn't it be great if all w3c specs where that easy to navigate in?

Similar scripts
-
While I was looking for a name for this script, I found these sites. If this script is not what you need, you might have more luck there:
- http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
- http://www.kryogenix.org/code/browser/smoothscroll (best cross browser compatibility)

License
-
This library is released under the MIT license.
