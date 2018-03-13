package com.catt.hypnus;

import com.catt.AbstractMain;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * Created by runtime on 2015/7/1.
 */
@Configuration
@ImportResource(value = {"classpath*:applicationContext.xml", "classpath*:applicationContext-project.xml"})
public class Server extends AbstractMain {

    public static void main(String[] args) throws Exception {
        new Server().start();

    }
}
