package trees;

import xD.ITree;

import java.util.Arrays;

public class BSTree implements ITree {
    private Root primeRoot = null;
    private Root root = null;
    private Root saveRoot = null;
    private Root finder = null;

    private int calc = 0;
    private boolean switcher = true;
    private int[] xD;
    private int counter = 0;
    private int val;

    private class Root{
        public Root leftBranch;
        public Root rightBranch;
        private int value = -666;

        public Root(int value){
            this.value = value;
            leftBranch = null;
            rightBranch = null;
        }
    }
    @Override
    public void init(int[] ar) {
        if (calc == 0 && ar != null) {
            primeRoot = new Root(ar[0]);
            root = primeRoot;
            calc++;
        }
        for(int i = 1; i< ar.length; i++) {
            root = primeRoot;
            add(ar[i]);
        }
    }



    @Override
    public void print() {
        zeroCounter();
        try {
            xD = new int[calc];
            recurser(primeRoot);
            System.out.println(Arrays.toString(xD));
        }catch (NullPointerException e){
            throw new NullPointerException("There is no tree to execute");
        }
    }


    @Override
    public void clear() {
        zeroCounter();
        switcher = false;
        recurser(primeRoot);
        switcher = true;
        calc = 0;
    }

    private void clear(Root root){
        zeroCounter();
        switcher = false;
        recurser(root);
        switcher = true;
        calc = calc - size(root);
    }

    @Override
    public int size() {
        return calc;
    }

    private int size(Root root){
        zeroCounter();
        int capacity = 0;
        if(hasNotNext(root)){
            return 1;
        }

        nodesCounter(saveRoot);
        capacity += counter;
        zeroCounter();
        leavesCounter(saveRoot);
        capacity += counter;
        return capacity;

    }

    @Override
    public int[] toArray() {
        zeroCounter();
        xD = new int[calc];
        recurser(primeRoot);
        return xD;
    }

    public int[] toArray(Root root){
        zeroCounter();
        xD = new int[size(root)];
        zeroCounter();
        recurser(root);
        return xD;
    }

    @Override
    public void add(int val) {
        zeroCounter();
        do {
            if (root.value <= val) {
                if(checkBranch(root.rightBranch)) {
                    root.rightBranch = new Root(val);
                }else {
                    root = root.rightBranch;
                }
            } else  {
                if (checkBranch(root.leftBranch)){
                    root.leftBranch = new Root(val);
                }else {
                    root = root.leftBranch;
                }
            }
        } while (root.value != val) ;
        calc++;
    }

    @Override
    public void del(int val) {
        this.val = val;
        nullFinder();
        zeroCounter();
        if(rootFinder(primeRoot) == null){
            throw new NullPointerException("There is no " + val + " in this tree ");
        }else {
            nullFinder();
            if(val!=primeRoot.value) {
                root = motherFinder(primeRoot);
            }else root = primeRoot;
            if(counter == 1) { /// левая ветка
                uninstaller(root, true);
            }else if(counter == 2) { // правая ветка
                uninstaller(root, false);
            }else{
//                reverser(primeRoot);
            }
            calc--;
        }
    }

    @Override
    public int getWidth() {
        zeroCounter();
        widthCounter(primeRoot,true);
        widthCounter(primeRoot, false);
        return counter;
    }

    @Override
    public int getHeight() {
        return heightCounter(primeRoot);
    }



    @Override
    public int nodes() {
        zeroCounter();
        nodesCounter(primeRoot);
        return counter;
    }

    @Override
    public int leaves() {
        zeroCounter();
        leavesCounter(primeRoot);
        return counter;
    }
// поворот сделал, зависимым от ширины и глубины,
// т. к. просто хотел проверить и использовать эти методы
// ниже перегруженный метод с мануальным выбором поворота
    @Override
    public void reverse() {
        zeroCounter();
        setSaveRootNullify();
        try{
            reverser(primeRoot, getHeight() > getWidth());
            System.out.println(primeRoot.value);
        }catch (NullPointerException e){
            throw new NullPointerException("Something goes wrong");
        }
    }

    public void reverse(boolean left){
        zeroCounter();
        setSaveRootNullify();
        try{
            reverser(primeRoot, left);
            System.out.println(primeRoot.value);
        }catch (NullPointerException e){
            throw new NullPointerException("Something goes wrong");
        }
    }

    public int getPrime(){
        return primeRoot.value;
    }

////////////////////////////////////////////////////PRIVATE METHODS|||||||||||||||||||||||||||||

    private boolean checkBranch(Root root){
        if(root == null){
            return true;
        }
        return false;
    }

