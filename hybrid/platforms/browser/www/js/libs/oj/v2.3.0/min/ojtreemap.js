/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojdvt-base","ojs/internal-deps/dvt/DvtTreeView"],function(a,g,b,c,d){a.Ra("oj.ojTreemap",g.oj.dvtBaseComponent,{widgetEventPrefix:"oj",options:{optionChange:null},Dg:function(a,b,c){return d.Treemap.newInstance(a,b,c)},Hk:function(a){var b=a.subId;"oj-treemap-node"==b?b="node"+this.Pu(a.indexPath):"oj-treemap-tooltip"==b&&(b="tooltip");return b},Oh:function(a){var b={};0==a.indexOf("node")?(b.subId="oj-treemap-node",b.indexPath=this.Qm(a)):
"tooltip"==a&&(b.subId="oj-treemap-tooltip");return b},Jf:function(){var a=this._super();a.push("oj-treemap");return a},Ej:function(){var a=this._super();a["oj-treemap-attribute-type-text"]={path:"styleDefaults/_attributeTypeTextStyle",property:"CSS_TEXT_PROPERTIES"};a["oj-treemap-attribute-value-text"]={path:"styleDefaults/_attributeValueTextStyle",property:"CSS_TEXT_PROPERTIES"};a["oj-treemap-node"]={path:"nodeDefaults/labelStyle",property:"CSS_TEXT_PROPERTIES"};a["oj-treemap-node oj-hover"]={path:"nodeDefaults/hoverColor",
property:"border-top-color"};a["oj-treemap-node oj-selected"]=[{path:"nodeDefaults/selectedOuterColor",property:"border-top-color"},{path:"nodeDefaults/selectedInnerColor",property:"border-bottom-color"}];a["oj-treemap-node-header"]=[{path:"nodeDefaults/header/backgroundColor",property:"background-color"},{path:"nodeDefaults/header/borderColor",property:"border-top-color"},{path:"nodeDefaults/header/labelStyle",property:"CSS_TEXT_PROPERTIES"}];a["oj-treemap-node-header oj-hover"]=[{path:"nodeDefaults/header/hoverBackgroundColor",
property:"background-color"},{path:"nodeDefaults/header/hoverOuterColor",property:"border-top-color"},{path:"nodeDefaults/header/hoverInnerColor",property:"border-bottom-color"},{path:"nodeDefaults/header/_hoverLabelStyle",property:"CSS_TEXT_PROPERTIES"}];a["oj-treemap-node-header oj-selected"]=[{path:"nodeDefaults/header/selectedBackgroundColor",property:"background-color"},{path:"nodeDefaults/header/selectedOuterColor",property:"border-top-color"},{path:"nodeDefaults/header/selectedInnerColor",
property:"border-bottom-color"},{path:"nodeDefaults/header/_selectedLabelStyle",property:"CSS_TEXT_PROPERTIES"}];return a},Fj:function(){return["optionChange"]},Ti:function(){var a=this.options.translations,b=this._super();b["DvtTreemapBundle.COLOR"]=a.labelColor;b["DvtTreemapBundle.ISOLATE"]=a.tooltipIsolate;b["DvtTreemapBundle.RESTORE"]=a.tooltipRestore;b["DvtTreemapBundle.SIZE"]=a.labelSize;b["DvtUtilBundle.TREEMAP"]=a.componentName;return b},El:function(a){if("isolate"===a.type){var b=this.options.iaa;
b||(this.options.iaa=[],b=this.options.iaa);(a=a.id)?(b.push(a),this.fe("isolatedNode",a)):(b.pop(),this.fe("isolatedNode",0<b.length?b[b.length]:null))}else this._super(a)},Tm:function(){null==this.options._resources&&(this.options._resources={});var a=this.options._resources;a.isolate="oj-treemap-isolate-icon";a.isolateOver="oj-treemap-isolate-icon oj-hover";a.isolateDown="oj-treemap-isolate-icon oj-active";a.restore="oj-treemap-restore-icon";a.restoreOver="oj-treemap-restore-icon oj-hover";a.restoreDown=
"oj-treemap-restore-icon oj-active"},getNode:function(a){a=this.xa.getAutomation().getNode(a);this.Ri(a);return a},getContextByNode:function(a){return(a=this.getSubIdByNode(a))&&"oj-treemap-tooltip"!==a.subId?a:null},Ik:function(){return{root:["nodes"]}}});a.Components.Xa("ojTreemap","dvtBaseComponent",{properties:{animationDuration:{type:"number"},animationOnDataChange:{type:"string"},animationOnDisplay:{type:"string"},animationUpdateColor:{type:"string"},colorLabel:{type:"string"},groupGaps:{type:"string"},
hiddenCategories:{type:"Array\x3cstring\x3e"},highlightedCategories:{type:"Array\x3cstring\x3e"},highlightMatch:{type:"string"},hoverBehavior:{type:"string"},hoverBehaviorDelay:{type:"number|string"},isolatedNode:{type:"string"},layout:{type:"string"},nodeDefaults:{type:"object"},nodes:{type:"Array\x3cobject\x3e"},nodeSeparators:{type:"string"},selection:{type:"Array\x3cstring\x3e"},selectionMode:{type:"string"},sizeLabel:{type:"string"},sorting:{type:"string"},tooltip:{type:"object"},touchResponse:{type:"string"}},
methods:{getContextByNode:{},getNode:{}},extension:{_widgetName:"ojTreemap"}});a.Components.register("oj-treemap",a.Components.getMetadata("ojTreemap"))});