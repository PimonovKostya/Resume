package view.gui;

import view.listeners.Container;
import view.listeners.ChoseTableListener;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;

public class TableChooserForm {
    JFrame jFrame;


    public TableChooserForm(Container container){
        jFrame = new JFrame("Choose table");
        jFrame.setDefaultCloseOperation(WindowConstants.HIDE_ON_CLOSE);


        JComboBox tableComboBox = new JComboBox(container.getAvailableTables());
        tableComboBox.setFont(new Font("Verdana",0,12));
        tableComboBox.setAlignmentX(Component.LEFT_ALIGNMENT);
        tableComboBox.setBounds(15, 20, 150, 30);

        JButton openTableBtn = new JButton("Open");
        openTableBtn.setBounds(185, 20, 80, 30);

        ActionListener tableListener = new ChoseTableListener(tableComboBox, container, jFrame);
        openTableBtn.addActionListener(tableListener);

        jFrame.add(tableComboBox);
        jFrame.add(openTableBtn);
        jFrame.setLayout(null);
        jFrame.setResizable(false);
        jFrame.setBounds(800,600,300,100);
        jFrame.setLocationRelativeTo(null);
        jFrame.setVisible(true);

    }

    public void init(){

    }
}
