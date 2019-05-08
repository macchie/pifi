
export class WPA {

  public static buildSupplicant(country: string, ssid: string, psk: string) {

    return `ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=${country}

network={
  ssid="${ssid}"
  psk="${psk}"
}`;
  }

}
