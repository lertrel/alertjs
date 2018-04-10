# alertjs
> JS **UI** LIB

Stage:
- [X] Pre-alpha
- [ ] Alpha
- [ ] Beta
- [ ] RC
- [ ] GA
- [ ] Live

# alertjs???
`What?`

> Yet another opensource JS UI LIB

`When?`

> Coming soon

`Where?`

> Conding in HTML & Javascript, running completely on client side (*web browser*)

`Why?`

> Very simple concept + easy to setup, coding, modifying, maintaining

`How?`

> Please see below

# Installation

1. Make sure the html is complying with HTML5 by adding this at the first line of html file (before `<html>` tag)
```html
<!DOCTYPE html>
```
2. Adding all CSS and Javascript dependencies you need (apart from alertjs) inside html `<head>` tag
```html
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="css/kickstart.css" media="all" />
	<link rel="stylesheet" type="text/css" href="style.css" media="all" /> 
	
	<!-- Javascript -->
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/kickstart.js"></script>
```
3. Still inside html `<head>` tag, adding alertjs' javascirpt files ('alert.js' is mandatory, other optional js files as needed)
```html
	<script type="text/javascript" src="alertjs.js"></script>
	<script type="text/javascript" src="ui-kickstart.js"></script>
```
4. Still inside html `<head>` tag, adding another javascript block for initiating alertjs
```javascript
	<script type="text/javascript" >
	var MyApp = {
		name: "My App",
		components: ["my-gadget"],
		uiDriver: "kickstart"
	};
	</script>
```
5. Anywhere inside html `<body>` tag, adding an html tag as a place holder for rendering alertjs UI (ex. `<DIV>`, `<P>`, `<IFRAME>`, etc.)
```html
	<div class="col_12" style="background-color: red" data-view="tabs" data-model="Todo" id="my-gadget"></div>
```
**NOTE**
- Attribute id has to be defined and has to be same with what defined in components field from item 4
- Attribute data-view has to be defined as one of the names of alertjs' supported UI component (e.g., "crud", "table", etc.)
- Attribute data-model is optional for when developer needs to take advantage on alertjs data binding

6. Triggering alertjs engine to start by adding javascript function call to onload event of html `<body>` tag
```html
<body onload="AlertJS(MyApp)">
```
[See full example](https://github.com/lertrel/alertjs/blob/master/index.html)
