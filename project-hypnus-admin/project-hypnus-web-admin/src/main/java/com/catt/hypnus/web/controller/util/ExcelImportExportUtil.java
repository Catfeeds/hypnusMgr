package com.catt.hypnus.web.controller.util;

import com.catt.common.util.template.TemplateUtil;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * excel导入导出工具类
 * Created by 袁幸成 on 2017/6/7 0007.
 */
public class ExcelImportExportUtil {

    /**
     * 模板导出
     * @param fileName 导出的文件名
     * @param templatePath 模板路径
     * @param params 模板参数
     * @param response response
     */
    public static void export(String fileName, String templatePath, Map<String, Object> params,
                              HttpServletResponse response) throws IOException {
        response.setHeader("Expires", "0");
        response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
        response.setHeader("Pragma", "public");
        response.setContentType("application/force-download;charset=GBK");
        fileName = new String(fileName.getBytes("GBK"), "ISO8859-1");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setStatus(response.SC_OK);
        TemplateUtil.toIO(templatePath, response.getOutputStream(), params);
    }
}
