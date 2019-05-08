
export class AP {
  public static buildConfig() {
    return `interface=wlan0
driver=nl80211
ssid=PiFi-${new Date().getTime()}
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=1234567890
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP`;
  }
}