package util;

import com.catt.common.util.crypto.DESUtil;

/**
 * 和普乐加解密工具类
 * 
 * @author runtime
 *
 */
public class CryptUtil {

	/**
	 * 数据库密钥
	 */
	private static final String KEY_DATABASE = "cattsoft.mroil";

	/**
	 * 数据库加密
	 * 
	 * @param src
	 *            明文
	 * @return 密文
	 */
	public static String encryptDatabase(String src) {
		if(src == null){
			return null;
		}
		return DESUtil.encrypt(KEY_DATABASE, src);
	}

	/**
	 * 数据库解密
	 * 
	 * @param src
	 *            密文
	 * @return 明文
	 */
	public static String decryptDatabase(String src) {
		if(src == null){
			return null;
		}
		return DESUtil.decrypt(KEY_DATABASE, src);
	}

}
