package com.catt.hypnus;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.GetObjectRequest;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.PutObjectRequest;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;

/**
 * This sample demonstrates how to upload/download an object to/from
 * Aliyun OSS using the OSS SDK for Java.
 */
public class SimpleGetObjectSample {

//    private static String endpoint = "*** Provide OSS endpoint ***";
//    private static String accessKeyId = "*** Provide your AccessKeyId ***";
//    private static String accessKeySecret = "*** Provide your AccessKeySecret ***";
//    
//    private static String bucketName = "*** Provide bucket name ***";

    private static String endpoint = "oss-cn-shanghai.aliyuncs.com";
    private static String accessKeyId = "LTAI5hvCHzOiuJ3f";
    private static String accessKeySecret = "FByHanHd0WtP2NBJbUReztPhI5GWoA";
    private static String bucketName = "hypnus-device-data-bucket";

    private static String key = "athenaTestkey";

    public static void main(String[] args) throws IOException {
        /*
         * Constructs a client instance with your account for accessing OSS
         */
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);

        try {

            /**
             * Note that there are two ways of uploading an object to your bucket, the one 
             * by specifying an input stream as content source, the other by specifying a file.
             */
//            String key = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/flow.edf";
            String key = "0a0a0a0a0b0b0b0b0c0c0c0c/2016-02-09 16:26:00/pressure.edf";
//            String key = "0a0a0a0a0b0b0b0b0c0c0c0c/2016-02-09 16:26:00/t_log_login.sql";
            downLoadFile(client, key);

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
            /*
             * Do not forget to shut down the client finally to release all allocated resources.
             */
            client.shutdown();
        }
    }

    /**
     * Download an object from your bucket
     *  下载
     * @param client
     * @param key
     * @throws IOException
     */
    public static void downLoadFile(OSSClient client, String key) throws IOException {
        System.out.println("Downloading an object");
        OSSObject object = client.getObject(new GetObjectRequest(bucketName, key));
        InputStream inputStream = object.getObjectContent();
        byte[] bytes = input2byte(inputStream);
        for (byte b : bytes) {
            System.out.println(b);
        }
        System.out.println("Content-Type: " + object.getObjectMetadata().getContentType());
//        displayTextInputStream(object.getObjectContent());
    }

    /**
     * Upload an object to your bucket from an input stream
     *  上传
     * @param client
     * @param key
     * @throws IOException
     */
    public static void uploadFileOfStream(OSSClient client, String key) throws IOException {
        System.out.println("Uploading a new object to OSS from an input stream\n");
        String content = "Thank you for using Aliyun Object Storage Service";
        client.putObject(bucketName, key, new ByteArrayInputStream(content.getBytes()));
    }

    /**
     * Upload an object to your bucket from a file
     *
     * @param client
     * @param key
     * @throws IOException
     */
    public static void uploadFile(OSSClient client, String key) throws IOException {
        System.out.println("Uploading a new object to OSS from a file\n");
        client.putObject(new PutObjectRequest(bucketName, key, createSampleFile()));
    }

    private static File createSampleFile() throws IOException {
        File file = File.createTempFile("oss-java-sdk-", ".txt");
        file.deleteOnExit();

        Writer writer = new OutputStreamWriter(new FileOutputStream(file));
        writer.write("abcdefghijklmnopqrstuvwxyz\n");
        writer.write("0123456789011234567890\n");
        writer.close();

        return file;
    }

    private static void displayTextInputStream(InputStream input) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        while (true) {
            String line = reader.readLine();
            if (line == null) break;

            System.out.println("\t" + line);
        }
        System.out.println();

        reader.close();
    }

    public static final byte[] input2byte(InputStream inStream)
            throws IOException {
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
        byte[] buff = new byte[100];
        int rc = 0;
        while ((rc = inStream.read(buff, 0, 100)) > 0) {
            swapStream.write(buff, 0, rc);
        }
        byte[] in2b = swapStream.toByteArray();
        return in2b;
    }

}
