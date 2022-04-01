package model;

import utils.Utils;
import utils.object.InsertObj;
import utils.object.Object;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;

import static utils.Const.*;

public class DBLayer implements ModelLayer {
    MySqlConnection mysql = new MySqlConnection();
    Connection conn;
    PreparedStatement preparedStatement;
    Statement statement;
    ResultSet resultSet;

    //This method is getting all table names in database,
    // if you want to work in another database,
    // find URL in Const.java, and change parameter
    @Override
    public String[] getTables() {
        conn = mysql.getConnection();
        String[] tables = new String[20];
        int j = 0;
        try {
            statement = conn.createStatement(
                    ResultSet.TYPE_FORWARD_ONLY,
                    ResultSet.CONCUR_UPDATABLE);
            resultSet = statement.executeQuery(GET_TABLES);

            while (resultSet.next()){
                tables[j++] = resultSet.getString(1);
            }
        }catch (Exception e){
            System.out.println(e);
        }finally {
            //close connection ,stmt and resultset here
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
        tables = Utils.cutter(tables);
        return tables;
    }


    //This method is getting column names, with one problem, all column names
    //in resultSet is sorted by name, this is sql request issue,
    //so i've named column with "a_[column name]", b_[column name], ... etc.
    @Override
    public String[] getColumns(String curTable) {
        String sql;
        sql = String.format(GET_COLUMN_NAMES, curTable);
        conn = mysql.getConnection();
        String[] headers = new String[10];
        int i = 0;
        try {
            statement = conn.createStatement(
                    ResultSet.TYPE_FORWARD_ONLY,
                    ResultSet.CONCUR_UPDATABLE);
            resultSet = statement.executeQuery(sql);
            while (resultSet.next()){
                System.out.println(resultSet.getString(1));
                headers[i] = resultSet.getString(1);
                i++;
            }
        }catch (Exception e){
            System.out.println(e);
        }finally {
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
        headers = Utils.cutter(headers);
        return headers;
    }

    //read method
    @Override
    public void getData(String curTable, ArrayList datalist, int rowNumb) {
        conn = mysql.getConnection();
        Object object;

        try {
            statement = conn.createStatement(
                    ResultSet.TYPE_FORWARD_ONLY,
                    ResultSet.CONCUR_UPDATABLE);

            resultSet = statement.executeQuery(GET_DATA + curTable);
            while (resultSet.next()) {
                object = new Object(rowNumb);

                for(int i = 1; i < rowNumb + 1; i++) {
                    object.add(resultSet.getString(i));
                    System.out.println("SEPARATOR=========");
                }
                datalist.add(object);
                System.out.println(Arrays.toString(datalist.toArray()));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
    }

    @Override
    public boolean isBlacklist(String userId) {
        conn = mysql.getConnection();
        String sql = String.format(B_LIST, userId);
        try {
            statement = conn.createStatement(
                    ResultSet.TYPE_FORWARD_ONLY,
                    ResultSet.CONCUR_UPDATABLE);

            resultSet = statement.executeQuery(sql);
            while (resultSet.next()){
                return resultSet.getBoolean("b_blacklist");
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
        return false;
    }

    public int isPrice(String userId){
        conn = mysql.getConnection();
        String sql = String.format(P_LIST, userId);
        int i = 0;
        try {
            statement = conn.createStatement(ResultSet.TYPE_FORWARD_ONLY,
                    ResultSet.CONCUR_UPDATABLE);

            resultSet = statement.executeQuery(sql);
            while (resultSet.next()){
                i++;
                if(i >= 5){
                    return 1;
                }else if(i >= 10){
                    return 2;
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
        return 0;
    }


    //insert method
    @Override
    public void createCustomer(String curTable, ArrayList<InsertObj> insertData, int mode) {
        conn = mysql.getConnection();
        int rows = insertData.size();
        String sql = String.format(INSERT_DATA[rows-1], curTable, Utils.headersToString(insertData));
        String[] getMem;

        try {
            preparedStatement = conn.prepareStatement(sql);
            for(int i = 1; i <= rows; i++){
                getMem = insertData.get(i - 1).getMem();

                if(getType(getMem[0], curTable).equals("int")){
                    preparedStatement.setInt(i, Integer.parseInt(getMem[1]));
                }else if(getType(getMem[0], curTable).equals("tinyint")){
                    preparedStatement.setBoolean(i, Boolean.parseBoolean(getMem[1]));
                } else {
                    preparedStatement.setString(i, getMem[1]);
                }
            }
            int executeUpdate = preparedStatement.executeUpdate();

            System.out.printf("%d rows added", executeUpdate);

            conn.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {

            try { conn.close(); } catch(SQLException se) { System.out.println(se); }
            try { preparedStatement.close(); } catch(SQLException se) { System.out.println(se);}
        }

    }

    //method to update
    @Override
    public void update(String curTable, String columnName, String rowName, String row, String update, String data) {
        conn = mysql.getConnection();

        String sql = String.format(UPDATE, curTable, columnName, rowName, row, columnName, data);

        try {
            preparedStatement = conn.prepareStatement(sql);
            if(getType(data, curTable).equals("int")){
                preparedStatement.setInt(1,Integer.parseInt(update));
            }else if(getType(data, curTable).equals("tinyint")) {
                preparedStatement.setBoolean(1, Boolean.parseBoolean(update));
            }else {
                preparedStatement.setString(1, update);
            }
            int executeUpdate = preparedStatement.executeUpdate();

            System.out.printf("%d rows updated", executeUpdate);
        }catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            try { conn.close(); } catch(SQLException se) { System.out.println(se); }
            try { statement.close(); } catch(SQLException se) {System.out.println(se);}
            try { resultSet.close(); } catch(SQLException se) {System.out.println(se);}
        }
    }

    //method to delete current row in table
    @Override
    public void delete(String curTable, String column, String data) {
        conn = mysql.getConnection();
        String sql = String.format(DELETE, curTable, column, data);
        try {
            statement = conn.prepareStatement(sql);
            statement.executeUpdate(sql);
        }catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
    }

///method to clear all table
    @Override
    public void clear(String curTable) {
        conn = mysql.getConnection();
        String sql = String.format(CLEAR, curTable);
        try {
            statement = conn.prepareStatement(sql);
            statement.executeUpdate(sql);
        }catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
    }


    ///this is private method to define type of data
    private String getType(String key, String curTable){
        conn = mysql.getConnection();
        String sql = String.format(GET_DATA_TYPE, curTable, key);
        String res = "";

        try{
            statement = conn.createStatement();
            resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                res = resultSet.getString(1);
            }
        }catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            //close connection ,stmt and resultset here
            try { conn.close(); } catch(SQLException se) { /*can't do anything */ }
            try { statement.close(); } catch(SQLException se) { /*can't do anything */ }
            try { resultSet.close(); } catch(SQLException se) { /*can't do anything */ }
        }
        return res;
    }
}
