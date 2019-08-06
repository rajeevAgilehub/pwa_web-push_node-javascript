const publicVapidKey = 'BAz4U03plwj8vf9FGcKxZ7dizd-OUIW0cEJKjEbl5hxogr7kL1bI7b0MeO_gmzt7EmKsT76mRRbKu3D3QVQ-mEU';

//check if service worker availaberl in browser
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}



/**
|--------------------------------------------------
| register service worker
| register push
| send the push
|--------------------------------------------------
*/
async function send(params) {
    
    // Register service worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    console.log('service worker Registered');


    // Register Push
    console.log('registering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered');

    // send push notification
    console.log('sending push...');
    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push sent');

}


// convert the URL safe base64 string to a Uint8Array 
// to pass into the subscribe call
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}