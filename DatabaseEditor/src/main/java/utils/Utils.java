package utils;

import utils.object.InsertObj;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class Utils {

    public static String[] cutter(String[] str){
        String[] res;
        int size = str.length;
        for (String s:str) {
            if(s == null || s.equals("")) size--;
        }
        res = new String[size];
        if (res.length >= 0) System.arraycopy(str, 0, res, 0, res.length);
        return res;
    }

    public static String headersToString(ArrayList<InsertObj> insertObj){
        String[] headers = new String[insertObj.size()];
        String res = "(";
        for(int i = 0; i < insertObj.size(); i++){
            headers[i] = insertObj.get(i).getMem()[0];
        }
        for(int i = 0; i < headers.length; i++){
            if(i != headers.length - 1){
                res += headers[i] + ", ";
            }else res += headers[i] + ")";
        }
        return res;
    }

    public static Date dateFormatter(java.util.Date date) throws ParseException {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date myDate = format.parse(String.valueOf(date));
        Date sqlDate = new Date(myDate.getTime());
        return sqlDate;
    }
}
