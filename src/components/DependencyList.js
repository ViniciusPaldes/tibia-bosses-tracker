import React, { useState, useEffect } from 'react';

const DependencyList = () => {
  const dependencies = {
    "@kichiyaki/react-native-barcode-generator": "^0.6.7",
    "@react-native-async-storage/async-storage": "^1.17.3",
    "@react-native-firebase/analytics": "14.11.1",
    "@react-native-firebase/app": "14.11.1",
    "@react-native-firebase/messaging": "14.11.1",
    "@react-native-masked-view/masked-view": "^0.2.7",
    "@react-native-picker/picker": "^2.4.1",
    "@react-navigation/bottom-tabs": "^6.2.0",
    "@react-navigation/elements": "^1.3.4",
    "@react-navigation/native": "^6.0.8",
    "@react-navigation/stack": "^6.1.1",
    "@reduxjs/toolkit": "^1.8.1",
    "@stripe/stripe-react-native": "0.16.0",
    "@turf/distance": "^6.5.0",
    "@turf/helpers": "^6.5.0",
    "@turf/turf": "^6.5.0",
    "@types/react-native-auth0": "^2.10.0",
    "@types/react-redux": "^7.1.23",
    "appcenter": "4.4.5",
    "appcenter-analytics": "4.4.5",
    "appcenter-crashes": "4.4.5",
    "axios": "^0.26.1",
    "i18next": "^21.6.16",
    "lottie-ios": "3.4.0",
    "lottie-react-native": "^5.1.4",
    "moment": "^2.29.3",
    "moment-timezone": "^0.5.34",
    "plop": "^3.0.5",
    "react": "17.0.2",
    "react-hook-form": "^7.30.0",
    "react-i18next": "^11.16.6",
    "react-native": "0.68.3",
    "react-native-auth0": "^2.13.3",
    "react-native-collapsible": "^1.6.0",
    "react-native-config": "^1.4.5",
    "react-native-device-info": "^8.7.0",
    "react-native-dotenv": "^3.3.1",
    "react-native-fast-image": "^8.5.11",
    "react-native-geolocation-service": "^5.3.0",
    "react-native-gesture-handler": "^2.4.1",
    "react-native-image-crop-picker": "^0.38.0",
    "react-native-keyboard-aware-scroll-view": "^0.9.5",
    "react-native-keychain": "^8.0.0",
    "react-native-linear-gradient": "^2.6.2",
    "react-native-localize": "^2.2.1",
    "react-native-nfc-manager": "^3.13.5",
    "react-native-permissions": "^3.3.1",
    "react-native-reanimated": "^2.8.0",
    "react-native-responsive-fontsize": "^0.5.1",
    "react-native-safe-area-context": "^4.2.4",
    "react-native-screens": "^3.13.1",
    "react-native-select-dropdown": "^2.0.4",
    "react-native-skeleton-placeholder": "^5.0.0",
    "react-native-sound": "^0.11.2",
    "react-native-splash-screen": "^3.3.0",
    "react-native-svg": "^12.3.0",
    "react-redux": "^7.2.7",
    "redux-persist": "^6.0.0"
  };

  const [peerDependencies, setPeerDependencies] = useState([]);

  useEffect(() => {
    const fetchPeerDependencies = async () => {
      const dependencyNames = Object.keys(dependencies);
      const promises = dependencyNames.map((dependencyName) =>
        fetch(`http://localhost:3001/${dependencyName}`)
          .then((response) => response.text())
          .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const peerDependencyElements = doc.querySelectorAll(
              '.dependencies-wrapper .collapsible-section li'
            );
            const peerDependencyList = Array.from(peerDependencyElements).map(
              (element) => element.textContent
            );
            return { dependency: dependencyName, peerDependencies: peerDependencyList };
          })
      );

      const resolvedPeerDependencies = await Promise.all(promises);
      setPeerDependencies(resolvedPeerDependencies);
    };

    fetchPeerDependencies();
  }, []);

  return (
    <div>
      {peerDependencies.map(({ dependency, peerDependencies }) => (
        <div key={dependency}>
          <h3>{dependency}</h3>
          <ul>
            {peerDependencies.map((peerDependency) => (
              <li key={peerDependency}>{peerDependency}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DependencyList;
