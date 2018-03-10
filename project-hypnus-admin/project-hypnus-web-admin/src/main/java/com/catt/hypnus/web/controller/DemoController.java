package com.catt.hypnus.web.controller;

import com.catt.common.util.json.JsonUtils;
import com.catt.common.web.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Demo
 * Created by Sebarswee on 2016/7/19.
 */
@Controller
@RequestMapping(value = "/demo")
public class DemoController extends BaseController {

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String home() {
        Logger logger = LoggerFactory.getLogger("web-access");
        System.out.println("logger = " + logger);
        return "/demo/list";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add() {
        return "/demo/add";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view() {
        return "/demo/view";
    }

    @RequestMapping(value = "/type/get")
    @ResponseBody
    public List<Map> getType(String name) {
        String json = "[ {\"id\":\"1\", \"text\":\"苹果\"}, {\"id\":\"2\", \"text\":\"三星\"} ]";

        return JsonUtils.toList(json, Map.class);
    }
}
