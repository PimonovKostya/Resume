package trees;

import xD.ITree;

public class AVLTree implements ITree{
    private Root primeRoot = null;
    private Root branchRoot = null;
    private Root thisRoot = null;
    private Root saveRoot = null;

    private class Root{
        public Root leftBranch;
        public Root rightBranch;
        private int value;

        public Root(int value){
            this.value = value;
            leftBranch = null;
            rightBranch = null;
        }
    }
    @Override
    public void init(int[] ar) {
        if(ar.length == 1){
            primeRoot = new Root(ar[0]);
            thisRoot = primeRoot;
        }else{
            for(int i = 1; i<ar.length; i++){
                thisRoot = primeRoot;
                add(ar[i]);
            }
        }
    }

    @Override
    public void print() {

    }

    @Override
    public void clear() {

    }

    @Override
    public int size() {
        return 0;
    }

    @Override
    public int[] toArray() {
        return new int[0];
    }

    ///method to add some value to tree
    @Override
    public void add(int val) {
        if(thisRoot.value > val){
            add(val, thisRoot.leftBranch);
        }else if (thisRoot.value < val){
            add(val, thisRoot.rightBranch);
        }else
            System.out.println("Binary Tree cannot contain equal values, so " + val + " is skipped");
    }

    private void add(int val, Root root){
        if(root == null){
            root = new Root(val);
        }else{
            thisRoot = root;
            add(val);
        }
    }

    @Override
    public void del(int val) {

    }

    @Override
    public int getWidth() {
        return 0;
    }

    @Override
    public int getHeight() {
        return 0;
    }

    @Override
    public int nodes() {
        return 0;
    }

    @Override
    public int leaves() {
        return 0;
    }

    @Override
    public void reverse() {

    }
}
