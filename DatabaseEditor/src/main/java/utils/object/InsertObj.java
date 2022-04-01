package utils.object;

import java.util.Objects;

public class InsertObj <E> {
    String key;
    String value;
    boolean bool;

    public InsertObj(String key, String value){
        this.key = key;
        this.value = value;
    }

    public InsertObj(String key, boolean bool){
        this.key = key;
        this.bool = bool;
    }



    public String[] getMem() {
        if (value == null || value.equals("")) {
            return new String[]{key, String.valueOf(bool)};
        } else {
            return new String[]{key, value};
        }
    }

    public String getKey(){
        return key;
    }

    @Override
    public String toString() {
        return "InsertObj{" +
                "key='" + key + '\'' +
                ", value='" + value + '\'' +
                '}';
    }

    public boolean equals(InsertObj o) {
        if (this.toString().equals(o.toString())) return true;
        if (o == null || !String.valueOf(getClass()).equals(String.valueOf(o.getClass()))) return false;
        String[] val = o.getMem();
        return key.equals(val[0]) && value.equals(val[1]);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key, value);
    }
}
