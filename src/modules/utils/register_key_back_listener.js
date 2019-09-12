document.onkeydown = function(e) {
    console.log('[global]key down')
    if ( e.keyCode === 90 && e.ctrlKey ) {
        history.back();
    }
}