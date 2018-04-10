/**
 * Alert JS by lertrel
 * https://github.com/lertrel/alertjs
 *
 * OBJECTIVE: HTML Kickstart Integration
 *
 * CONCEPTS:
 * !Create "HTML Kickstart" version of AlertJS renderer
 * !This will render HTML UI using HTML Kickstart features
 */

alertContext.renderers["kickstart.tabs"] = new Object();

alertContext.renderers["kickstart.tabs"].render = function(node) {
	
	var tabs = document.createElement("ul");
	tabs.className = "tabs left";

	var tabBt1 = document.createElement("li");
	var a1 = document.createElement("a");
	var t1 = document.createTextNode("Tab1");

	a1.appendChild(t1);
	a1.href = "myTab1";

	tabBt1.appendChild(a1);
	tabs.appendChild(tabBt1);

	var tabCtn1 = document.createElement("div");
	tabCtn1.id = "myTab1";
	tabCtn1.className = "tab-content";

	var tabTxt1 = document.createTextNode("Tab Content1");

	tabCtn1.appendChild(tabTxt1);

	node.appendChild(tabs);
	node.appendChild(tabCtn1);
	
	console.log(node.innerHTML);

	return new Object();
}

