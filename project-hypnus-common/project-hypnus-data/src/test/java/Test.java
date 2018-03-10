/**
 * Created by houhuateng on 2016/8/15.
 */
public class Test {
    public static void main(String args[]){
        Integer a = 1;
        Double b = 2.0;
        if(b > a){
            System.out.println("正确");
        }else {
            System.out.println("错误");
        }

        String s = "s";
        System.out.println(Double.parseDouble(s));
    }
}
