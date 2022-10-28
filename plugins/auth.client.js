export default ({ $config }) => {
  addScript();
  window.initAuth = init;

  function addScript() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js?onLoad=initAuth";
    script.async = true;
    document.head.appendChild(script);
  }

  function init() {
    window.gapi.load('auth2', async function() {
      const auth2 = await window.gapi.auth2.init({
        client_id: $config.auth.clientId,
      });
    });

    window.gapi.signin2.render('googleButton', {
      onsuccess: parseUser,
    });
  }

  function parseUser(user) {
    const profile = user.getBasicProfile();
  }
}
