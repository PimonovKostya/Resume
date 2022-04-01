package view.gui;

import view.listeners.Container;
import view.View;
import javax.swing.*;
import java.awt.event.ActionEvent;

public class MainForm implements View {
    JFrame frame;
    JMenuBar jMenuBar;
    MenuBar menuBar;

    public MainForm(Container container){
        frame = new JFrame();
        menuBar = new MenuBar(container, frame);

        jMenuBar = new JMenuBar();
        jMenuBar.add(menuBar.createFileMenu());
        jMenuBar.add(menuBar.createInsertMenu());
        jMenuBar.add(menuBar.createUpdateMenu());
        jMenuBar.add(menuBar.createDeleteMenu());
        jMenuBar.add(menuBar.createHelpMenu());

        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.setTitle("Hello There");
        frame.setResizable(false);

        frame.setBounds(600,400, 800,600);
        frame.setLayout(null);
        frame.setResizable(false);
        frame.setLocationRelativeTo(null);
        frame.setJMenuBar(jMenuBar);


        frame.setVisible(true);
        container.setFrame(frame);
        container.redraw();

    }

    @Override
    public void getView() {

    }
}

class ExitAction extends AbstractAction
{
    private static final long serialVersionUID = 1L;
    ExitAction(){
        putValue(NAME, "Exit");
    }
    @Override
    public void actionPerformed(ActionEvent e) {
        System.exit(0);
    }
}
