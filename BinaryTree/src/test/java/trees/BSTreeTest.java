package trees;

import org.junit.jupiter.api.Test;

import java.lang.annotation.Target;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class BSTreeTest {
    BSTree bin = new BSTree();
//    @Test
//    public void initArrayTest_1(){
//        int[] actual = {4, 5, 5, 10, -7, 18};
//        bin.init(actual);
//        bin.print();
//    }
    @Test
    public void initArrayTest_2(){
        int[] actual = {50,-25,0,-30,40,51,-8,100,75,76,74,110};
        bin.init(actual);
        String expected = "[-30, -25, -8, 0, 40, 50, 51, 74, 75, 76, 100, 110]";
        assertEquals(expected, Arrays.toString(bin.toArray()));
    }
    @Test
    public void addAndClearTest(){
        int[] actual = {50,-25,0,-30,40,51,-8,100,75,76,74,110};
        bin.init(actual);
        bin.add(666);
        String expected = "[-30, -25, -8, 0, 40, 50, 51, 74, 75, 76, 100, 110, 666]";
        assertEquals(expected, Arrays.toString(bin.toArray()));
    }

    @Test
    public void delTreeTest(){
        int[] actual = {50,-25,0,-30,40,51,-8,100,75,76,74,110};
        bin.init(actual);
        bin.del(0);
        String expected = "[-30, -25, -8, 40, 50, 51, 74, 75, 76, 100, 110]";
        assertEquals(expected, Arrays.toString(bin.toArray()));
    }
    @Test
    public void delTreeTest_1(){
        int[] actual = {50,-25,0,-30,40,51,-8,100,75,76,74,110};
        bin.init(actual);
        bin.del(-25);
        String expected = "[-30, -8, 0, 40, 50, 51, 74, 75, 76, 100, 110]";
        assertEquals(expected, Arrays.toString(bin.toArray()));
    }
    @Test
    public void delTreeTest_2(){
        int[] actual = {50,-25,0,-30,40,51,-8,100,75,76,74,110};
        bin.init(actual);
        bin.del(51);
        String expected = "[-30, -25, -8, 0, 40, 50, 74, 75, 76, 100, 110]";
        assertEquals(expected, Arrays.toString(bin.toArray()));
    }
    @Test
    public void widthTest(){
        int[] actual = {50,-25,0,-30,40,51,-8,100,75,76,74,110};
        bin.init(actual);
        assertEquals(6, bin.getWidth());
    }
    @Test
    public void heightTest(){
        int[] actual = {50,-25,0,-30,40,51,-8,100,75,76,74,110};
        bin.init(actual);
        assertEquals(4, bin.getHeight());
    }



    @Test
    public void reverseTest() {
        int[] actual = {50, -25, 0, -30, 40, 51, -8, 100, 75, 76, 74, 110};
        bin.init(actual);
        bin.reverse(true);
        assertEquals(-25, bin.getPrime());
    }

    @Test
    public void reverseTest_1() {
        int[] actual = {50, -25, 0, -30, 40, 51, -8, 100, 75, 76, 74, 110};
        bin.init(actual);
        bin.reverse(true);
        bin.reverse(false);
        assertEquals(50, bin.getPrime());
    }



}