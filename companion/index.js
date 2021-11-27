/*
 * Entry point for the companion app
 */

console.log("Companion code started");
import * as messaging from "messaging";


// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  messaging.peerSocket.send("Hi!");
  send_message();
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
}


function send_message(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
   }
}


function api_call_and_send() {
    // via MDN Web Docs:
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/article/xmlhttprequest/example/load');
    xhr.setRequestHeader('Authorization','Bearer ' + key);
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
	console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
	console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
	send_message(xhr.responseText);
	
    }
    };

    xhr.onprogress = function(event) {
    if (event.lengthComputable) {
	console.log(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
	console.log(`Received ${event.loaded} bytes`); // no Content-Length
    }

    };

    xhr.onerror = function() {
    console.log("Request failed");
    };
}
