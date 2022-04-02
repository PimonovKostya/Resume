package trees;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import xD.ITree;

import java.lang.reflect.ParameterizedType;
import java.util.Arrays;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(Parameterized.class)
class AVLTreeTest {
    private int[] income;
    private int[] result;
    private ITree test;

    public AVLTreeTest(int[] income, int[] result){
        this.income = income;
        this.result = result;
    }

    @Before
    public void initialize(){
        test = new AVLTree();
    }

    @Parameterized.Parameters
    public static Collection input() {
        return Arrays.asList(new Object[][] {{}});
    }

    @Test
    void init() {
    }

    @Test
    void print() {
    }

    @Test
    void clear() {
    }

    @Test
    void size() {
    }

    @Test
    void toArray() {
    }

    @Test
    void add() {
    }

    @Test
    void del() {
    }

    @Test
    void getWidth() {
    }

    @Test
    void getHeight() {
    }

    @Test
    void nodes() {
    }

    @Test
    void leaves() {
    }

    @Test
    void reverse() {
    }
}