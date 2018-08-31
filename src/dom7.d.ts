export interface Dom7 {
    length: number;

    /**  Retrieve one of the elements matched by the Dom7 object (jQuery syntax). **/
    [index:number]: Element;

    // CLASSES
    /** Add class to elements */
    addClass(className : string) : Dom7;
    /** Remove specified class */
    removeClass(className : string) : Dom7;
    /** Determine whether any of the matched elements are assigned the given class */
    hasClass(className : string) : Dom7;
    /** Remove (if class is present) or add (if not) one or more classes from each element in the set of matched elements */
    toggleClass(className : string) : Dom7;

    // ATTRIBUTES AND PROPERTIES
    /** Get property value */
    prop(propName : string) : any;
    /** Set single property value */
    prop(propName : string, propValue: any) : Dom7;
    /** Set multiple properties */
    prop(propertiesObject : any) : Dom7;
    /** Get attribute value */
    attr(attrName : string) : string;
    /** Set single attribute value */
    attr(attrName : string, attrValue : string) : Dom7;
    /** Set multiple attributes */
    attr(attributesObject : any) : Dom7;
    /** Remove specified attribute */
    removeAttr(attrName : string) : Dom7;
    /** Get the current value of the first element in the set of matched elements */
    val() : any;
    /** Set the value of every matched element */
    val(newValue : any) : Dom7;

    // DATA
    /** Store arbitrary data associated with the matched elements */
    data(key : string, value : any) : Dom7;
    /** Return the value at the named data store for the first element in the collection, as set by data(key, value) or by an HTML5 data-* attribute */
    data(key : string) : any;
    /** Remove specified data */
    removeData(key : string): void;
    /** Returns element's data set (set of data- attributes) as plain Object */
    dataset() : any;

    // CSS TRASFORMS, TRANSITIONS
    /** Adds prefixed CSS transform property */
    transform(CSSTransformString : string) : Dom7;
    /** Set CSS transition-duration property to collection */
    transition(transitionDuration : number) : Dom7;

    // EVENTS
    /** Add event handler function to one or more events to the selected elements */
    on(eventName : string, handler : (event : Event) => void, useCapture? : boolean) : Dom7;
    /** Live/delegated event handler */
    on(eventName : string, delegatedTarget : string, handler : (event : Event) => void, useCapture? : boolean) : Dom7;
    /** Add event handler function to one or more events to the selected elements that will be executed only once */
    once(eventName : string, handler : (event : Event) => void, useCapture? : boolean) : Dom7;
    /** Live/delegated event handler that will be executed only once */
    once(eventName : string, delegatedTarget : string, handler : (event : Event) => void, useCapture? : boolean) : Dom7;
    /** Remove event handler */
    off(eventName : string, handler : (event : Event) => void, useCapture? : boolean) : Dom7;
    /** Remove live/delegated event handler */
    off(eventName : string, delegatedTarget : string, handler : (event : Event) => void, useCapture? : boolean) : Dom7;
    /** Execute all handlers added to the matched elements for the specified event */
    trigger(eventName : string, eventData : any) : Dom7;
    /** Adds prefixed transitionEnd event handler to collection */
    transitionEnd(callback : () => void, permanent : boolean) : Dom7;
    /** Adds prefixed animationEnd event handler to collection */
    animationEnd(callback : () => void) : Dom7;

    // STYLES
    /** Get the current computed width for the first element in the set of matched elements */
    width() : number;
    /** Set width for the first element in the set of matched elements */
    width(value: string | number) : Dom7;
    /** Get the current computed width for the first element in the set of matched elements, including padding and border, and margin (if includeMargin is true) */
    outerWidth(includeMargin? : boolean) : number;
    /** Set width for the first element in the set of matched elements, including padding and border, and margin (if includeMargin is true) */
    outerWidth(value: string | number) : Dom7;
    /** Get the current computed height for the first element in the set of matched elements */
    height() : number;
    /** Set height for the first element in the set of matched elements */
    height(value: string | number) : Dom7;
    /** Get the current computed height for the first element in the set of matched elements, including padding and border, and margin (if includeMargin is true) */
    outerHeight(includeMargin? : boolean) : number;
    /** Set height for the first element in the set of matched elements, including padding and border, and margin (if includeMargin is true) */
    outerHeight(value: string | number) : Dom7;
    /** Get the current coordinates of the first element relative to the document */
    offset() : {top: number, left: number};
    /** Set the coordinates of the first element relative to the document */
    offset(value: string | number) : Dom7;
    /** Set "display:none" to the matched elements */
    hide() : void;
    /** Set "display:block" to the matched elements */
    show() : void;
    /** Get value of specified CSS property for the first element */
    css(property : string) : string | number;
    /** Set specified CSS property to the matched elements */
    css(property : string, value: string | number) : Dom7;
    /** Set multiple CSS properties to the matched elements */
    css(propertiesObject : any) : Dom7;

    // SCROLL
    /** Get scrollTop position of element */
    scrollTop() : number;
    /** Set scrollTop "position" with animation during "duration" (in ms). Scroll top position will be set immediately if duration is not specified. If you have specified "callback" function, then it will be executed after scrolling completed */
    scrollTop(position : number, duration? : number, callback? : () => void) : Dom7;
    /** Get scrollLeft position of element */
    scrollLeft() : number;
    /** Set scrollLeft "position" with animation during "duration" (in ms). Scroll left postion will be set immediately if duration is not specified. If you have specified "callback" function, then it will be executed after scrolling completed */
    scrollLeft(position : number, duration? : number, callback? : () => void) : Dom7;
    /** Set scroll left and scroll top with animation during "duration" (in ms). Scroll postion will be set immediately if duration is not specified. If you have specified "callback" function, then it will be executed after scrolling completed */
    scrollTo(left : number, top : number, duration? : number, callback? : () => void) : Dom7;

    // DOM MANIPULATION
    /** Add HTML element to the set of matched elements */
    add(html: string) : Dom7;
    /** Create a new Dom7 collection with elements added to the set of matched elements */
    add(... elements : Array<Element | Dom7>) : Dom7;
    /** Iterate over collection, executing a callback function for each matched element */
    each(callback : (index : number, element : any) => void) : Dom7;
    /** Get the HTML contents of the first element in the set of matched elements */
    html() : string;
    /** Set the HTML contents of every matched element */
    html(newInnerHTML : string) : Dom7;
    /** Get the text contents of the first element in the set of matched elements */
    text() : string;
    /** Set the text contents of every matched element */
    text(newTextContent : string) : Dom7;
    /** `.is(CSSSelector)` :
     * Check the current matched set of elements against CSS selector
     *
     * `.is(HTMLElement)` :
     * Check the current matched set of elements against HTML element or Dom7 collection
     * */
    is(CSSSelector : string | Element | Dom7) : boolean;
    /** Return the position of the first element within the Dom7 collection relative to its sibling elements */
    index() : number;
    /** Reduce the set of matched elements to the one at the specified index */
    eq(index : number) : Dom7;
    /** `.append(HTMLString)` :
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements
     *
     * `.append(HTMLElement)` :
     * Insert specified HTML element to the end of element in the set of matched elements
     * */
    append(element : string | Element | Dom7) : Dom7;
    /** Insert content/elements, to the end of element specified in parameter */
    appendTo(element : string | Element | Dom7) : Dom7;
    /** `.prepend(newHTML)` :
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements
     *
     * `.prepend(HTMLElement)` :
     * Insert specified HTML element to the beginning of element in the set of matched elements
     * */
    prepend(element : string | Element | Dom7) : Dom7;
    /** Insert content/elements, to the beginning of element specified in parameter */
    prependTo(element : string | Element | Dom7) : Dom7;
    /** Insert every element in the set of matched elements before the target. Target could be specified as CSS selector or HTML element or Dom7 collection */
    insertBefore(element : string | Element | Dom7) : Dom7;
    /** Insert every element in the set of matched elements after the target. Target could be specified as CSS selector or HTML element or Dom7 collection */
    insertAfter(element : string | Element | Dom7) : Dom7;
    /** Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector */
    next(selector? : string) : Dom7;
    /** Get all following siblings of each element in the set of matched elements, optionally filtered by a selector */
    nextAll(selector? : string) : Dom7;
    /** Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector */
    prev(selector? : string) : Dom7;
    /** Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector */
    prevAll(selector? : string) : Dom7;
    /** Get the siblings of each element in the set of matched elements, optionally filtered by a selector */
    siblings(selector? : string) : Dom7;
    /** Get the first parent of each element in the current set of matched elements, optionally filtered by a selector */
    parent(selector? : string) : Dom7;
    /** Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector */
    parents(selector? : string) : Dom7;
    /** For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree */
    closest(selector? : string) : Dom7;
    /** Get the descendants of each element in the current set of matched elements, filtered by a selector */
    find(selector? : string) : Dom7;
    /** Get the children of each element in the set of matched elements, optionally filtered by a selector */
    children(selector? : string) : Dom7;
    /** Filter collection of elements */
    filter(callback : (index : number, element : any) => boolean) : Dom7;
    /** Remove/detach matched elements from the Dom */
    remove() : Dom7;
    /** Remove all child nodes of the set of matched elements from the DOM. Alias for `.html('')` */
    empty() : Dom7;

    // SHORTCUTS
    /** Trigger "click" event on collection */
    click() : Dom7;
    /** Add "click" event handler to collection */
    click(handler : (event : Event) => void) : Dom7;
    /** Trigger "blur" event on collection */
    blur() : Dom7;
    /** Add "blur" event handler to collection */
    blur(handler : (event : Event) => void) : Dom7;
    /** Trigger "focus" event on collection */
    focus() : Dom7;
    /** Add "focus" event handler to collection */
    focus(handler : (event : Event) => void) : Dom7;
    /** Trigger "focusin" event on collection */
    focusin() : Dom7;
    /** Add "focusin" event handler to collection */
    focusin(handler : (event : Event) => void) : Dom7;
    /** Trigger "focusout" event on collection */
    focusout() : Dom7;
    /** Add "focusout" event handler to collection */
    focusout(handler : (event : Event) => void) : Dom7;
    /** Trigger "keyup" event on collection */
    keyup() : Dom7;
    /** Add "keyup" event handler to collection */
    keyup(handler : (event : Event) => void) : Dom7;
    /** Trigger "keydown" event on collection */
    keydown() : Dom7;
    /** Add "keydown" event handler to collection */
    keydown(handler : (event : Event) => void) : Dom7;
    /** Trigger "keypress" event on collection */
    keypress() : Dom7;
    /** Add "keypress" event handler to collection */
    keypress(handler : (event : Event) => void) : Dom7;
    /** Trigger "submit" event on collection */
    submit() : Dom7;
    /** Add "submit" event handler to collection */
    submit(handler : (event : Event) => void) : Dom7;
    /** Trigger "change" event on collection */
    change() : Dom7;
    /** Add "change" event handler to collection */
    change(handler : (event : Event) => void) : Dom7;
    /** Trigger "mousedown" event on collection */
    mousedown() : Dom7;
    /** Add "mousedown" event handler to collection */
    mousedown(handler : (event : Event) => void) : Dom7;
    /** Trigger "mousemove" event on collection */
    mousemove() : Dom7;
    /** Add "mousemove" event handler to collection */
    mousemove(handler : (event : Event) => void) : Dom7;
    /** Trigger "mouseup" event on collection */
    mouseup() : Dom7;
    /** Add "mouseup" event handler to collection */
    mouseup(handler : (event : Event) => void) : Dom7;
    /** Trigger "mouseenter" event on collection */
    mouseenter() : Dom7;
    /** Add "mouseenter" event handler to collection */
    mouseenter(handler : (event : Event) => void) : Dom7;
    /** Trigger "mouseleave" event on collection */
    mouseleave() : Dom7;
    /** Add "mouseleave" event handler to collection */
    mouseleave(handler : (event : Event) => void) : Dom7;
    /** Trigger "mouseout" event on collection */
    mouseout() : Dom7;
    /** Add "mouseout" event handler to collection */
    mouseout(handler : (event : Event) => void) : Dom7;
    /** Trigger "mouseover" event on collection */
    mouseover() : Dom7;
    /** Add "mouseover" event handler to collection */
    mouseover(handler : (event : Event) => void) : Dom7;
    /** Trigger "touchstart" event on collection */
    touchstart() : Dom7;
    /** Add "touchstart" event handler to collection */
    touchstart(handler : (event : Event) => void) : Dom7;
    /** Trigger "touchend" event on collection */
    touchend() : Dom7;
    /** Add "touchend" event handler to collection */
    touchend(handler : (event : Event) => void) : Dom7;
    /** Trigger "touchmove" event on collection */
    touchmove() : Dom7;
    /** Add "touchmove" event handler to collection */
    touchmove(handler : (event : Event) => void) : Dom7;
    /** Add "resize" event handler to collection */
    resize(handler : (event : Event) => void) : Dom7;
    /** Add "scroll" event handler to collection */
    scroll(handler : (event : Event) => void) : Dom7;
}

export interface Dom7Static
{
    (): Dom7;
    (selector: string, context?: Element|Dom7): Dom7;
    (element: Element): Dom7;
    (element: Document): Dom7;
    (elementArray: Element[]): Dom7;
    (event: EventTarget): Dom7;

    // UTILITY
    /** Remove duplicates in passed array. Returns a new unique array */
    unique<T>(target: T[]) : T[];
    /** Convert hypens-case string to camelCase string. Returns a new camelCase string */
    toCamelCase(string: string) : string;
    /** Get element's data set (set of data- attributes) as plain Object. Returns a new plain object with dataset */
    dataset(target: string | HTMLElement | Dom7) : any;
    /** Cross-browser implementation on requestAnimationFrame. Returns animation request id, that uniquely identifies the entry in the callback list */
    requestAnimationFrame(callback: () => void) : number;
    /** Cancels an animation frame request. */
    cancelAnimationFrame(requestID: number): void;
}

declare const Dom7 : Dom7Static

export default Dom7
