/**
 * Alert JS by lertrel
 * https://github.com/lertrel/alertjs
 *
 * OBJECTIVE: JS UI LIB
 *
 * CONCEPTS:
 * !Easy start JS-based web client
 * !Can be used to build SPA but not fourcing the web client to be SPA
 * !Another JS MVC Framework???
 * !Help constracting of web client by solving these below areas
 *  - Modern web UI by utilizing plugable existing JS web UI products
 *  - Databinding between UI & cached data model in JS layer and further
 *  - Providing JS controller for wiring UI/data/actions
 *  - Communication between server & UI
 * !Do not restrict server-side technology
 * !Only run on client side
 * Can be integrated with but not requiring Node.js
 */


//=============================================================================
//An entry point
//=============================================================================
function AlertJS(app) {
	alert("Here");
	
	alertContext.app = app;
	
	document.title = app.name;
	
	var ctx = alertContext.getContext("default");
	
	for (var i = 0; i < app.components.length; ++i) {
		
		var componentId = app.components[i];
		
		alertContext.register(componentId, ctx);
	}
}


//=============================================================================
//Initiation of engine main instance
//=============================================================================
var alertContext = new Object();

alertContext.contexts = {};
alertContext.model = new Object();
alertContext.model.fields = [];
alertContext.renderers = new Object();

alertContext.getContext= function(ctxName) {

	if (!this.contexts[ctxName]) {

		var ctx = new Object();

		this.contexts[ctxName] = ctx;

		ctx.name = ctxName;
		ctx.models = {};
		ctx.components = [];
		ctx.wishRemoves = [];

		ctx.setModel = function (name, model) {
			this.models[name] = model;
		}

		ctx.getModel = function (name, model) {

			this.checkModel(name);
				
			return this.models[name];
		}

		ctx.hasModel = function (name) {
			return this.models[name];
		}

		ctx.checkModel = function (name) {

			if (!this.hasModel(name))
				throw "Model "+ name +" not found in context " + this.name;
				
		}

		ctx.removeModel = function (name) {

			this.checkModel(name);
			delete this.models[name];

		}

		ctx.removeNodeLater = function (node) {
			this.wishRemoves[this.wishRemoves.length] = node;
		}

		ctx.clearCache = function() {
			
			for (var i = 0; i < this.wishRemoves.length; ++i) {
				var node = this.wishRemoves[i];

				if (node.nodeType != 3) {
					console.log("Removing node: " + node.outerHTML.substring(0, 99));
				} else {
					console.log("Removing text: " + node.textContent.substring(0, 99));
				}
				node.parentNode.removeChild(node);
			}

			this.wishRemoves = [];
		}
	}
	
	return ctx;
}

alertContext.register = function (cid, ctx) {
	
	var node = document.getElementById(cid);

	if (!node) throw cid + " not found";
	
	alert(node.outerHTML);

	var modelName = node.getAttribute("data-model");
	var modelDef = eval(modelName);

	if (!modelDef) 
		modelDef = model.empty(); 

	ctx.setModel(modelName, modelDef);
	
	if (node.hasAttribute("data-context")) {

		var ctxName = node.getAttribute("data-context");
		ctx = alertContext.getContext(ctxName);
	}

	var ui = this.renderNodes(node, ctx, 0, null)[0];

	ui.name = cid;
	ui.modelName = modelName;
	ui.model = modelDef;

	ctx.components[ctx.components.length] == ui;
	ctx.clearCache();
}

alertContext.renderNodes = function (node, ctx, level) {

	//console.log("Level = " + level + ", node = " + node.tagName + ", id = " + node.id + ", text=" + node.textContent);
	if (!node || !node.nodeType || node.nodeType == 3) return [];

	var childUIs = [];
	var format = "";

	if (node.childNodes.length > 0) {

		var cacheNodes = [];

		for (var i = 0; i < node.childNodes.length; ++i) {
			cacheNodes[i] = node.childNodes[i];
		}

		for (var i = 0; i < cacheNodes.length; ++i) {

			var child = node.childNodes[i];

			//console.log("Process child node at Level = " + level + ", node = " + child.tagName + ", id = " + child.id + ", text=" + child.textContent);
			if (!child || !child.nodeType) continue;
			if (child.nodeType == 3) {
				format += child.textContent;
				console.log("Add for remove text: " + node.textContent.substring(0, 99));
				ctx.removeNodeLater(child);
			}


			var uis = this.renderNodes(child, ctx, level + 1, node);

			for (var j = 0; j < uis.length; ++j)
				childUIs[childUIs.length] = uis[j];
		}
	}
	
	var ui = this.renderNode(node, ctx);

	if (ui) {
		ui.components = childUIs;
		ui.format = (null == format) ? node.innerText: format;

		return [ui];
	} else {
		return []
	}
}

