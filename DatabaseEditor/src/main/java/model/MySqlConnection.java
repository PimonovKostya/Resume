package model;

import java.sql.Connection;
import java.sql.DriverManager;

import static utils.Const.*;

public class MySqlConnection {
    public Connection getConnection(){
        Connection conn = null;
        try{
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            Class.forName(DRIVER);

            System.out.println("Conn sccses");
        }catch (Exception e){
            System.out.println(e);
        }
        return conn;
    }
}
