/*** UI Imports ***/
import document from 'document';

/*** Sensor Imports ***/
import { PersMedIdSettings, SettingsService } from './services/settings-service';

/*** Definitions ***/

/*** Settings Script ***/
const settingsCallback = function (settings: PersMedIdSettings): void {
    console.log('settingsCallback');
};

const settingsService = new SettingsService(settingsCallback);
settingsService.initialize();
