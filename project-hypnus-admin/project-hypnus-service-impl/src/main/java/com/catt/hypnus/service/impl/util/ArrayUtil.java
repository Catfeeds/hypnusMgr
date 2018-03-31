package com.catt.hypnus.service.impl.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Scanner;

/**
 * @author: runtime
 * @version: Ver 1.0
 * @Date: 2018/3/24
 */
public class ArrayUtil {
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
        ByteBuffer.wrap(ba).order(ByteOrder.LITTLE_ENDIAN).asShortBuffer().get(sa);
        return sa;
    }

}
