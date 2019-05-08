#!/bin/bash

if [[ "$1" = "ap" ]]; then
  sudo rm -rf /etc/wpa_supplicant/wpa_supplicant.conf
  sudo systemctl restart wpa_supplicant
  sudo systemctl restart networking
  sudo systemctl restart dhcpcd
  sudo systemctl restart dnsmasq
  sleep 5
  sudo ifconfig wlan0 7.7.7.1
  sudo hostapd ~/ap.conf
fi

if [[ "$1" = "cl" ]]; then
  sudo rm -rf /etc/wpa_supplicant/wpa_supplicant.conf
  sudo touch /etc/wpa_supplicant/wpa_supplicant.conf
  echo -e "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev \n update_config=1 \n country=IT \n\n" | sudo tee -a /etc/wpa_supplicant/wpa_supplicant.conf > /dev/null
  echo -e "network={ \n ssid=\"ELVISPOS\" \n psk=\"ELPOS2014..!!\" \n } \n" | sudo tee -a /etc/wpa_supplicant/wpa_supplicant.conf > /dev/null
fi
