//This is the main class
//Its quite massive, here i store all data app need to work on,
//and main methods here too

package view.listeners;

import model.ModelLayer;
import utils.object.InsertObj;
import utils.object.Object;
import view.View;
import view.gui.Table;
import javax.swing.*;
import java.util.ArrayList;

public class Container {
    public String[] headers;                    //this is String array that contains all column names
    public ArrayList<Object> datalist;          //it's list of utils.object.Object to store read data from db
    public ArrayList<InsertObj> insertData;     //list of utils.object.InsertObj to store insert data
    public String[] availableTables;            //array with all table names
    private static Table table;                 //link to view.gui.Table
    public String[] upData;                     //here is data for update method stored
    public String curTable = "";               //current table name to work with, used in sql requests
    public String colName;                      //column name, took from Table ListSelectionModel 52 stroke
    public String row;
    InsertObj insertObj;
    public int mode;                                   //price mode

    ModelLayer modelLayer;
    View view;
    JFrame frame;

    public Container(ModelLayer modelLayer, View view){
        this.modelLayer = modelLayer;
        this.view = view;
        upData = new String[2];
        insertData = new ArrayList<>();
        table = new Table(this);
    }

    ////////////////////////////////////////MAIN METHODS
    public void insert(){
        modelLayer.createCustomer(curTable, insertData, mode);
        clearInsertData();
    }

    public void delete(){
        modelLayer.delete(curTable, colName, upData[0]);
        redraw();
    }

    public void clear(){modelLayer.clear(curTable);redraw();}

    public void update(){
        modelLayer.update(curTable, colName, headers[0], row, upData[1], upData[0]);
        redraw();
    }

    public Table redraw(){
        datalist = new ArrayList<>();
        if(curTable.equals("")){
            table.drawTable();
            return table;
        }else {
            headers = modelLayer.getColumns(curTable);
            modelLayer.getData(curTable, datalist, headers.length);
            System.out.println("redraw");
            table.redrawTable(headers, datalist);
            return table;
        }
    }

    ///////////////////////////////////////////////////////GETTERS SETTERS
    public void setUpData(String data, boolean update) {
        if(update){
            upData[1] = data;
        }else upData[0] = data;
    }


    public String getColName(int col){
        return colName = headers[col];
    }
    public String getRowNumb(int row){
        return this.row = datalist.get(row).getFirst();
    }

    public void clearInsertData() {
        insertData.clear();
    }


    public void setInsertData(String key, String value, boolean bool) {
        if(value.equals("")||value == null){
            if(bool){
                insertObj = new InsertObj(key, true);
            }else{
                insertObj = new InsertObj(key, false);
            }
            insertData.add(insertObj);
        }else {
            insertObj = new InsertObj(key, value);
            insertData.add(insertObj);
        }
    }

    public boolean blacklist (String userId){
        return modelLayer.isBlacklist(userId);
    }

    public void price(String userId){
        mode = modelLayer.isPrice(userId);
    }


    public void setFrame(JFrame frame) {
        this.frame = frame;
    }

    public JFrame getFrame() {
        return this.frame;
    }

    public void setAvailableTables(String[] availableTables){
        this.availableTables = availableTables;
    }

    public String[] getAvailableTables() {
        return availableTables;
    }

    public void setCurTable(String curTable) {
        this.curTable = curTable;
    }

}

