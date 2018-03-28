package com.catt.hypnus;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.GetObjectRequest;
import com.aliyun.oss.model.ListObjectsRequest;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.OSSObjectSummary;
import com.aliyun.oss.model.ObjectListing;
import com.catt.hypnus.service.impl.util.ArrayUtil;
import org.apache.commons.collections.CollectionUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * oss数据存取类
 *
 * @author: lzb
 * @version: Ver 1.0
 * @Date: 2018/3/24
 */
public class OssDataHandler {


    private static String endpoint = "oss-cn-shanghai.aliyuncs.com";

    private static String accessKeyId = "LTAI5hvCHzOiuJ3f";

    private static String accessKeySecret = "FByHanHd0WtP2NBJbUReztPhI5GWoA";

    private static String bucketName = "hypnus-device-data-bucket";

    public static byte[] getObjectData(String key) throws IOException {
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        byte[] bytes = null;
        try {
//            String key = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/flow.edf";
//            key = "0a0a0a0a0b0b0b0b0c0c0c0c/2016-02-09 16:26:00/pressure.edf";
//            String key = "0a0a0a0a0b0b0b0b0c0c0c0c/2016-02-09 16:26:00/t_log_login.sql";
            bytes = downLoadFile(client, key);
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message: " + oe.getErrorCode());
            System.out.println("Error Code:       " + oe.getErrorCode());
            System.out.println("Request ID:      " + oe.getRequestId());
            System.out.println("Host ID:           " + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message: " + ce.getMessage());
        } finally {
            client.shutdown();
        }
        return bytes;
    }

    public static List<String> listOfObject(String keyPrefix) throws IOException {
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        List<String> stringList = new ArrayList<>();
        try {
//            String key = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/flow.edf";
//            keyPrefix = "0a0a0a0a0b0b0b0b0c0c0c0c/2016-02-09 16:26:00/pressure.edf";
//            String key = "0a0a0a0a0b0b0b0b0c0c0c0c/2016-02-09 16:26:00/t_log_login.sql";
            ObjectListing objectListing = listOfObjectWithPrefix(client, bucketName, keyPrefix);
            if(objectListing==null){
                return null;
            }
            List<OSSObjectSummary> sums = objectListing.getObjectSummaries();
            if (CollectionUtils.isEmpty(sums)) {
                return null;
            }
            for (OSSObjectSummary s : sums) {
                stringList.add(s.getKey());
            }

        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message: " + oe.getErrorCode());
            System.out.println("Error Code:       " + oe.getErrorCode());
            System.out.println("Request ID:      " + oe.getRequestId());
            System.out.println("Host ID:           " + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message: " + ce.getMessage());
        } finally {
            client.shutdown();
        }
        return stringList;
    }


    /**
     * Download an object from your bucket
     *
     * @param client
     * @param key
     * @throws IOException
     */
    public static byte[] downLoadFile(OSSClient client, String key) throws IOException {
        System.out.println("Downloading an object");
        OSSObject object = client.getObject(new GetObjectRequest(bucketName, key));
        InputStream inputStream = object.getObjectContent();
        object.getObjectContent();
        byte[] bytes = ArrayUtil.input2byte(inputStream);
        if (bytes.length == 0) {
            return null;
        }
        List<String> strings = null;
        for (byte b : bytes) {
            System.out.println(b);
        }
        System.out.println("Content-Type: " + object.getObjectMetadata().getContentType());
        return bytes;

    }

    /**
     * 返回指定前缀的Object，默认最多返回100条
     */
    public static ObjectListing listOfObjectWithPrefix(OSSClient client, String bucketName, String keyPrefix) {
        ObjectListing objectListing = null;
        List<OSSObjectSummary> sums = null;
        System.out.println("With prefix:");
        objectListing = client.listObjects(new ListObjectsRequest(bucketName).withPrefix(keyPrefix));

        sums = objectListing.getObjectSummaries();
        if (CollectionUtils.isEmpty(sums)) {
            return null;
        }
        for (OSSObjectSummary s : sums) {
            System.out.println("\t" + s.getKey());
            System.out.println("\t" + s.getETag());
        }
        return objectListing;
    }


}
