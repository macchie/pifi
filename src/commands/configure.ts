
const sudo = require('sudo-js');
const fs = require('fs');

const Static = require('node-static');
const folder = new Static.Server(`${__dirname}/www`);
const WebSocket = require('ws');
const HTTP = require('http');

import {Command, flags} from '@oclif/command'
import { AP } from '../shared/AP';

const EXEC_OPTIONS = {check: true, withResult: false};

export default class Configure extends Command {

  static description = 'Configure Rasperry PI Wireless'
  static examples = [`$ pifi configure`];
  static flags: any = { help: flags.help({char: 'h'}) };
  static args = [];

  async run() {
    const {args, flags} = this.parse(Configure);

    console.log(`configuring...`);
    sudo.setPassword('');

    if (!fs.existsSync('/etc/wpa_supplicant/wpa_supplicant.conf')) {
      console.log('wpa_supplicant.conf not found! Running AP...');

      sudo.exec(['ifconfig', 'wlan0', '7.7.7.1'], EXEC_OPTIONS, (err: any, res: any) => {
        console.log(err, res);
        if (err == null) {
          fs.writeFileSync('/tmp/hostapd.conf', AP.buildConfig());

          if (fs.existsSync('/tmp/hostapd.conf')) {
            sudo.exec(['hostapd', '/tmp/hostapd.conf'], EXEC_OPTIONS, (err: any, res: any) => {
              console.log('Running AP...', err, res)
              HTTP.createServer((request: any, response: any) => {
                request.addListener('end', () => {
                  folder.serve(request, response)
                }).resume()
              }).listen(17391);
            });
          }
        }
      });

      // sudo.check((valid: any) => {
      //   sudo.exec(['systemctl', 'restart', 'wpa_supplicant'], EXEC_OPTIONS, (err: any, res: any) => {
      //     sudo.exec(['systemctl', 'restart', 'networking'], EXEC_OPTIONS, (err: any, res: any) => {
      //       sudo.exec(['systemctl', 'restart', 'dhcpcd'], EXEC_OPTIONS, (err: any, res: any) => {
      //
      //       });
      //     });
      //   });
      // });
      //   console.log('password valid :', valid);

      //   fs.writeFileSync('/tmp/wpa_supplicant.conf', WPA.buildSupplicant('IT', 'WiFi', 'password'));

      //   if (fs.existsSync('/tmp/wpa_supplicant.conf')) {
      //
      //     sudo.exec(['cp', '/tmp/wpa_supplicant.conf', '/etc/wpa_supplicant/wpa_supplicant.conf'], options, function(err, pid, result) {
      //       console.log(result); // output '';
      //     });
      //   }
      // });
    } else {
      console.log('wpa_supplicant.conf found!');
      process.exit();
    }
  }
}
