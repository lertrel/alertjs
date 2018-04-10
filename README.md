# alertjs
> JS **UI** LIB

Stage:
- [X] Pre-alpha
- [ ] Alpha
- [ ] Beta
- [ ] RC
- [ ] GA
- [ ] Live

#Installation

1. Make sure the html is comply with HTML5 by adding this at the first line of html file
```html
<!DOCTYPE html>
```
2. Adding all CSS and Javascript dependencies you need (apart from alertjs) in <body> tag
```html
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="css/kickstart.css" media="all" />
	<link rel="stylesheet" type="text/css" href="style.css" media="all" /> 
	
	<!-- Javascript -->
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/kickstart.js"></script>
```
3. Adding alertjs' javascirpt files ('alert.js' is mandatory, other optional js files as needed)
```html
	<script type="text/javascript" src="alertjs.js"></script>
	<script type="text/javascript" src="ui-kickstart.js"></script>
```
4. Adding javascript block for initiating alertjs
```javascript
	<script type="text/javascript" >
	var MyApp = {
		name: "My App",
		components: ["my-gadget"],
		uiDriver: "kickstart"
	};
	</script>
```
