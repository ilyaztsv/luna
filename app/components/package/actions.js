import { remote, ipcRenderer } from 'electron';
import { showMessageBox } from '../../utils';

const Install = (pkg, version, cb) => {
  showMessageBox({
    action: 'install',
    name: pkg.name,
    version: version
  }, () => {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'install-package',
      cmd: 'install',
      pkgName: pkg.name,
      pkgVersion: version,
      params: ['g']
    });
    if(cb) cb();
  });
}

const Update = (pkg, version, cb) => {
  showMessageBox({
    action: 'update',
    name: pkg.name
  }, () => {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'update-package',
      cmd: 'update',
      pkgName: pkg.name,
      params: ['g']
    });
    if(cb) cb();
  });
}

const Uninstall = (pkg, version, cb) => {
  showMessageBox({
    action: 'uninstall',
    name: pkg.name
  }, () => {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'uninstall-package',
      cmd: 'uninstall',
      pkgName: pkg.name,
      params: ['g']
    });
    if(cb) cb();
  });
}

module.exports = {
  Install,
  Update,
  Uninstall
}
