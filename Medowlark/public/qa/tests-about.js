
suite('Test page "O..."', function(){
    test('page must contain contact link', function(){
        assert($(`a[href="/contact"]`).length)
    });
});