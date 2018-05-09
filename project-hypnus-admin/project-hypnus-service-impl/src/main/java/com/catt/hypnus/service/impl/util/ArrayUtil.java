package com.catt.hypnus.service.impl.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

/**
 * @author: runtime
 * @version: Ver 1.0
 * @Date: 2018/3/24
 */
public class ArrayUtil {

    public static final byte[] inputToByteArray(InputStream inStream,int startoff,int endoff)
            throws IOException {
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
        byte[] buff = new byte[100];
        int rc = 0;
        int count = 0;
        if( startoff <= 0){
            if(endoff <= 0) {
                while ((rc = inStream.read(buff, 0, 100)) > 0) {
                    swapStream.write(buff, 0, rc);
                }
            }
            else {
                while ((rc = inStream.read(buff, 0, 100)) > 0) {
                    count += rc;
                    if(count>= endoff){
                        swapStream.write(buff, 0, rc-(count-endoff));
                        break;
                    }
                    else
                        swapStream.write(buff, 0, rc);
                }
            }
        }
        else {
            if(endoff <= 0){
                long lenth = inStream.available();

                if(lenth > startoff ){
                    rc =  inStream.read(buff, startoff, 100);
                    if(rc > 0)
                    {
                        swapStream.write(buff, 0, rc);
                        while ((rc = inStream.read(buff, 0, 100)) > 0) {
                            swapStream.write(buff, 0, rc);
                        }
                    }

                }
            }
            else {
                if(endoff <= startoff)
                    return null;
                else
                {
                    int len = endoff - startoff;
                    byte[] temp  = new byte[len];
                    rc = inStream.read(temp, startoff, len);
                    swapStream.write(temp, 0, rc);
                }
            }
        }
        byte[] in2b = swapStream.toByteArray();
        return in2b;
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

    public static final short[] byte2short(byte[] ba) {
        short[] sa = new short[ba.length / 2];
        if(ba != null)
        {
            ByteBuffer.wrap(ba).order(ByteOrder.LITTLE_ENDIAN).asShortBuffer().get(sa);
        }
        return sa;
    }

}
