class GoogleAuth {
  GoogleAuth = null;

  gapi = null;

  user = null;

  callback = null;

  constructor(gapi) {
    if (!gapi) {
      throw new Error('GAPI needed');
    }
    this.GoogleAuth = gapi.auth2.getAuthInstance();
    this.gapi = gapi;
  }

  onAuthChange(cb) {
    // Listen for sign-in state changes.
    this.callback = cb;
    this.GoogleAuth.isSignedIn.listen((isSignedIn) => {
      if (typeof this.callback !== 'function') {
        throw new Error('No Callback available');
      }

      if (isSignedIn) {
        const user = this.getCurrentUser().getBasicProfile();
        this.callback(isSignedIn, user);
      } else {
        this.callback(isSignedIn, null);
      }
    });
  }

  getCurrentUser() {
    this.user = this.GoogleAuth.currentUser.get();
    const accessToken = this.user?.wc?.['access_token'];
    if (accessToken) {
      this.gapi.client.setToken(accessToken);
    }
    return this.user;
  }

  signIn() {
    this.GoogleAuth.signIn();
  }

  signOut() {
    if (this.GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked "Sign out" button.
      this.GoogleAuth.signOut();
    }
  }
}

export default GoogleAuth;
