(function () {
    document.addEventListener('wheel', onWheel, { passive: false })

    function onWheel(event) {
        // Check that cmd key is held
        if (event.metaKey) {
            // Prevent wheel event from default behaviour
            event.preventDefault()

            // mouse scroll forward (towards front of the mouse) is negative,
            // backwards (towards rear of mouse) is positive
            const zoomIn = event.deltaY <= 0

            // send message to background script
            chrome.runtime.sendMessage({zoomIn})
        }
    }
})()
