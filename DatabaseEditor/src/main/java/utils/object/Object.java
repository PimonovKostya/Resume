package utils.object;

public class Object {
    int stringLength;
    String[] mem;
    int count;

    public Object(int stringLength){
        this.stringLength = stringLength;
        mem = new String[stringLength];
        count = 0;
    }

    public String getFirst(){return mem[0];}

    public String[] getMem() {
        return mem;
    }

    public void add(String val){
        mem[count] = val;
        count++;
        System.out.println(val + " | added");
    }

}

