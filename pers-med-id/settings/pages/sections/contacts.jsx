export function contacts(props) {
    return (
        <Section
          title={<Text bold align="center">Contacts</Text>}>
          <Text>
            Text
          </Text>
          <TextInput
            settingsKey="contact"
            label="Contact"
            type="text"
            placeholder="Contact"
          />
        </Section>
    );
}