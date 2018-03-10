// JavaScript Document
$(document).ready(function() {
	
	/*----列表树相关事件----*/
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	$("#addParent").bind("click", {isParent:true}, add);
	$("#addLeaf").bind("click", {isParent:false}, add);
	$("#edit").bind("click", edit);
	$("#remove").bind("click", remove);
	$("#clearChildren").bind("click", clearChildren);
	/*----列表树相关事件 END----*/
	
	$("table.divRightTable tbody tr:odd").addClass("trOn");
});



var setting = {
	check: {
				enable: true
			},
	view: {
		selectedMulti: false,
		showIcon: showIconForTree
	},
	edit: {
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data: {
		keep: {
			parent:true,
			leaf:true
		},
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeDrag: beforeDrag,
		beforeRemove: beforeRemove,
		beforeRename: beforeRename,
		onRemove: onRemove
	}
};

var zNodes =[
	{ id:1, pId:0, name:"食品", open:true},
	{ id:11, pId:1, name:"面包"},
	{ id:12, pId:1, name:"方便面"},
	{ id:13, pId:1, name:"火腿肠"},
	{ id:14, pId:1, name:"车仔面"},
	{ id:2, pId:0, name:"饮料", open:true},
	{ id:21, pId:2, name:"矿泉水"},
	{ id:22, pId:2, name:"牛奶"},
	{ id:23, pId:2, name:"咖啡"},
	{ id:24, pId:2, name:"汽水"},
	{ id:3, pId:0, name:"日用品", open:false},
	{ id:31, pId:3, name:"子级部门1"},
	{ id:32, pId:3, name:"子级部门2"},
	{ id:33, pId:3, name:"子级部门3"},
	{ id:4, pId:0, name:"分类", open:true},
	{ id:41, pId:4, name:"子级部门1"},
	{ id:42, pId:4, name:"子级部门2"},
	{ id:43, pId:4, name:"子级部门3"}
];
var log, className = "dark";
function beforeDrag(treeId, treeNodes) {
	return false;
}
function beforeRemove(treeId, treeNode) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function onRemove(e, treeId, treeNode) {
	showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}
function beforeRename(treeId, treeNode, newName) {
	if (newName.length == 0) {
		alert("节点名称不能为空.");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		setTimeout(function(){zTree.editName(treeNode)}, 10);
		return false;
	}
	return true;
}
function showLog(str) {
	if (!log) log = $("#log");
	log.append("<li class='"+className+"'>"+str+"</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}
function getTime() {
	var now= new Date(),
	h=now.getHours(),
	m=now.getMinutes(),
	s=now.getSeconds(),
	ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}

var newCount = 1;
function add(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	isParent = e.data.isParent,
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (treeNode) {
		treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
	} else {
		treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:"new node" + (newCount++)});
	}
	if (treeNode) {
		zTree.editName(treeNode[0]);
	} else {
		alert("叶子节点被锁定，无法增加子节点");
	}
};
function edit() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0) {
		alert("请先选择一个节点");
		return;
	}
	zTree.editName(treeNode);
};
function remove(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0) {
		alert("请先选择一个节点");
		return;
	}
	var callbackFlag = $("#callbackTrigger").attr("checked");
	zTree.removeNode(treeNode, callbackFlag);
};
function clearChildren(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0 || !nodes[0].isParent) {
		alert("请先选择一个父节点");
		return;
	}
	zTree.removeChildNodes(treeNode);
};
function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
};
