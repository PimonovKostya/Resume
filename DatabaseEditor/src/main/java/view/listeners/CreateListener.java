package view.listeners;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static utils.Const.*;

public class CreateListener implements ActionListener {
    JFrame frame;
    Container container;
    JLabel infoLabel;
    JTextField inputField;
    JComboBox headers;
    JRadioButton bool;
    JRadioButton bool_false;
    Pattern pattern;
    Matcher matcher;

    public CreateListener(JFrame frame, Container container, JLabel infoLabel,
                          JTextField inputField, JComboBox headers, JRadioButton bool, JRadioButton bool_false) {
        this.frame = frame;
        this.container = container;
        this.infoLabel = infoLabel;
        this.inputField = inputField;
        this.headers = headers;
        this.bool = bool;
        this.bool_false = bool_false;
        pattern = Pattern.compile(DATE_REGEX);
    }

    public void actionPerformed(ActionEvent e) {
        if(container.curTable.equals("orders")){
            switch ((String) headers.getSelectedItem()){
                case BLACK:
                    if (container.blacklist(inputField.getText())) {
                        infoLabel.setText("This user is in blacklist");
                    } else {
                        container.price(inputField.getText());
                        container.setInsertData((String) headers.getSelectedItem(), inputField.getText(), bool.isSelected());
                        headers.removeItemAt(headers.getSelectedIndex());
                        inputField.setText("");
                    }
                    break;
                case PRICE:
                    switch (container.mode) {
                        case 0:
                            container.setInsertData((String) headers.getSelectedItem(), inputField.getText(), bool.isSelected());
                            break;
                        case 1:
                            int price = (int) ((Integer.parseInt(inputField.getText()) *  0.9) / 1);
                            container.setInsertData((String) headers.getSelectedItem(), String.valueOf(price), bool.isSelected());
                            break;
                        case 2:
                            container.setInsertData((String) headers.getSelectedItem(), "0", bool.isSelected());
                            break;
                    }
                    headers.removeItemAt(headers.getSelectedIndex());
                    inputField.setText("");
                    break;
                case A_DATE:
                case B_DATE:
                    matcher = pattern.matcher(inputField.getText());
                    if (matcher.matches()) {
                        container.setInsertData((String) headers.getSelectedItem(), inputField.getText(), bool.isSelected());
                        headers.removeItemAt(headers.getSelectedIndex());
                        inputField.setText("");
                        infoLabel.setText("Data matches");
                    } else infoLabel.setText("Invalid data YYYY-mm-DD");
                    break;
                default:
                    execute();
            }
        }else{
            execute();
        }
    }

    private void execute(){
        if (bool.isSelected()) {
            container.setInsertData((String) headers.getSelectedItem(), inputField.getText(), true);
            headers.removeItemAt(headers.getSelectedIndex());
        } else if (bool_false.isSelected()) {
            container.setInsertData((String) headers.getSelectedItem(), inputField.getText(), false);
            headers.removeItemAt(headers.getSelectedIndex());
        } else if (inputField.getText().trim().equals("") || inputField.getText() == null) {
            infoLabel.setText("No data to add");
        } else {
            container.setInsertData((String) headers.getSelectedItem(), inputField.getText(), bool.isSelected());
            headers.removeItemAt(headers.getSelectedIndex());
            inputField.setText("");
        }
    }
}
