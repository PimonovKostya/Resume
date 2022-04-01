// form for update menu



package view.gui;

import view.listeners.Container;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import static utils.Const.DATE;

public class UpdateForm {
    Container container;
    ButtonGroup buttonGroup;
    JPanel panel;

    public UpdateForm(Container container) {
        this.container = container;
        JFrame frame = new JFrame("UpdateMenu");
        buttonGroup = new ButtonGroup();



        JLabel info = new JLabel();
        info.setText("Write down data you want to update");
        info.setFont(new Font("Verdana", 1, 12));
        info.setBounds(40, 5, 400, 50);

        JLabel boolLabel = new JLabel();
        boolLabel.setText("true");
        boolLabel.setFont(new Font("Verdana", 1, 12));
        boolLabel.setBounds(250, 35, 150,50);


        JLabel boolLabel_false = new JLabel();
        boolLabel_false.setText("false");
        boolLabel_false.setFont(new Font("Verdana", 1, 12));
        boolLabel_false.setBounds(250, 60, 150,50);


        JRadioButton bool = new JRadioButton();
        bool.setSelected(false);
        bool.setBounds(220, 50, 18,18);

        JRadioButton bool_false = new JRadioButton();
        bool.setSelected(false);
        bool.setBounds(220, 50, 18,18);

        JTextField inputField = new JTextField();
        inputField.setBounds(10,50, 200, 30);

        JButton updateBtn = new JButton("Update");
        updateBtn.setBounds(10, 90, 90, 30);
        updateBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if(bool.isSelected()){
                    container.setUpData("1", true);
                    container.update();
                    frame.dispose();
                }else if(bool_false.isSelected()){
                    container.setUpData("0", true);
                    container.update();
                    frame.dispose();
                }else if(inputField.getText().trim().equals("") || inputField.getText().trim() == null){
                    info.setText("You entered wrong data, please insert new data");
                } else {
                    container.setUpData(inputField.getText(), true);
                    container.update();
                    frame.dispose();
                }
            }
        });
        buttonGroup.add(bool);
        buttonGroup.add(bool_false);
        panel = new JPanel(new GridLayout(0, 1));
        panel.setBounds(220, 50, 20,50);
        panel.add(bool);
        panel.add(bool_false);

        frame.add(boolLabel_false);
        frame.add(boolLabel);
        frame.add(info);
        frame.add(boolLabel);
        frame.add(inputField);
        frame.add(panel);


        frame.add(updateBtn);

        frame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        frame.setResizable(false);
        frame.setLayout(null);
        frame.setLocationRelativeTo(null);
        frame.setBounds(600,400, 400,180);
        frame.setVisible(true);
    }
}
