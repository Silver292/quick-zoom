let zoomIndex = 8 // default to 100%
const zoomLevels = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.33, 1.4, 1.5, 1.75, 2, 2.5, 3, 4, 5] // zoom levels from options menu
const maxZoomIndex = zoomLevels.length - 1 // max index of zoom levels

// get current zoom level of the tab and set the index, if not in zoom levels set to 100%
chrome.tabs.getZoom((currentZoom) => zoomIndex = zoomLevels.indexOf(currentZoom) || 1)

// listen for the message from the content script
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.zoomIn) {
            const newZoomIndex = zoomIndex + 1;
            // increase zoom index, but not above max
            zoomIndex = newZoomIndex > maxZoomIndex ? zoomIndex : newZoomIndex
        } else {
            const newZoomIndex = zoomIndex - 1;
            // increase zoom index, but not below minimum
            zoomIndex = newZoomIndex >= 0 ? newZoomIndex : zoomIndex
        }
        // set tab zoom level
        chrome.tabs.setZoom(zoomLevels[zoomIndex])
    });