alertContext.renderNode = function (node, ctx) {

	var ui = null;

	if (node && node.nodeType && node.nodeType != 3) { 
	
		var viewName;

		if (node.hasAttribute("data-view"))
			viewName = node.getAttribute("data-view");
		else
			viewName = model.findViewName(node);

		if (viewName) {
			var renderer = this.findViewRenderer(viewName);
		
			ui = renderer.render(node, ctx);
		} else {
			console.log("Add for remove node: " + node.outerHTML.substring(0, 99));
			ctx.removeNodeLater(node);
		}

	} //Otherwise ignore this node

	return ui;
}


//=============================================================================
//UI Rendering
//Extension Point: 
//alertContext.renderers["<DRIVER>.<COMPONENT>"] = new Object();
//alertContext.renderers["<DRIVER>.<COMPONENT>"].render = function(node) { ... }
//=============================================================================
alertContext.findViewRenderer = function (vName) {

	if (!this.app.uiDriver) this.app.uiDriver = "kickstart";
	
	var renderer = this.renderers[this.app.uiDriver + "." + vName];
	
	if (!renderer) throw "No renderer found - " + vName; else return renderer;
}


//=============================================================================
//Model Later 
//=============================================================================

//-----------------------------------------------------------------------------
//Data Binding
//-----------------------------------------------------------------------------

//***
//*** Data Type
//***
var DataBind = function () {}

DataBind.prototype = new Object();

DataBind.prototype.format = null;
DataBind.prototype.constraints = [];

DataBind.prototype.addConstraint = function(c) {
}

DataBind.prototype.verify = function (value) {

	for (var i = 0; i < this.constraints.length; ++i) {

		if (!this.constraints[i].verify(value))
			return false;
	}

	return true;
}

DataBind.prototype.asString = function(value) {
}


var DataNum = function () {}

DataNum.prototype = new DataBind();

DataNum.prototype.verify = function (value) {

	if (!parent.verify(value)) {

		return false;
	} else {

		//Do some thing
		
		return true;
	}
}

DataNum.prototype.asString = function(value) {

	if (!this.format) {

		return "" + value;
	} else {

		return "";
	}
}


//***
//*** Constraint 
//***
var Constraint = function (name) {
	this.name = name;
}

Constraint.prototype = new Object();

Constraint.prototype.name = "";

Constraint.prototype.verify = function (value) {
}

/*Id*/
var ConstId = function(name) {
	
	this.name = name;
}

ConstId.prototype = new Constraint();

ConstId.prototype.verify = function (value) {
}

/*Required*/
var ConstRequired = function(name) {
	
	this.name = name;
}

ConstRequired.prototype = new Constraint();

ConstRequired.prototype.verify = function (value) {
}

alertContext.constraints = {};

alertContext.constraints["id"] = new ConstId("id");
alertContext.constraints["required"] = new ConstRequired("required");


//-----------------------------------------------------------------------------
//Model
//-----------------------------------------------------------------------------
var model = new Object();

model.empty = function() {

	return null;
}

model.findViewName = function (node) {
	return null;
}

model.parseConstraints = function (bind, constraints) {

	if (constraints && (typeof constraints == "string")) {

		cArr = constraints.split(";");

		for (var i = 0; i < cArr.length; ++i) {
			bind.addConstraint(cArr[i]);
		}
	}
}

model.num = function (constraints, format) {

	var bind = new DataNum();

	bind.format = format;

	this.parseConstraints(bind, constraints);

	return bind;
}

model.str = function (constraints, format) {

}
 
model.bool = function (constraints, format) {

}
