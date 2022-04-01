package model;

import utils.object.InsertObj;

import java.util.ArrayList;

public interface ModelLayer {
    String[] getTables();

    String[] getColumns(String curTable);

    void getData(String curTable, ArrayList dataList, int rowNumb);

    void createCustomer(String curTable, ArrayList<InsertObj> insertData, int mode);

    void update(String curTable, String column, String rowName, String row, String update, String data);

    void delete(String curTable, String column, String data);

    void clear(String curTable);

    boolean isBlacklist(String userId);

    int isPrice(String userId);
}
