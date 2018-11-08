import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NeteaseCloud implements Runnable  {
    public static CloseableHttpClient closeableHttpClient = HttpClients.createDefault();
    public static long a = 1000000 ;
    public  void run() {
        for(int mx;a<100000000;a++) {
            try {
                String u = "http://music.163.com/weapi/v1/resource/comments/R_SO_4_" + a + "?csrf_token=";
                printHot(u);
                // }
            }catch (Exception e){

            }
        }
    }
    public static void getById(String id){
        String u = "http://music.163.com/weapi/v1/resource/comments/R_SO_4_" + id + "?csrf_token=";
        try {
            printHot(u);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void getRandClower() throws Exception {
        NeteaseCloud my = new NeteaseCloud() ;
        new Thread(my,"1").start();
        new Thread(my,"2").start();
        new Thread(my,"3").start();
        new Thread(my,"4").start();
        new Thread(my,"5").start();
        new Thread(my,"6").start();
        new Thread(my,"7").start();
    }
    //
    public static synchronized void printHot(String u) throws Exception {
        HttpPost httpPost = new HttpPost(u);
        httpPost.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36");
        List<NameValuePair> list = new ArrayList<NameValuePair>();
        list.add(new BasicNameValuePair("params", "RlBC7U1bfy/boPwg9ag7/a7AjkQOgsIfd+vsUjoMY2tyQCPFgnNoxHeCY+ZuHYqtM1zF8DWIBwJWbsCOQ6ZYxBiPE3bk+CI1U6Htoc4P9REBePlaiuzU4M3rDAxtMfNN3y0eimeq3LVo28UoarXs2VMWkCqoTXSi5zgKEKbxB7CmlBJAP9pn1aC+e3+VOTr0"));
        list.add(new BasicNameValuePair("encSecKey", "76a0d8ff9f6914d4f59be6b3e1f5d1fc3998317195464f00ee704149bc6672c587cd4a37471e3a777cb283a971d6b9205ce4a7187e682bdaefc0f225fb9ed1319f612243096823ddec88b6d6ea18f3fec883d2489d5a1d81cb5dbd0602981e7b49db5543b3d9edb48950e113f3627db3ac61cbc71d811889d68ff95d0eba04e9"));
        httpPost.setEntity(new UrlEncodedFormEntity(list));
        CloseableHttpResponse response = closeableHttpClient.execute(httpPost);
        HttpEntity entity = response.getEntity();
        String ux = EntityUtils.toString(entity, "utf-8");
        //System.out.println(ux);
        ArrayList<String> s = getBook(ux);
        if(s.size()!=0) {
            System.out.println(Thread.currentThread().getName() + " :::   " + "目标：" + u);
        }
        for (int i = 0; i < s.size(); i++) {
            String[] arr = s.get(i).split("\"");
            System.out.println("              "+arr[2]);
        }
    }


    public static ArrayList getBook(String read){
        ArrayList<String> arrayList = new ArrayList<String>() ;

        String con = "content(.*?)\"}" ;
        Pattern ah = Pattern.compile(con);
        Matcher mr = ah.matcher(read);
        while(mr.find()) {
            if (!arrayList.contains(mr.group())) {
                arrayList.add(mr.group());
            }
        }
        return  arrayList ;
    }
}