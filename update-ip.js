const fs = require('fs');
const { execSync } = require('child_process');

function getCurrentIP() {
  try {
    const output = execSync('ipconfig', { encoding: 'utf8' });
    const wifiSection = output.split('Wireless LAN adapter Wi-Fi:')[1];
    if (wifiSection) {
      const ipMatch = wifiSection.match(/IPv4 Address[.\s]*:\s*([0-9.]+)/);
      if (ipMatch) {
        return ipMatch[1];
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting IP:', error.message);
    return null;
  }
}

function updateNetworkConfig(newIP) {
  const configPath = './frontend/src/config/network.json';
  const config = {
    backendIP: newIP,
    backendPort: "4000"
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`Updated network config to IP: ${newIP}`);
}

const currentIP = getCurrentIP();
if (currentIP) {
  console.log(`Current IP detected: ${currentIP}`);
  updateNetworkConfig(currentIP);
  console.log('Restart your React Native app to use the new IP');
} else {
  console.log('Could not detect IP automatically');
  console.log('Manually update frontend/src/config/network.json with your IP');
}