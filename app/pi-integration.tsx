
"use client";

import { useEffect, useState } from 'react';

declare const Pi: any;

const PiIntegration = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [piSDKInitialized, setPiSDKInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/v2/pi-sdk.js';
    script.async = true;
    script.onload = initializePiSDK;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePiSDK = () => {
    try {
      console.log('Initializing Pi Network SDK...');
      Pi.init({ version: '2.0', sandbox: true });
      setPiSDKInitialized(true);
    } catch (error) {
      console.error('Error initializing Pi SDK:', error);
    }
  };

  const authenticatePiUser = async () => {
    if (!piSDKInitialized) {
      alert('Pi Network SDK is not initialized yet. Please wait...');
      return;
    }

    try {
      const scopes = ['username', 'payments'];
      const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log('Pi user authenticated:', authResult);
      setCurrentUser(authResult.user);
      handleSuccessfulAuth(authResult);
    } catch (error) {
      console.error('Authentication error:', error);
      if (error.message.includes('User cancelled') || error.message.includes('user_cancelled')) {
        alert('You cancelled the authentication process. Please try again.');
      } else {
        alert('Authentication failed: ' + error.message);
      }
    }
  };

  const onIncompletePaymentFound = (payment: any) => {
    console.log('Incomplete payment found:', payment);
    return confirm('You have an incomplete payment. Do you want to continue with this payment?');
  };

  const handleSuccessfulAuth = (authResult: any) => {
    const authBtn = document.getElementById('pi-auth-btn');
    if (authBtn) {
      authBtn.innerHTML = `<i class='fas fa-check-circle'></i> Signed in as ${authResult.user.username}`;
      authBtn.setAttribute('disabled', 'true');
    }
  };

  return (
    <>
      <button id='pi-auth-btn' className='pi-auth-btn' onClick={authenticatePiUser}>
        <i className='fas fa-sign-in-alt'></i> Sign In with Pi Network
      </button>
      <div className='registration-note'>
        <p>
          <i className='fas fa-info-circle'></i>
          This application uses the Pi Testnet. No real Pi will be deducted.
        </p>
      </div>
    </>
  );
};

export default PiIntegration;
