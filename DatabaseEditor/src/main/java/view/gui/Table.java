package view.gui;

import utils.object.Object;
import view.listeners.Container;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.table.DefaultTableModel;
import java.util.ArrayList;
import java.util.Arrays;

public class Table {
    Container container;
    JTable table;
    DefaultTableModel tableModel;
    JFrame frame;
    JScrollPane jScrollPane;

    public Table(Container container){
        this.container = container;
    }

    public JTable drawTable(){
        this.frame = container.getFrame();
        tableModel = new DefaultTableModel(new Object[][]{}, new java.lang.Object[]{"Choose", "table", "from", "file", "menu"});
        table = new JTable(tableModel);
        jScrollPane = new JScrollPane(table, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        jScrollPane.setBounds(0,0,800,600);
        frame.add(jScrollPane);
        return table;
    }
//
    public JTable redrawTable(String[] headers, ArrayList<Object> datalist){
        this.frame = container.getFrame();
        if(headers.length == 0){
            tableModel = new DefaultTableModel(new Object[][]{}, new java.lang.Object[]{"Choose", "table", "from", "file", "menu"});
        }else {
            frame.remove(jScrollPane);
            tableModel = new DefaultTableModel(new java.lang.Object[][]{}, headers);
            System.out.println(Arrays.toString(headers));

            for (int i = 0; i < datalist.size(); i++) {
                System.out.println(Arrays.toString(datalist.get(i).getMem()));
                tableModel.addRow(datalist.get(i).getMem());
            }
        }
        table = new JTable(tableModel);

        ListSelectionModel select= table.getSelectionModel();
        select.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        select.addListSelectionListener(new ListSelectionListener() {
            public void valueChanged(ListSelectionEvent e) {
                String Data = null;
                int[] row = table.getSelectedRows();
                int[] columns = table.getSelectedColumns();
                for (int i = 0; i < row.length; i++) {
                    for (int j = 0; j < columns.length; j++) {
                        Data = (String) table.getValueAt(row[i], columns[j]);
                        container.setUpData(Data, false);
                        container.getColName(columns[j]);
                        container.getRowNumb(row[i]);
                    } }
                System.out.println("Table element selected is: " + Data);
                System.out.println("row = " + Arrays.toString(row) + "\ncolumn = " + Arrays.toString(columns));
            }
        });
        frame.setTitle(container.curTable);
        jScrollPane = new JScrollPane(table, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        jScrollPane.setBounds(0,0,800,600);
        frame.add(jScrollPane);
        return table;
    }
}