    private boolean hasNotNext(Root root){
        try{
            return root.rightBranch == null && root.leftBranch == null;
        }catch (NullPointerException e){
            return false;
        }
    }

    private void recurser(Root root){
        if(checkBranch(root)){
            return;
        }
        try {
            recurser(root.leftBranch);
            // util to clear
            if (!switcher) {
                root = null;
            } else {
                // to arrayCompiler // if root is null there nothing to return
                arrayCreator(root.value);
            }
            recurser(root.rightBranch);
        }catch (NullPointerException e){
            e.getMessage();
        }
    }

    private void arrayCreator(int value){
        if (calc != 0) {
            xD[counter] = value;
            counter++;
        } else counter = 0;
    }

    private Root rootFinder(Root root){
        if(root == null){
            return null;
        }
        rootFinder(root.leftBranch);
        if(root.value == val){
            finder = root;
        }
        rootFinder(root.rightBranch);
        return finder;
    }

    private Root motherFinder(Root root){
        if(root.leftBranch == null || root.rightBranch == null){
            return null;
        }
        try {
            motherFinder(root.leftBranch);
            if (root.leftBranch.value == val) {
                finder = root;
                counter = 1;
            } else if (root.rightBranch.value == val) {
                finder = root;
                counter = 2;
            }
            motherFinder(root.rightBranch);
        }catch (NullPointerException e){
            throw new NullPointerException(root.leftBranch.value + " is null");
        }
        return finder;
    }


    private void widthCounter(Root root, boolean left){
        if(root == null){
            return;
        }
        if(left){
            widthCounter(root.leftBranch, true);
            counter++;
        }else{
            widthCounter(root.leftBranch, false);
            counter++;
        }
    }

    private int heightCounter(Root root){       /// копипаст из интернетов
        if(root == null){
            return -1;
        }
        int left = heightCounter(root.leftBranch);
        int right = heightCounter(root.rightBranch);

        if(left>right){
            return left+1;
        }else{
            return right+1;
        }
    }

    private void nodesCounter(Root root){
        if(checkBranch(root)){
            return;
        }
        nodesCounter(root.leftBranch);
        if(hasNotNext(root)){
            counter--;
        }
        nodesCounter(root.rightBranch);
        counter++;
    }

    private void leavesCounter(Root root){
        if(checkBranch(root)){
            return;
        }
        leavesCounter(root.leftBranch);
        if(hasNotNext(root)){
            counter++;
        }
        leavesCounter(root.rightBranch);
    }

    private void reverser(Root root, boolean left){
        Root reversed;
        if(left) {      //// правый поворот
            reversed = root.leftBranch;
            root.leftBranch = null;
            if (!checkBranch(reversed.rightBranch)) {
                saveRoot = reversed.rightBranch;
            }
            reversed.rightBranch = root;
            primeRoot = reversed;

            if(saveRoot!=null){
                saveRootAdd(saveRoot);
            }

        } else{        /// левый поворот
            reversed = root.rightBranch;
            root.rightBranch = null;
            if(!checkBranch(reversed.leftBranch)){
                saveRoot = reversed.leftBranch;
            }
            reversed.leftBranch = root;
            primeRoot = reversed;

            if(saveRoot!=null){
                saveRootAdd(saveRoot);
            }
        }
    }

    private void saveRootAdd(Root saveRoot){
        xD = toArray(saveRoot);
        for (int i:xD) {
            add(i);
            calc--;
        }
    }

    //в отличии от основной задумки мой метод удаляет только нужный элемент,
    //сохраняя остальные, со смещением
    private void uninstaller(Root root, boolean left){
        Root deleted;
        if(root == primeRoot) {      // недостаток метода, в удалении главного корня,
            clear();
        }                           // поэтому я просто, в этом, случае удалю все дерево=)
        if(left){
            deleted = root.leftBranch;
            if(!checkBranch(deleted.leftBranch)){
                saveRoot = deleted.leftBranch;
            }
            root.leftBranch = deleted.rightBranch;

            if(saveRoot!=null){
                saveRootAdd(saveRoot);
            }
        }else{
            deleted = root.rightBranch;
            if(!checkBranch(deleted.rightBranch)){
                saveRoot = deleted.rightBranch;
            }
            root.rightBranch = deleted.leftBranch;

            if(saveRoot!=null){
                saveRootAdd(saveRoot);
            }
        }
    }

    private void zeroCounter(){
        counter = 0;
    }

    private void nullFinder(){
        finder = null;
    }

    private void setSaveRootNullify(){
        saveRoot = null;
    }


}
