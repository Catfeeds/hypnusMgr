package util.qrCode;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.BasicStroke;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;

/**
 * Created by yxc on 2016/3/4.
 */
public class QrCodeUtil {
    /**
     * zxing生成二维码图片
     *
     * @param code   二维码内容
     * @param width  图片宽度
     * @param height 图片高度
     * @param format png/jpg等
     * @param file   输出二维码的文件
     */
    public static void writeQrCode(String code, int width, int height, String format, File file) {
        Hashtable hints = new Hashtable();
        hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        BitMatrix bitMatrix = null;
        try {
            bitMatrix = new MultiFormatWriter().encode(code, BarcodeFormat.QR_CODE, width, height, hints);
            MatrixToImageWriter.writeToFile(bitMatrix, format, file);
        } catch (WriterException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 二维码绘制logo
     *
     * @param qrCodeImg 二维码图片文件
     * @param logoImg   logo图片文件
     */
    public static BufferedImage encodeImgLogo(File qrCodeImg, File logoImg) {
        BufferedImage qrCode = null;
        try {
            if (!qrCodeImg.isFile() || !logoImg.isFile()) {
                System.out.println("输入非图片");
                return null;
            }
            //读取二维码图片  
            qrCode = ImageIO.read(qrCodeImg);
            //获取画笔  
            Graphics2D g = qrCode.createGraphics();
            //读取logo图片  
            BufferedImage logo = ImageIO.read(logoImg);
            //设置二维码大小，太大，会覆盖二维码，此处20%  
            int logoWidth = logo.getWidth(null) > qrCode.getWidth() * 2 / 10 ? (qrCode.getWidth() * 2 / 10) : logo.getWidth(null);
            int logoHeight = logo.getHeight(null) > qrCode.getHeight() * 2 / 10 ? (qrCode.getHeight() * 2 / 10) : logo.getHeight(null);
            //设置logo图片放置位置  
            //中心  
            int x = (qrCode.getWidth() - logoWidth) / 2;
            int y = (qrCode.getHeight() - logoHeight) / 2;
            //右下角，15为调整值  
//          int x = qrCode.getWidth()  - logoWidth-15;  
//          int y = qrCode.getHeight() - logoHeight-15;  
            //开始合并绘制图片  
            g.drawImage(logo, x, y, logoWidth, logoHeight, null);
            g.drawRoundRect(x, y, logoWidth, logoHeight, 15, 15);
            //logo边框大小  
            g.setStroke(new BasicStroke(2));
            //logo边框颜色  
            g.setColor(Color.WHITE);
            g.drawRect(x, y, logoWidth, logoHeight);
            g.dispose();
            logo.flush();
            qrCode.flush();
        } catch (Exception e) {
            System.out.println("二维码绘制logo失败");
        }
        return qrCode;
    }
}
