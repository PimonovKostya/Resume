import pandas as pd
import json
import os
import xlrd
import sys
import datetime
import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication, QMainWindow,\
    QTableWidget, QLineEdit, QPushButton, QWidget, QDateEdit, QVBoxLayout, QTableWidgetItem, QFileDialog
from PyQt5.QtCore import QDate, QAbstractTableModel, Qt, QDir, QStringListModel


FILE = "test1.json"
KEY = "statistics"
URL = 'https://coronavirus-monitor.ru/jquery-lite-9.js?'
HEADERS = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
}

class Listener:
    def __init__(self):
        self.table = pd.core.frame.DataFrame
        self.creator = Creator()
        self.parser = Parse()
        self.jC = Conv()

    def start(self):
        str = self.parser.get_html()
        table = self.jC.converter(str)
        with open("corona_table.json", "w") as write_file:
            json.dump(table, write_file)
        print(type(table))

    def getData(self, date, country):
        print(date + ', ' + country)
        with open("corona_table.json", "r") as read_file:
            data = json.load(read_file)
        if type(data) == "str":
            data = json.loads(data)
        print(type(data))
        self.creator.start(date, country, data)
        return self.creator.getTable()

    def list(self):
        with open("corona_table.json", "r") as read_file:
            data = json.load(read_file)
        if type(data) == "str":
            data = json.loads(data)
        self.creator.cListMaker(data)
        return self.creator.getList()

    def get_table(self, path):
        full_file = os.path.abspath(path[0])

        self.table = pd.read_excel(
            os.path.join(full_file),
            engine='openpyxl',
        )
        return self.table
        pass



class Parse:

    def get_html(self):
        req = requests.get(URL, HEADERS)
        return req.text

class Creator:

    def __init__(self):
        self.table = pd.core.frame.DataFrame

    def start(self, date, country, data):
        print("Creator.start")
        self.this_day(data, country, date)

    def getTable(self):
        print(self.table)
        return self.table

    def setTable(self, table):
        self.table = pd.DataFrame(table)

    def setList(self, list):
        self.table = pd.DataFrame(list)

    def getList(self):
        print(self.table)
        return self.table


    def cListMaker(self, data):
        data = data[0]
        data = data["cities"]["data"]["cities"]
        i = 0
        _list = list()
        while i < len(data):
            this_data = data[i]
            _list.append(this_data["en"])
            i += 1
        self.setList(_list)


    def this_day(self, data, country, date):
        print(type(data))
        data = data[0]
        data = data["cities"]["data"]["cities"]
        i = 0
        while i < len(data):
            this_data = data[i]
            if(this_data["en"] == country):
                print(this_data["ru"])
                self.crop(this_data["statistics"], date)
                break
            i += 1


    def crop(self, data, date):
        print("crop")
        date = date + "T00:00:00.000Z"
        i = len(data) - 1
        res = list()
        while i > 0:
            this_data = data[i]
            i -= 1
            if this_data["date"] == date:
                res.append(data[i])
                self.setTable(res)
                break
            else:
                res.append(data[i])




class Conv:
    def converter(self, table):
        str = json_fix(table)
        with open("test1.json", "w") as write_file:
            json.dump(str, write_file)
        dictionary = json.loads(str)
        return dictionary

def json_fix(str):
    start ="window.dataFromServer ="
    str = str.replace(start, "")
    symbol = chr(92)
    while(symbol in str):
        str = str.replace(symbol, "")
    str ="[" + str[3:]
    str = str[:-1] + "]"
    return str

class MainFrame(QMainWindow):

    def __init__(self):
        super(MainFrame, self).__init__()
        listener = Listener()
        self.app()

    def app(self):
        self.setWindowTitle("Hello World")
        self.setGeometry(250, 300, 800, 600)

        self.findButton = QPushButton(self)
        self.findButton.setText("browse")
        self.findButton.setGeometry(5, 5, 90, 30)
        self.findButton.setCheckable(True)
        self.findButton.clicked.connect(self.browseButtonClicked)

        self.cList = QPushButton(self)
        self.cList.setText("List")
        self.cList.setGeometry(150, 5, 90, 30)
        self.cList.setCheckable(True)
        self.cList.clicked.connect(self.cListButtonClicked)

        self.selectField = QLineEdit(self)
        self.selectField.setGeometry(270, 5, 120, 30)

        self.date = QDateEdit(self)
        self.date.setGeometry(400, 5, 120, 30)
        self.date.setDisplayFormat("yyyy-MM-dd")
        self.date.setDate(QDate.currentDate())
        self.date.setMinimumDate(d)
        self.date.setMaximumDate(QDate.currentDate())

        self.table = QTableWidget(self)
        self.table.setGeometry(5,50,790,545)

        self.dataBtn = QPushButton(self)
        self.dataBtn.setText("Go")
        self.dataBtn.setGeometry(540, 5, 90, 30)
        self.dataBtn.setCheckable(True)
        self.dataBtn.clicked.connect(self.dataButtonClicked)

        self.startBtn = QPushButton(self)
        self.startBtn.setText("Start")
        self.startBtn.setGeometry(705, 5, 90, 30)
        self.startBtn.setCheckable(True)
        self.startBtn.clicked.connect(self.startButtonClicked)


    def dataButtonClicked(self):
        if self.dataBtn.isChecked():
            print(self.date.text() + self.selectField.text())
            if self.selectField.text() != "":
                data = listener.getData(self.date.text(), self.selectField.text())
                nRows, nColumns = data.shape
                self.table.setColumnCount(nColumns)
                self.table.setRowCount(nRows)

                self.table.setHorizontalHeaderLabels(data.columns.values)

                for i in range(self.table.rowCount()):
                    for j in range(self.table.columnCount()):
                        self.table.setItem(i, j, QTableWidgetItem(str(data.iloc[i, j])))


    def startButtonClicked(self):
        if self.startBtn.isChecked():
            print("start")
            listener.start()

    def cListButtonClicked(self):
        if self.cList.isChecked():
            print("cList")
            _list = listener.list()
            self.table.clear()
            self.drawTable(_list)


    def browseButtonClicked(self):
        dlg = QFileDialog()
        dlg.setFileMode(QFileDialog.FileMode.AnyFile)
        name = QStringListModel()

        if dlg.exec():
            name = dlg.selectedFiles()
            print(name)
            table = listener.get_table(name)
            self.drawTable(table)

    def drawTable(self, _list):
        nRows, nColumns = _list.shape
        self.table.setColumnCount(nColumns)
        self.table.setRowCount(nRows)

        for i in range(self.table.rowCount()):
            for j in range(self.table.columnCount()):
                self.table.setItem(i, j, QTableWidgetItem(str(_list.iloc[i, j])))


if __name__ == '__main__':
    d = QDate(2020, 1, 1)
    listener = Listener()
    app = QApplication(sys.argv)
    ex = MainFrame()
    ex.show()
    sys.exit(app.exec())
