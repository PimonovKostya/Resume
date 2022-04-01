//Ive used MVC pattern to build project structure,
//but now its more like MVVM, not quite sure about it

import model.DBLayer;
import model.ModelLayer;
import view.listeners.Container;
import view.View;
import view.gui.MainForm;

public class Controller {
    Container container;
    ModelLayer modelLayer;
    View view;
    String[] tables;

    Controller(){
        modelLayer = new DBLayer();
        container = new Container(modelLayer, view);
        view = new MainForm(container);
    }
    //this is where app starts, firstly we getting all accessible tables,
    //to work with, and enabling view model,
    //all later work is going in view.listeners.Container
    void execute(){
        tables = modelLayer.getTables();
        container.setAvailableTables(tables);
        view.getView();
    }

}
