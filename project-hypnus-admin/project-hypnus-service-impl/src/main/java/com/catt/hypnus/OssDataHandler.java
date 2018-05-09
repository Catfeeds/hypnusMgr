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
 * @author: runtime
 * @version: Ver 1.0
 * @Date: 2018/3/24
 */
public class OssDataHandler {


    private static String endpoint = "oss-cn-shanghai.aliyuncs.com";

    private static String accessKeyId = "LTAI5hvCHzOiuJ3f";

    private static String accessKeySecret = "FByHanHd0WtP2NBJbUReztPhI5GWoA";

    private static String bucketName = "hypnus-device-data-bucket";

    /**
     * @param key  文件名
     * @param startoff  左偏移
     * @param endoff  右偏移
     * @return
     * @throws IOException
     */
    public static short[] getObjectDataShort(String key,int startoff,int endoff) throws IOException {
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        short[] bytes = null;
        try {
            bytes = downLoadFileShort(client, key, startoff,endoff);
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

    /**
     * @param key  文件名
     * @param startoff  左偏移
     * @param endoff  右偏移
     * @return
     * @throws IOException
     */
    public static byte[] getObjectDataByte(String key,int startoff,int endoff) throws IOException {
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        byte[] bytes = null;
        try {
            bytes = downLoadFileByte(client, key, startoff,endoff);
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

    /**
     * 文件转为short数组
     *
     * @param key
     * @return
     * @throws IOException
     */
    public static short[] getObjectData(String key) throws IOException {
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        short[] bytes = null;
        try {
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

    /**
     * 文件转为字节数组
     *
     * @param key
     * @return
     * @throws IOException
     */
    public static byte[] getObjectData2Byte(String key) throws IOException {
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        byte[] bytes = null;
        try {
            bytes = downLoadFile2Byte(client, key);
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
            ObjectListing objectListing = listOfObjectWithPrefix(client, bucketName, keyPrefix);
            if (objectListing == null) {
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
    public static short[] downLoadFile(OSSClient client, String key) throws IOException {
        System.out.println("Downloading an object");
        OSSObject object = client.getObject(new GetObjectRequest(bucketName, key));
        InputStream inputStream = object.getObjectContent();
        object.getObjectContent();
        byte[] bytes = ArrayUtil.input2byte(inputStream);
        short[] shorts = ArrayUtil.byte2short(bytes);
        if (bytes.length == 0) {
            return null;
        }
        System.out.println("Content-Type: " + object.getObjectMetadata().getContentType());
        return shorts;
    }

    public static short[] downLoadFileShort(OSSClient client, String key, int startoff, int endoff) throws IOException {
        OSSObject object = client.getObject(new GetObjectRequest(bucketName, key));
        InputStream inputStream = object.getObjectContent();
        object.getObjectContent();
       // byte[] bytes = ArrayUtil.input2byte(inputStream);
        byte[] bytes = ArrayUtil.inputToByteArray(inputStream,2*startoff,2*endoff);
        short[] shorts = ArrayUtil.byte2short(bytes);
        if (bytes.length == 0) {
            return null;
        }
        System.out.println("Content-Type: " + object.getObjectMetadata().getContentType());
        return shorts;
    }

    public static byte[] downLoadFileByte(OSSClient client, String key, int startoff, int endoff) throws IOException {
        OSSObject object = client.getObject(new GetObjectRequest(bucketName, key));
        InputStream inputStream = object.getObjectContent();
        object.getObjectContent();
        byte[] bytes = ArrayUtil.inputToByteArray(inputStream,startoff,endoff);
        if (bytes.length == 0) {
            return null;
        }
        System.out.println("Content-Type: " + object.getObjectMetadata().getContentType());
        return bytes;
    }

    /**
     * Download an object from your bucket
     *
     * @param client
     * @param key
     * @throws IOException
     */
    public static byte[] downLoadFile2Byte(OSSClient client, String key) throws IOException {
        System.out.println("Downloading an object");
        OSSObject object = client.getObject(new GetObjectRequest(bucketName, key));
        InputStream inputStream = object.getObjectContent();
        object.getObjectContent();
        byte[] bytes = ArrayUtil.input2byte(inputStream);
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
