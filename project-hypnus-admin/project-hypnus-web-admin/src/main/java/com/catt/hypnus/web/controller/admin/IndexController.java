package com.catt.hypnus.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <pre>
 * Description:Admin公共Controller
 * Author: Chen zeming
 * Version:
 * Since: Ver 1.1
 * date: 2015-10-09 09:23:12
 * </pre>
 */
@RequestMapping({"/admin"})
@Controller("admin.indexController")
public class IndexController extends com.catt.common.module.security.web.controller.admin.IndexController {

}
