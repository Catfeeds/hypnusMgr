package com.catt.hypnus.service.staff;

import com.catt.common.module.security.repository.entity.Role;
import com.catt.common.module.security.repository.entity.Staff;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @Author:lyz
 * @Date: 2018/3/31 10:49
 * @Desc:
 **/
@Service(value="staffBuildService")
public class StaffBuildService
{
    public Staff buildNewStaff( String phone, String pwd,String name, Role role){
        Staff staff = new Staff();
        staff.setAccount(phone);
        staff.setPhone(phone);
        staff.setMobile(phone);
        staff.setRegisterIp("127.0.0.1");
        staff.setIsDel(false);
        staff.setIsEnabled(true);
        staff.setIsLocked(false);
        staff.setLoginFailureCount(0);
        staff.setAvailBeginDate(new Date());
        staff.setAvailEndDate(new Date(2100, 1, 1));
        staff.setPassword(pwd);
        staff.setName(name);
        staff.getRoles().add(role);
        return staff;
    };

    public Staff buildUpdateStaff(Staff oldStaff,String pwd,String phone,String name){
        oldStaff.setPhone(phone);
        oldStaff.setMobile(phone);
        oldStaff.setAccount(phone);
        oldStaff.setPassword(pwd);
        oldStaff.setName(name);
        return oldStaff;
    };
}
