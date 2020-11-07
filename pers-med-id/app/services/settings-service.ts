import { me } from 'appbit';
import { me as device } from 'device';
import * as fs from 'fs';
import * as messaging from 'messaging';

import { environment as env } from './environment';

export interface PersMedIdSettings {
    patient?: string;
    medical?: string;
    contacts?: string;
}

export interface OnSettingsChangeCallback {
    (settings: PersMedIdSettings)
}

type Encoding = 'cbor' | 'json';

export class SettingsService {
    private readonly SETTINGS_TYPE: Encoding = 'json';
    private readonly SETTINGS_FILE: string = 'pers-med-id-sav.json';

    private settings: PersMedIdSettings;
    private onSettingsChange: OnSettingsChangeCallback;

    constructor(callback: OnSettingsChangeCallback) {
        this.settings = this.loadSettings();

        this.onSettingsChange = callback;
        this.onSettingsChange(this.settings);
    }

    public initialize(): void {
        // Received message containing settings data
        messaging.peerSocket.addEventListener('message', (event) => {
            const messageEvent = event as MessageEvent;
            if (messageEvent && messageEvent.data) {
                if(this.settings == null) {
                    this.settings = {
                        patient: undefined,
                        medical: undefined,
                        contacts: undefined,
                    };
                }
                switch(messageEvent.data.key) {
                    case 'patient': this.settings.patient = messageEvent.data.value;
                    case 'medical': this.settings.medical = messageEvent.data.value;
                    case 'contacts': this.settings.contacts = messageEvent.data.value;
                }

                this.onSettingsChange(this.settings);
            }
        });
        
        // Register for the unload event
        me.addEventListener('unload', () => { this.saveSettings(this.SETTINGS_FILE, this.SETTINGS_TYPE, this.settings) });
    }

    // Load settings from filesystem
    private loadSettings(): PersMedIdSettings {
        try {
            return fs.readFileSync(this.SETTINGS_FILE, this.SETTINGS_TYPE) as PersMedIdSettings;
        } catch (error) {
            return {} as PersMedIdSettings;
        }
    }

    // Save settings to the filesystem
    private saveSettings(file: string, type: Encoding, settings: PersMedIdSettings): void {
        try {
            fs.writeFileSync(file, settings, type);
        } catch (error) {
            console.log('Error while saving settings: ' + error);
        }
    }

    public getCurrentSettings(): PersMedIdSettings { return this.settings; }
}