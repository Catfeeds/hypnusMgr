package com.catt.hypnus.service.impl;

import java.text.ParseException;
import java.util.Arrays;

/**
 * @author: lzb
 * @version: Ver 1.0
 * @Date: 2018/3/24
 */
public class TimeDemo {
    public static void main(String[] args) throws ParseException {
        byte[] bytes = new byte[1];
        bytes[0] = (byte) 800;
        System.out.println(Arrays.toString(bytes));
    }

}

