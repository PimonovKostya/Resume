package view.gui;

import view.listeners.Container;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

public class MenuBar {
    Container container;
    JFrame frame;

    MenuBar(Container container, JFrame frame){
        this.container = container;
        this.frame = frame;
    }
    public JMenu createFileMenu(){
        JMenu file = new JMenu("File");
        JMenuItem exit = new JMenuItem(new ExitAction());
        JMenuItem open = new JMenuItem("Open");
        file.add(open);
        file.add(exit);
        open.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                TableChooserForm tableChooserForm = new TableChooserForm(container);
            }
        });
        return file;
    }

    public JMenu createInsertMenu(){
        JMenu createMenu = new JMenu("Insert");
        JMenuItem create = new JMenuItem("Create");
        JMenuItem classUp = new JMenuItem("Pre-Booking");
        create.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                CreateForm createForm = new CreateForm(container);
                if(container.headers == null){
                    System.out.println("container.headers == null");
                }else{
                    createForm.init();
                }
            }
        });


        createMenu.add(create);
        return createMenu;
    }

    public JMenu createUpdateMenu(){
        JMenu updateMenu = new JMenu("Update");
        JMenuItem update = new JMenuItem("Update");
        JMenuItem reload = new JMenuItem("Reload");
        update.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                UpdateForm updateForm = new UpdateForm(container);
            }
        });
        reload.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                container.redraw();
            }
        });
        updateMenu.add(reload);
        updateMenu.add(update);
        return updateMenu;
    }
    public JMenu createDeleteMenu(){
        JMenu deleteMenu = new JMenu("Delete");
        JMenuItem delete = new JMenuItem("Delete");
        JMenuItem deleteAll = new JMenuItem("Clear table");

        delete.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                container.delete();
            }
        });

        deleteAll.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                container.clear();
            }
        });
        deleteMenu.add(deleteAll);
        deleteMenu.add(delete);
        return deleteMenu;
    }
    public JMenu createHelpMenu(){
        JMenu helpMenu = new JMenu("Help");
        JMenuItem help = new JMenuItem("Help me");
        help.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                File file = new File("src/main/resources", "helpme.txt");
                try {
                    if (Desktop.isDesktopSupported()) {
                        Desktop.getDesktop().edit(file);
                    } else {
                        System.out.println("No file found");
                    }
                }catch (Exception f){
                    System.out.println(f);
                }
            }
        });
        helpMenu.add(help);
        return helpMenu;
    }
}
