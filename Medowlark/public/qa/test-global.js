
suite('Global Tests', () => {
    test('This page header is adorable', ()=>{
        assert(document.title && document.title.match(/\S/)) && document.title.toUpperCase() !== 'TODO';
    });
});