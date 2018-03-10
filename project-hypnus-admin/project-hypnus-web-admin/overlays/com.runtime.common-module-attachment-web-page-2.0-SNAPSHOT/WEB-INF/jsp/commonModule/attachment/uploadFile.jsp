<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
    <%@include file="/common/headModule.jsp"%>
    <title>上传文件</title>
    <link rel="stylesheet" type="text/css" href="${path}/resources/commonModule/attachment/css/uploadFile.css"/>
    <script>
        var param = {};
        param.limitType = "${param.limitType}" || "";
        var scene = "${param.scene}";
    </script>
    <script type="text/javascript" src="${path}/resources/commonModule/attachment/js/uploadFile.js"></script>
</head>
<body>
<div style="width:300px; height:150px; padding:20px;">
    <form id="uploadform" action="${path}/attachment/fileUpload" method="post" enctype="multipart/form-data" target="singleUpload">
        <div class="notFile">
            <input type="hidden" name="scene" value="${param.scene}" />
            <input type="hidden" name="isDB" value="${param.isDB}" />
            <input type="hidden" name="token" value="" />
            <input type="hidden" name="callBackName" value="UploadCallBack" />
            <%--<input type="file" name="files" id="uploadfile" multiple="multiple" />--%>
            <input type="file" name="files" id="uploadfile"/>
        </div>
        <div class="hasFile" style="width: 100%; height: 80px; display: none;">
            <div style="float: left; width: 35%; height: 100%; text-align:right;">
                <img style="height: 100%; width: auto;" src="${path}/resources/commonModule/attachment/images/file.png" />
            </div>
            <div style="float: right; width: 60%; height: 100%;">
                <p class="filename" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-overflow:ellipsis;line-height: 78px; font-size: 14px;"></p>
            </div>
            <div style="clear: both;"></div>
        </div>
        <div class="comfirBar">
            <ul class="ctrolToolbarUl">
                <li><button id="btnupload" class="queding">上传</button></li>
                <li><button id="btncancel" class="quxiao">取消</button></li>
            </ul>
        </div>
    </form>
</div>
<iframe name="singleUpload" style="display: none;"></iframe>
</body>
</html>