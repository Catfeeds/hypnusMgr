<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>上传语音素材</title>
<link type="text/css" rel="stylesheet" href="${path}/resources/css/common.css" />
<link type="text/css" rel="stylesheet" href="${path}/resources/css/shenhe.css" />
<script type="text/javascript" src="${path}/resources/js/common_ctr.js" ></script>
    <style type="text/css">
        .jiesuan2 {
            background: #fff none repeat scroll 0 0;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            color: #999;
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            margin-right: 4px;
            padding: 0 10px;
        }

    </style>
    <script src="${path}/resources/admin/js/customerMgr/cusCertification/audit.js"></script>
</head>

<body>
	<div class="wrapper" style="min-height: 250px;">
    	<table class="massageTable" cellspacing="0">
            <tr>
                <td width="100">审核结果：</td>
                <td>
                    <div class="moreDrop xw_moreDrop">
                        <input type="hidden" name="id" id="id" value="${id}"/>
                        <select  id="auditResult" name="auditResult" class="jiesuan2" style="width: 155px;">
                            <option value="1">通过</option>
                            <option value="2">不通过</option>
                        </select>
                    </div>
                </td>
            </tr>
            <tr>
                <td width="100">审核意见：</td>
                <td><textarea class="textArea" width="100" id="auditDesc"></textarea></td>
            </tr>
        </table>
        <div class="popBtDiv">
            <ul>
                <li><a class="btnGrey" style=" margin-left:10px;" id="close">取&nbsp;&nbsp;消</a></li>
                <li><a class="btnRed" id="submit">提&nbsp;&nbsp;交</a></li>
            </ul>
        </div>
	</div> 
</body>
</html>
