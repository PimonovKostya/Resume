//create menu form


package view.gui;

import view.listeners.Container;
import view.listeners.CreateListener;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import static utils.Const.*;

public class CreateForm {
    Container container;
    JFrame frame;

    CreateForm(Container container){
        this.container = container;
    }

    public void init(){
        frame = new JFrame("InsertMenu");
        ButtonGroup buttonGroup = new ButtonGroup();

        JLabel infoLabel = new JLabel();
        infoLabel.setText("Choose column you need and insert data.");
        infoLabel.setFont(new Font("Verdana", 1, 12));
        infoLabel.setBounds(10, 0, 400, 50);

        JLabel infoLabel2 = new JLabel();
        infoLabel2.setText("Every column have to be filled!");
        infoLabel2.setFont(new Font("Verdana", 1, 12));
        infoLabel2.setBounds(10, 20, 400, 50);

        JLabel boolLabel = new JLabel();
        boolLabel.setText("true");
        boolLabel.setFont(new Font("Verdana", 1, 12));
        boolLabel.setBounds(250, 35, 150,50);


        JLabel boolLabel_false = new JLabel();
        boolLabel_false.setText("false");
        boolLabel_false.setFont(new Font("Verdana", 1, 12));
        boolLabel_false.setBounds(250, 60, 150,50);

        JTextField inputField = new JTextField();
        inputField.setBounds(10,70, 200, 30);

        JRadioButton bool = new JRadioButton();
        bool.setSelected(false);
        bool.setBounds(220, 45, 18,18);

        JRadioButton bool_false = new JRadioButton();
        bool.setSelected(false);
        bool.setBounds(220, 50, 18,18);


        JComboBox headers = new JComboBox(container.headers);
        headers.setAlignmentX(Component.LEFT_ALIGNMENT);
        headers.setFont(new Font("Verdana", 0, 12));
        headers.setBounds(220, 115, 160, 30);



        JButton saveBtn = new JButton("Save");
        saveBtn.setBounds(10, 115, 90, 30);
        ActionListener createListener = new CreateListener(frame, container, infoLabel, inputField, headers, bool, bool_false);
        saveBtn.addActionListener(createListener);

        JButton okBtn = new JButton("Ok");
        okBtn.setBounds(110, 115, 90,30);
        okBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                container.insert();
                container.redraw();
                frame.dispose();
            }
        });


        buttonGroup.add(bool);
        buttonGroup.add(bool_false);
        JPanel panel = new JPanel(new GridLayout(0, 1));
        panel.setBounds(220, 50, 20,50);
        panel.add(bool);
        panel.add(bool_false);

        frame.add(boolLabel);
        frame.add(infoLabel);
        frame.add(infoLabel2);
        frame.add(inputField);
        frame.add(headers);
        frame.add(saveBtn);
        frame.add(okBtn);
        frame.add(panel);
        frame.add(boolLabel_false);

        frame.setLayout(null);
        frame.setLocationRelativeTo(null);
        frame.setBounds(600,400, 410,200);
        frame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        frame.setResizable(false);
        frame.setVisible(true);
    }
}
