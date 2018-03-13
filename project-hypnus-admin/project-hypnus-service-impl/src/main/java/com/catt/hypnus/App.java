package com.catt.hypnus.demo;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;


/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        System.out.println("Hello World!");

        String accessKey = "LTAI5hvCHzOiuJ3f";
        String accessSecret = "FByHanHd0WtP2NBJbUReztPhI5GWoA";
        try {
            DefaultProfile.addEndpoint("cn-shanghai", "cn-shanghai", "Iot", "iot.cn-shanghai.aliyuncs.com");


            //String endpoint = "oss-cn-hangzhou.aliyuncs.com";
            //  OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);

            //华东2
            //region:oss-cn-shanghai
            //外网endpoint:oss-cn-shanghai.aliyuncs.com

            IClientProfile profile = DefaultProfile.getProfile("cn-shanghai", accessKey, accessSecret);
            DefaultAcsClient client = new DefaultAcsClient(profile);


            System.out.println(profile);
            System.out.println(client);


//	        PubRequest request = new PubRequest();
//	        request.setProductKey("productKey");
//	        request.setMessageContent(Base64.encodeBase64String("hello world".getBytes()));
//	        request.setTopicFullName("/productKey/deviceName/get");
//	        request.setQos(0); //目前支持QoS0和QoS1
//	        PubResponse response = client.getAcsResponse(request);
//	        System.out.println(response.getSuccess());
//	        System.out.println(response.getErrorMessage());
        } catch (ClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


        //rm-uf61m889rnvnz74445o.mysql.rds.aliyuncs.com
        //SELECT * FROM `ihypnus_iot`.`device` ORDER BY `device_id` DESC  LIMIT 0,50;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://rm-uf61m889rnvnz74445o.mysql.rds.aliyuncs.com", "ihypnus_dba", "Nse889900");
            //here sonoo is database name, root is username and password
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from ihypnus_iot.device");
            while (rs.next())
                System.out.println(rs.getString(1));
            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }


}
