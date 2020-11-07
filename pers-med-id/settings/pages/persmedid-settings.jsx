import { contacts } from './sections/contacts';
import { medical } from './sections/medical';
import { patient } from './sections/patient';

export function persMedIdSettings(props) {
    return (
      <Page>
        {patient(props)}
        {medical(props)}
        {contacts(props)}
      </Page>
    );
}