const butInstall = document.getElementById('buttonInstall');

let installPromptEvent;

// Logic for installing the PWA

// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // Stash the event 
    installPromptEvent = event;
    // update UI to show install button
    butInstall.removeAttribute('hidden');
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (installPropmtEvent) {
        // show the install prompt
        installPromptEvent.prompt();
        // wait for user response
        const { outcome } = await installPromptEvent.userChoice;
        // clear the prompt event
        installPromptEvent = null;
        console.log(`Response: ${outcome}`);
    }
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('J.A.T.E. was installed', event);
    // hide the install button
    butInstall.setAttribute('hidden', true);
    window.alert('J.A.T.E. was installed!')
});
