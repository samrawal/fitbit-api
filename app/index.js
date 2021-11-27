/*
 * Entry point for the watch app
 */

import * as document from "document";
import * as messaging from "messaging";


// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  console.log(evt.data);
  write_textarea(evt.data);
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
}

function write_textarea(text) {
  let textarea = document.getElementById("textarea");
  textarea.text = text;
}
