package com.catt.hypnus.security.shiro.filter;

import com.catt.common.base.pojo.search.Filter;
import com.catt.common.module.security.repository.entity.LogLogin;
import com.catt.common.module.security.service.LogLoginService;
import com.catt.common.util.lang.DateUtil;
import com.catt.common.util.lang.StringUtil;
import com.catt.common.web.WebUtil;
import com.catt.common.web.security.shiro.filter.FilterConstants;
import org.apache.shiro.web.filter.authc.LogoutFilter;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * <pre>
 * 针对ajax退出操作时进行输出提示
 * @author : Zhang zhongtao
 * @version : Ver 1.0
 * </pre>
 */
public class ExtLogoutFilter extends LogoutFilter {
    @Resource(name = "logLoginServiceImpl")
    private LogLoginService logLoginService;

    public ExtLogoutFilter() {
        super();
    }

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        this.editLogLogin();
        return super.preHandle(request, response);
    }


    /**
     * 记录退出时间和时长
     * */
    private void editLogLogin(){

        String sessionId = WebUtil.getSession().getId();
        ArrayList<Filter> filters = new ArrayList<Filter>();
        if (StringUtil.checkObj(sessionId)) {
            filters.add(Filter.eq("sessionId", sessionId));
            List<LogLogin> list = logLoginService.findList(1, filters, null);
            if(list != null && list.size() > 0){
                LogLogin logLogin = list.get(0);
                Date outTime = new Date();
                if(StringUtil.checkObj(logLogin.getLoginTime())){
                    //登录时长(s)
                    logLogin.setLoginLength(DateUtil.getSecondBetween(outTime, logLogin.getLoginTime()));
                }
                logLogin.setOutTime(new Date());
                logLoginService.update(logLogin);
            }
        }
    }

    @Override
    protected void issueRedirect(ServletRequest request, ServletResponse response, String redirectUrl) throws Exception {

        if (WebUtil.isAjaxRequest()) {
            FilterConstants.responseSuccessMessage();
            return;
        }

        super.issueRedirect(request, response, redirectUrl);


    }

}
